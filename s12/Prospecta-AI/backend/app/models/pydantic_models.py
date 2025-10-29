# backend/app/models/pydantic_models.py
from pydantic import BaseModel
from datetime import datetime

class ProspectBase(BaseModel):
    entreprise_name: str
    website: str
    activity_description: str
    contact_name: str
    contact_post: str
    email: str
    phone_number: str
    whatsapp_number: str

class ProspectCreate(ProspectBase):
    pass

class Prospect(ProspectBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
