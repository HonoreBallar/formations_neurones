# backend/app/services/crew_service.py
import os
import re
import json
from datetime import datetime

from app.crew_ai.crew import AiAgentCrew

REPORT_PATH = "report.md"

def run_and_parse_prospects():
    # 1. Lancer le crew
    inputs = {
        "product": "Une solution d'agents IA autonomes et spécialisés, conçus sur mesure pour répondre aux besoins spécifiques et résoudre les défis opérationnels des PME en Côte d'Ivoire.",
        "current_year": str(datetime.now().year)
    }

    AiAgentCrew().crew().kickoff(inputs=inputs)

    # 2. Lire le rapport généré
    if not os.path.exists(REPORT_PATH):
        raise FileNotFoundError("Le fichier report.md n'a pas été généré.")

    with open(REPORT_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # 3. Extraire le bloc de prospects
    match = re.search(r"## 2\. Liste.*?\n(.*?)\n## 3\.", content, re.DOTALL)
    if not match:
        raise ValueError("Impossible d'extraire les informations de prospect du rapport.")

    raw_block = match.group(1).strip()

    # 4. Parser le bloc Markdown en dictionnaire
    prospect = parse_markdown_block(raw_block)
    return [prospect]  # On retourne une liste de prospects

def parse_markdown_block(block: str) -> dict:
    def extract(field: str) -> str:
        match = re.search(rf"\*\*{field}:\*\* (.*)", block)
        return match.group(1).strip() if match else "Non trouvé"

    return {
        "entreprise_name": extract("Nom de l'entreprise"),
        "website": extract("Site web \\(réel et vérifié\\)"),
        "activity_description": extract("Description de l'activité"),
        "contact_name": extract("Nom du contact clé et son poste"),
        "contact_post": "Non trouvé" if "Non trouvé" in extract("Nom du contact clé et son poste") else extract("Nom du contact clé et son poste").split(",")[-1].strip(),
        "email": extract("Adresse e-mail de contact"),
        "phone_number": extract("Numéro de téléphone"),
        "whatsapp_number": extract("Numéro WhatsApp")
    }
