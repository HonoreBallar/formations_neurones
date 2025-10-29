# src/ai_agent_crew/agents/prospecting_specialist.py
from crewai import Agent
from typing import List

class ProspectingSpecialistAgent:
    """Agent spécialisé dans la rédaction d'e-mails de prospection personnalisés."""
    
    def __init__(self, verbose: bool = True):
        """
        Initialise l'agent de prospection avec sa configuration.
        
        Args:
            verbose (bool): Active/désactive le mode verbeux pour les logs.
        """
        self.agent = Agent(
            role="Spécialiste de la Prospection et du Premier Contact",
            goal=(
                "Engager la conversation avec les prospects identifiés en utilisant "
                "des approches personnalisées et percutantes."
            ),
            backstory=(
                "Vous êtes un communicant hors pair, maître dans l'art de créer des connexions humaines. "
                "Votre talent est de transformer une liste de contacts froids en conversations chaleureuses "
                "et prometteuses, ouvrant la voie à des relations d'affaires fructueuses."
            ),
            tools=self._get_tools(),
            verbose=verbose
        )

    def _get_tools(self) -> List:
        """
        Retourne la liste des outils utilisés par l'agent (actuellement aucun).
        
        Returns:
            List: Liste vide, extensible pour de futurs outils.
        """
        return []

    def get_agent(self) -> Agent:
        """
        Retourne l'instance de l'agent CrewAI.
        
        Returns:
            Agent: Instance configurée de l'agent.
        
        Example:
            >>> agent = ProspectingSpecialistAgent(verbose=True)
            >>> crewai_agent = agent.get_agent()
        """
        return self.agent