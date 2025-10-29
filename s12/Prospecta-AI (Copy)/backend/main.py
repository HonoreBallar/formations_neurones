from fastapi import FastAPI
from .api import endpoints

app = FastAPI(
    title="Prospecta AI Backend",
    description="API for the Prospecta AI lead generation application.",
    version="0.1.0",
)

# Inclut les endpoints
app.include_router(endpoints.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Prospecta AI Backend API!"}