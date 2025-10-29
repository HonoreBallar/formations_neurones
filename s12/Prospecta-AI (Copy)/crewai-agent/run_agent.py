import json
import os
from crewai import Crew

# Importez les agents et les tâches. Le chemin est correct car le PYTHONPATH est défini.
from src.ai_agent_crew.config.agents import agents
from src.ai_agent_crew.config.tasks import tasks
from crewai_tools import SerperDevTool, ScrapeWebsiteTool

# Définissez les outils que les agents utiliseront
tools = [
    SerperDevTool(),
    ScrapeWebsiteTool()
]


if __name__ == "__main__":
    # Cette partie sera exécutée lorsque le script sera appelé en ligne de commande.
    # Les variables d'environnement sont passées par le backend via subprocess.
    niche = os.getenv("NICHE")
    if not niche:
        # Permet de tester le script indépendamment
        print("La variable d'environnement 'NICHE' n'est pas définie. Utilisation d'une valeur par défaut.")
        niche = "startups en technologie en Côte d'Ivoire"

    # Définissez les agents avec leurs rôles et outils
    market_researcher = agents['market_researcher']
    content_writer = agents['content_writer']

    # Définissez les tâches et assignez-les aux agents
    prospect_identification_task = tasks['prospect_identification_task']
    prospecting_report_task = tasks['prospecting_report_task']
    
    # Configurez l'équipe CrewAI
    prospecting_crew = Crew(
        agents=[market_researcher, content_writer],
        tasks=[prospect_identification_task, prospecting_report_task],
        verbose=True
    )

    # Exécutez le processus de l'équipe
    result = prospecting_crew.kickoff(inputs={'niche': niche})
    
    # Le résultat est censé être un JSON, nous le renvoyons en sortie standard.
    print(result)