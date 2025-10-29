# app/models.py
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.db import Base  # Assure-toi que Base est bien défini dans db.py

class Prospect(Base):
    __tablename__ = "prospects"

    id = Column(Integer, primary_key=True, index=True)
    entreprise_name = Column(String, nullable=False)
    website = Column(String, nullable=False)
    activity_description = Column(String, nullable=False)
    contact_name = Column(String, nullable=False)
    contact_post = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    whatsapp_number = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
