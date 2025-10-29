from fastapi import FastAPI
from app.core.database import Base, engine
from app.models.database import Prospect
from app.api.routes import prospects
# from .api import endpoints

app = FastAPI(
    title="Prospecta AI Backend",
    description="API for the Prospecta AI lead generation application.",
    version="0.1.0",
)

Base.metadata.create_all(bind=engine)

app.include_router(prospects.router)

# Inclut les endpoints
# app.include_router(endpoints.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur Prospecta AI"}