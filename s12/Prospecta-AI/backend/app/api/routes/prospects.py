# backend/app/api/routes/prospects.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api.dependencies import get_db
from app.models import pydantic_models as schemas
from app.services import prospect_service, crew_service

router = APIRouter(prefix="/prospects", tags=["Prospection"])

@router.get("/", response_model=List[schemas.Prospect])
def read_prospects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return prospect_service.get_prospects(db, skip=skip, limit=limit)

@router.post("/run", response_model=List[schemas.Prospect])
def run_prospecting(db: Session = Depends(get_db)):
    try:
        prospects = crew_service.run_and_parse_prospects()
        saved = []
        for p in prospects:
            prospect_obj = schemas.ProspectCreate(**p)
            saved.append(prospect_service.create_prospect(db, prospect_obj))
        return saved
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
