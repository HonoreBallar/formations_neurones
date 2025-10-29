from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ChatRequest, ChatResponse, Message
from chat_service import chat_service
from typing import List
import os
from dotenv import load_dotenv, find_dotenv
import uuid
from datetime import datetime

# Charger les variables d'environnement
env_path = find_dotenv()
if env_path:
    print(f".env trouvé : {env_path}")
    load_dotenv(env_path)
else:
    print("⚠️ Aucun fichier .env trouvé")

# Vérification
print("DATABASE_URL =", os.getenv("DATABASE_URL"))
print("OPENAI_API_KEY =", os.getenv("OPENAI_API_KEY"))

load_dotenv()

app = FastAPI(
    title="ChatGPT MVP API",
    description="API pour un clone de ChatGPT avec LangChain",
    version="1.0.0"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL du frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Stockage en mémoire des conversations (à remplacer par une DB en production)
conversations = {}

@app.get("/")
async def root():
    return {"message": "ChatGPT MVP API is running!"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Endpoint principal pour le chat"""
    try:
        # Vérifier la clé API
        if not os.getenv("OPENAI_API_KEY"):
            raise HTTPException(
                status_code=500, 
                detail="Clé API OpenAI non configurée"
            )
        
        # Générer la réponse
        result = await chat_service.generate_response(request)
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["response"])
        
        # Créer la réponse
        response = ChatResponse(
            response=result["response"],
            conversation_id=str(uuid.uuid4()),
            tokens_used=result["tokens_used"]
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Vérification de la santé de l'API"""
    return {
        "status": "healthy",
        "langchain_version": "0.0.350",
        "openai_configured": bool(os.getenv("OPENAI_API_KEY"))
    }

@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """Endpoint pour le streaming (optionnel pour plus tard)"""
    # À implémenter pour le streaming en temps réel
    pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)