# src/ai_agent_crew/agents/content_writer.py
from crewai import Agent
from typing import List

class ContentWriterAgent:
    """Agent spécialisé dans la rédaction de rapports de prospection structurés."""
    
    def __init__(self, verbose: bool = True):
        """
        Initialise l'agent de rédaction de contenu avec sa configuration.
        
        Args:
            verbose (bool): Active/désactive le mode verbeux pour les logs.
        """
        self.agent = Agent(
            role="Rédacteur de Contenu Stratégique",
            goal=(
                "Créer des rapports de prospection clairs, concis et informatifs qui "
                "mettent en évidence les opportunités et les résultats."
            ),
            backstory=(
                "Vous êtes un rédacteur de contenu spécialisé dans la communication B2B. "
                "Votre force est de synthétiser des informations complexes en rapports clairs "
                "et exploitables, aidant à la prise de décision."
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
            >>> agent = ContentWriterAgent(verbose=True)
            >>> crewai_agent = agent.get_agent()
        """
        return self.agent