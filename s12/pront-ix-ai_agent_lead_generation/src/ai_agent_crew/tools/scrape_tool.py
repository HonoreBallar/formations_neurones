# src/ai_agent_crew/tools/scrape_tool.py
from crewai_tools import ScrapeWebsiteTool
from typing import Type
from pydantic import BaseModel, Field
from ai_agent_crew.utils.logger import get_logger

class ScrapeToolInput(BaseModel):
    """Schéma pour les paramètres d'entrée du ScrapeWebsiteTool."""
    url: str = Field(..., description="URL du site web à scraper.")

class ScrapeWebsiteToolWrapper:
    """Wrapper pour l'outil ScrapeWebsiteTool de CrewAI."""
    
    def __init__(self):
        """
        Initialise l'outil de scraping de sites web.
        """
        self.logger = get_logger(__name__)
        self.tool = ScrapeWebsiteTool()

    def run(self, url: str) -> str:
        """
        Exécute l'outil de scraping sur une URL donnée.
        
        Args:
            url (str): URL du site web à scraper.
        
        Returns:
            str: Contenu scrapé du site web.
        
        Example:
            >>> tool = ScrapeWebsiteToolWrapper()
            >>> content = tool.run("https://example.com")
        """
        self.logger.info("Scraping URL: %s", url)
        try:
            return self.tool._run(url=url)
        except Exception as e:
            self.logger.error("Error scraping URL %s: %s", url, str(e))
            raise