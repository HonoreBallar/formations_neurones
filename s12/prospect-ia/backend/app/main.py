from fastapi import FastAPI
from app.api.routes import prospects

app = FastAPI()
app.include_router(prospects.router, prefix="/prospects", tags=["Prospection"])
