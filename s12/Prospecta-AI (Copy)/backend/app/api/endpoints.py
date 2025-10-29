from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, services
from ..database import SessionLocal, engine, Base
from ..models import ProspectDB

# Crée les tables dans la base de données
Base.metadata.create_all(bind=engine)

router = APIRouter()

# Dependency pour obtenir une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/prospects/run", response_model=schemas.ProspectingResponse)
async def run_prospecting(request: schemas.ProspectingRequest):
    success = services.prospecting_service.run_prospecting_crew(
        request.product, request.target_companies
    )
    if success:
        return {"status": "success", "message": "Prospecting process started successfully."}
    else:
        raise HTTPException(status_code=500, detail="Failed to start prospecting process.")

@router.get("/prospects/", response_model=schemas.ProspectList)
async def get_prospects(db: Session = Depends(get_db)):
    prospects = crud.get_prospects(db)
    return {"prospects": prospects}