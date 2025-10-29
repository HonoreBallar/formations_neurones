# app/crud.py
from sqlalchemy.orm import Session
from app import models, schemas

def create_prospect(db: Session, prospect: schemas.ProspectCreate) -> models.Prospect:
    db_prospect = models.Prospect(**prospect.dict())
    db.add(db_prospect)
    db.commit()
    db.refresh(db_prospect)
    return db_prospect

def get_prospects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Prospect).offset(skip).limit(limit).all()
