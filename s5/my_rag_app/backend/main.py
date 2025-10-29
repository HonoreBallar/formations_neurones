# backend/main.py
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import sys

# Ajoute le répertoire courant au PYTHONPATH pour les imports relatifs
# (utile si main.py n'est pas directement à la racine du projet)
sys.path.append(os.path.dirname(__file__))

try:
    from rag_local import (
        load_documents,
        split_documents,
        get_embedding_function,
        get_vector_store,
        index_documents,
        create_rag_chain,
        query_rag
    )
    print("rag_utils loaded successfully.")
except ModuleNotFoundError:
    print("ERROR: Could not find 'rag_utils.py'. Make sure it's in the same directory as main.py.")
    print("Please check your file structure and ensure you are running uvicorn from the 'backend' directory.")
    sys.exit(1) # Quitte l'application si le module crucial n'est pas trouvé
except Exception as e:
    print(f"ERROR: An unexpected error occurred while loading rag_utils: {e}")
    sys.exit(1)

try:
    from agent_local import (
        get_agent_llm,
        get_agent_prompt,
        build_agent,
        create_agent_executor,
        run_agent, # Nous l'adapterons pour l'API
        tools as agent_tools # Importe les outils définis dans agent_utils
    )
    print("agent_utils loaded successfully.")
except ModuleNotFoundError:
    print("ERROR: Could not find 'agent_utils.py'. Make sure it's in the same directory as main.py.")
    print("Please check your file structure and ensure you are running uvicorn from the 'backend' directory.")
    sys.exit(1) # Quitte l'application si le module crucial n'est pas trouvé
except Exception as e:
    print(f"ERROR: An unexpected error occurred while loading agent_utils: {e}")
    sys.exit(1)

app = FastAPI(
    title="RAG-Agent API",
    description="API for a Retriever-Augmented Generation (RAG) model and a tool-using Agent.",
    version="1.0.0"
)

# Configuration CORS pour permettre au frontend React de communiquer avec l'API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Remplace par l'URL de ton frontend React en production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Initialisation du RAG et de l'Agent ---
# Ces initialisations peuvent prendre du temps, donc elles sont faites une seule fois au démarrage
# et les objets sont stockés en mémoire.

rag_chain_instance = None
agent_executor_instance = None
vector_store_instance = None # Ajout pour conserver l'instance du vector store


@app.on_event("startup")
async def startup_event():
    """
    Initialise le modèle RAG et l'agent au démarrage de l'application.
    """
    global rag_chain_instance, agent_executor_instance, vector_store_instance

    print("Initialisation des composants de l'API...")

    # Initialisation du RAG
    try:
        # Assurez-vous que le dossier 'data/' et 'mydocument.pdf' existent
        # Si le vector store n'existe pas, nous l'indexons.
        # Sinon, nous le chargeons.
        
        # Vérifier si le vector store existe déjà (simplifié pour ce cas)
        # Dans une application réelle, une logique de vérification plus robuste serait nécessaire.
        if not os.path.exists(os.path.join(os.path.dirname(__file__), rag_local.CHROMA_PATH)):
            print("ChromaDB non trouvé, indexation des documents...")
            docs = load_documents() # [cite: 10]
            chunks = split_documents(docs) # [cite: 19]
            embedding_function = get_embedding_function() # [cite: 11]
            vector_store_instance = index_documents(chunks, embedding_function) # [cite: 13, 15, 21]
        else:
            print("ChromaDB existant trouvé, chargement du vector store...")
            embedding_function = get_embedding_function() # [cite: 11]
            vector_store_instance = get_vector_store(embedding_function) # [cite: 12]

        rag_chain_instance = create_rag_chain(vector_store_instance, llm_model_name="qwen3:8b") # [cite: 16]
        print("RAG Chain initialisée avec succès.")
    except Exception as e:
        print(f"Erreur lors de l'initialisation du RAG : {e}")
        # En cas d'erreur grave, vous pouvez choisir de quitter ou de gérer différemment
        # sys.exit(1) # Pour un arrêt brutal

    # Initialisation de l'Agent
    try:
        agent_llm = get_agent_llm(model_name="qwen3:8b") # [cite: 4, 7]
        agent_prompt = get_agent_prompt() # [cite: 5, 7]
        agent_runnable = build_agent(agent_llm, agent_tools, agent_prompt) # [cite: 6, 7]
        agent_executor_instance = create_agent_executor(agent_runnable, agent_tools) # [cite: 6, 7]
        print("Agent Executor initialisé avec succès.")
    except Exception as e:
        print(f"Erreur lors de l'initialisation de l'Agent : {e}")


class QueryRequest(BaseModel):
    """
    Modèle Pydantic pour la requête de l'utilisateur.
    """
    query: str

class AgentQueryRequest(BaseModel):
    """
    Modèle Pydantic pour la requête de l'agent.
    """
    input: str # Correspond à l'input attendu par l'agent Langchain

@app.get("/")
async def read_root():
    return {"message": "Welcome to the RAG-Agent API! Use /rag/query or /agent/query endpoints."}

@app.post("/rag/query")
async def rag_query_endpoint(request: QueryRequest):
    """
    Endpoint pour interroger le modèle RAG.
    """
    if not rag_chain_instance:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="RAG model not initialized yet. Please wait a moment."
        )
    try:
        print(f"Requête RAG reçue : {request.query}")
        response = query_rag(rag_chain_instance, request.query) # [cite: 19]
        # La fonction query_rag imprime la réponse, nous voulons la retourner.
        # Nous devons légèrement adapter query_rag ou manipuler la sortie ici.
        # Pour l'instant, on assume que `query_rag` retourne directement la chaîne de caractères.
        # Si `query_rag` ne fait que print, nous devrons modifier `rag_utils.py`
        # ou utiliser `chain.invoke` directement ici.
        
        # Adaptation : Appel direct de la chaîne pour récupérer la réponse
        chain_response = rag_chain_instance.invoke(request.query) # [cite: 18, 19]
        return JSONResponse(content={"response": chain_response})
    except Exception as e:
        print(f"Erreur lors de l'exécution de la requête RAG : {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.post("/agent/query")
async def agent_query_endpoint(request: AgentQueryRequest):
    """
    Endpoint pour interroger l'agent.
    """
    if not agent_executor_instance:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Agent not initialized yet. Please wait a moment."
        )
    try:
        print(f"Requête Agent reçue : {request.input}")
        # Utilise l'executor directement comme dans run_agent, mais retourne la sortie.
        response = agent_executor_instance.invoke({"input": request.input}) # [cite: 7]
        return JSONResponse(content={"response": response['output']})
    except Exception as e:
        print(f"Erreur lors de l'exécution de la requête Agent : {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# Pour exécuter cette API, utilisez Uvicorn :
# uvicorn main:app --reload --host 0.0.0.0 --port 8000