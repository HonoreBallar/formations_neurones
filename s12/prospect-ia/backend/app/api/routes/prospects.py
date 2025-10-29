from fastapi import APIRouter
from app.models.prospect import ProspectConfig, ProspectResult
from app.services.crew_service import run_prospecting

router = APIRouter()

@router.post("/run", response_model=ProspectResult)
def run_prospect(config: ProspectConfig):
    result = run_prospecting(config.dict())
    return result
