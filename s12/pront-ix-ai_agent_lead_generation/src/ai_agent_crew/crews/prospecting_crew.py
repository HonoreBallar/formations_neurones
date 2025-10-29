# src/ai_agent_crew/crews/prospecting_crew.py
from crewai import Crew, Task, Process
from crewai import Agent
from typing import List
from ai_agent_crew.utils.logger import get_logger

class ProspectingCrew:
    """Crew pour orchestrer les tâches de prospection d'entreprises."""
    
    def __init__(self, market_researcher: Agent, prospecting_specialist: Agent, content_writer: Agent):
        """
        Initialise le crew avec les agents fournis.
        
        Args:
            market_researcher (Agent): Agent pour la recherche de marché.
            prospecting_specialist (Agent): Agent pour la rédaction d'e-mails.
            content_writer (Agent): Agent pour la rédaction de rapports.
        """
        self.logger = get_logger(__name__)
        self.agents = [market_researcher, prospecting_specialist, content_writer]
        self.tasks = self._define_tasks(market_researcher, prospecting_specialist, content_writer)

    def _define_tasks(self, market_researcher: Agent, prospecting_specialist: Agent, content_writer: Agent) -> List[Task]:
        """
        Définit les tâches du crew pour la prospection.
        
        Args:
            market_researcher (Agent): Agent pour la recherche de marché.
            prospecting_specialist (Agent): Agent pour la rédaction d'e-mails.
            content_writer (Agent): Agent pour la rédaction de rapports.
        
        Returns:
            List[Task]: Liste des tâches configurées.
        """
        prospect_identification_task = Task(
            description=(
                "Trouver et vérifier les informations d'une seule PME en Côte d'Ivoire. "
                "1. Utiliser l'outil de recherche pour trouver un annuaire de PME. "
                "2. Extraire le nom d'une PME non traitée. "
                "3. Trouver le site web officiel de la PME. "
                "4. Extraire les contacts (e-mail, téléphone, WhatsApp) depuis la page 'Contact' ou 'À propos'."
            ),
            expected_output=(
                "Informations d'une PME ivoirienne en Markdown:\n"
                "- Nom de l'entreprise\n"
                "- Site web (réel et vérifié)\n"
                "- Brève description de l'activité\n"
                "- Nom du contact clé et son poste (sinon 'Non trouvé')\n"
                "- Adresse e-mail (sinon 'Non trouvé')\n"
                "- Numéro de téléphone (sinon 'Non trouvé')\n"
                "- Numéro WhatsApp (sinon 'Non trouvé')"
            ),
            agent=market_researcher
        )

        prospecting_email_task = Task(
            description=(
                "Rédiger un modèle d'e-mail de prospection personnalisé pour le prospect identifié. "
                "L'e-mail doit être engageant, pertinent et adapté pour présenter le produit {product}."
            ),
            expected_output=(
                "Un modèle d'e-mail en français, professionnel et chaleureux, formaté en Markdown."
            ),
            agent=prospecting_specialist
        )

        prospecting_report_task = Task(
            description=(
                "Compiler les informations de recherche et l'e-mail dans un rapport complet. "
                "Inclure la stratégie de ciblage, la liste des prospects et l'approche de communication."
            ),
            expected_output=(
                "Un rapport Markdown avec:\n"
                "1. Résumé de la stratégie de ciblage.\n"
                "2. Liste complète du prospect identifié.\n"
                "3. Modèle d'e-mail de prospection."
            ),
            agent=content_writer,
            output_file="report.md"
        )

        return [prospect_identification_task, prospecting_email_task, prospecting_report_task]

    def get_crew(self) -> Crew:
        """
        Retourne l'instance du crew CrewAI configuré.
        
        Returns:
            Crew: Crew configuré avec agents et tâches.
        
        Example:
            >>> crew = ProspectingCrew(mr_agent, ps_agent, cw_agent).get_crew()
            >>> result = crew.kickoff(inputs={"product": "Solution IA", "current_year": "2025"})
        """
        self.logger.info("Initializing prospecting crew")
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True
        )