# src/ai_agent_crew/services/crew_service.py (mise à jour)
import asyncio
from ai_agent_crew.utils.exceptions import CrewExecutionError

async def run_prospecting(self, product: str, target_count: int, current_year: str) -> dict:
    try:
        self.logger.info("Starting prospecting crew for %d prospects", target_count)
        crew = ProspectingCrew(
            market_researcher=self.market_researcher.get_agent(),
            prospecting_specialist=self.prospecting_specialist.get_agent(),
            content_writer=self.content_writer.get_agent()
        ).get_crew()
        
        results = []
        for _ in range(target_count):
            async with asyncio.timeout(300):  # Timeout de 5 minutes par exécution
                result = await asyncio.to_thread(crew.kickoff, inputs={"product": product, "current_year": current_year})
                prospect_info = self._extract_prospect_info(str(result))
                results.append({"prospect_info": prospect_info, "report": str(result)})
        
        self.logger.info("Prospecting completed successfully.")
        return results[0] if target_count == 1 else results
    except asyncio.TimeoutError:
        self.logger.error("Crew execution timed out after 300 seconds")
        raise CrewExecutionError("L'exécution du crew a dépassé le temps imparti.")
    except Exception as e:
        self.logger.error("Error during crew execution: %s", str(e))
        raise CrewExecutionError(f"Erreur lors de l'exécution du crew: {str(e)}")