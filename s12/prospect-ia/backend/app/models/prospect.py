from pydantic import BaseModel

class ProspectConfig(BaseModel):
    product: str
    current_year: str

class ProspectResult(BaseModel):
    entreprise_name: str
    website: str
    activity_description: str
    contact_name: str
    contact_post: str
    email: str
    phone_number: str
    whatsapp_number: str
