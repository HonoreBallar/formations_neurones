# src/ai_agent_crew/agents/market_researcher.py
from crewai import Agent
from typing import List
from crewai_tools import SerperDevTool, PDFSearchTool, ScrapeWebsiteTool

class MarketResearcherAgent:
    """Agent spécialisé dans la recherche de marché pour identifier des prospects qualifiés."""
    
    def __init__(self, verbose: bool = True):
        """
        Initialise l'agent de recherche de marché avec ses outils et configuration.
        
        Args:
            verbose (bool): Active/désactive le mode verbeux pour les logs.
        """
        self.agent = Agent(
            role="Expert en Stratégie de Marché",
            goal=(
                "Identifier les entreprises et les contacts clés les plus pertinents en Côte d'Ivoire "
                "et à l'international qui correspondent au profil de client idéal pour une solution "
                "d'agents IA autonomes."
            ),
            backstory=(
                "Vous êtes un stratège de marché d'élite, expert dans l'art de dénicher des opportunités cachées. "
                "Votre force réside dans votre capacité à utiliser une combinaison d'outils de recherche et de web scraping "
                "pour trouver des informations précises et exploitables."
            ),
            tools=self._get_tools(),
            verbose=verbose
        )

    def _get_tools(self) -> List:
        """
        Retourne la liste des outils utilisés par l'agent.
        
        Returns:
            List: Liste des outils CrewAI (SerperDevTool, PDFSearchTool, ScrapeWebsiteTool).
        """
        return [SerperDevTool(), PDFSearchTool(), ScrapeWebsiteTool()]

    def get_agent(self) -> Agent:
        """
        Retourne l'instance de l'agent CrewAI.
        
        Returns:
            Agent: Instance configurée de l'agent.
        
        Example:
            >>> agent = MarketResearcherAgent(verbose=True)
            >>> crewai_agent = agent.get_agent()
        """
        return self.agent