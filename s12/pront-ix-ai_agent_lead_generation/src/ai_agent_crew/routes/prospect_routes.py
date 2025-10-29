# src/ai_agent_crew/routes/prospect_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from ai_agent_crew.services.crew_service import CrewService
from ai_agent_crew.utils.logger import get_logger
from ai_agent_crew.utils.exceptions import CrewExecutionError

router = APIRouter(prefix="/prospect", tags=["Prospecting"])
logger = get_logger(__name__)

class ProspectInput(BaseModel):
    """Schéma pour les paramètres d'entrée de la mission de prospection."""
    product: str = "Une solution d'agents IA autonomes et spécialisés."
    target_count: Optional[int] = 1
    current_year: Optional[str] = None

class ProspectOutput(BaseModel):
    """Schéma pour la sortie de la mission de prospection."""
    prospect_info: str
    report: str

@router.post("/simulate", response_model=ProspectOutput)
async def simulate_prospecting(input_data: ProspectInput):
    """
    Lance une mission de prospection avec des paramètres dynamiques.
    
    Args:
        input_data (ProspectInput): Données d'entrée pour la mission (produit, nombre de prospects, année).
    
    Returns:
        ProspectOutput: Informations du prospect et rapport généré.
    
    Raises:
        HTTPException: En cas d'erreur lors de l'exécution de la mission.
    
    Example:
        POST /prospect/simulate
        {
            "product": "Solution IA pour PME",
            "target_count": 1,
            "current_year": "2025"
        }
    """
    try:
        logger.info("Starting prospecting simulation with input: %s", input_data.dict())
        crew_service = CrewService()
        result = crew_service.run_prospecting(
            product=input_data.product,
            target_count=input_data.target_count,
            current_year=input_data.current_year or str(datetime.now().year)
        )
        logger.info("Prospecting simulation completed successfully.")
        return ProspectOutput(prospect_info=result["prospect_info"], report=result["report"])
    except CrewExecutionError as e:
        logger.error("Crew execution failed: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'exécution de la mission: {str(e)}")
    except Exception as e:
        logger.error("Unexpected error: %s", str(e))
        raise HTTPException(status_code=500, detail="Erreur inattendue lors de la simulation.")