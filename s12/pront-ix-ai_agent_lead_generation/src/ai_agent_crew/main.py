# src/ai_agent_crew/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_agent_crew.routes.prospect_routes import router as prospect_router
from ai_agent_crew.utils.logger import get_logger

app = FastAPI(title="Prospecta AI API", version="0.1.0")
logger = get_logger(__name__)

# Configuration CORS pour permettre les requêtes depuis le frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ajuster selon l'URL du frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routes
app.include_router(prospect_router)

@app.on_event("startup")
async def startup_event():
    """Événement déclenché au démarrage de l'application."""
    logger.info("Starting Prospecta AI API")

@app.on_event("shutdown")
async def shutdown_event():
    """Événement déclenché à l'arrêt de l'application."""
    logger.info("Shutting down Prospecta AI API")