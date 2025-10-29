import subprocess
import os
import re
from typing import Dict, Any

# Chemin vers le script run_prospecting.py qui se trouve dans le dossier crewai-agent
# Il faudra ajuster ce chemin en fonction de votre structure de projet finale
CREWAI_AGENT_PATH = "../crewai-agent"
PROSPECTING_SCRIPT = "run_prospecting.py"

def run_prospecting_crew(product: str, target_count: int) -> bool:
    """
    Déclenche le processus de prospection via le script CrewAI.
    """
    try:
        # Assurez-vous d'avoir les variables d'environnement nécessaires
        # ici pour que le script CrewAI puisse s'exécuter.
        env = os.environ.copy()
        
        # Nous appelons le script run_prospecting.py avec des arguments
        # qui pourraient être le nombre de prospects à générer, par exemple.
        # Vous devrez adapter le script run_prospecting.py pour accepter ces arguments.
        command = [
            "python",
            os.path.join(CREWAI_AGENT_PATH, PROSPECTING_SCRIPT),
            str(target_count) # Exemple d'argument
        ]
        
        # Exécute le processus en arrière-plan
        process = subprocess.Popen(command, env=env)
        # Ne pas attendre que le processus se termine, car c'est asynchrone
        return True
    except FileNotFoundError as e:
        print(f"Erreur : Le script de prospection n'a pas été trouvé. {e}")
        return False
    except subprocess.CalledProcessError as e:
        print(f"Erreur lors de l'exécution du script de prospection : {e}")
        return False

def get_new_prospects() -> List[Dict[str, Any]]:
    """
    Lit le fichier prospects_list.md généré par le script CrewAI
    et en extrait les informations des nouveaux prospects.
    """
    # Le script run_prospecting.py ajoute à ce fichier.
    prospects_list_file = os.path.join(CREWAI_AGENT_PATH, "prospects_list.md")
    
    if not os.path.exists(prospects_list_file):
        return []
        
    prospects = []
    
    with open(prospects_list_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex pour extraire les blocs de prospects, en s'appuyant sur les en-têtes ##
    prospect_blocks = re.split(r'## Prospect \d+ - Ajouté le \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}', content)[1:]
    
    for block in prospect_blocks:
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        prospect_data = {}
        for line in lines:
            if line.startswith('- **Nom de l\'entreprise:**'):
                prospect_data['company_name'] = line.replace('- **Nom de l\'entreprise:**', '').strip()
            elif line.startswith('- **Site web'):
                prospect_data['website'] = line.split(':')[-1].strip()
            elif line.startswith('- **Description de l\'activité:'):
                prospect_data['activity_description'] = line.replace('- **Description de l\'activité:**', '').strip()
            elif line.startswith('- **Nom du contact clé'):
                prospect_data['contact_name'] = line.replace('- **Nom du contact clé et son poste:**', '').strip()
                prospect_data['contact_post'] = "Non trouvé" # A adapter
            elif line.startswith('- **Adresse e-mail'):
                prospect_data['email'] = line.replace('- **Adresse e-mail de contact:**', '').strip()
            elif line.startswith('- **Numéro de téléphone:**'):
                prospect_data['phone_number'] = line.replace('- **Numéro de téléphone:**', '').strip()
            elif line.startswith('- **Numéro WhatsApp:**'):
                prospect_data['whatsapp_number'] = line.replace('- **Numéro WhatsApp:**', '').strip()
        
        # Ajoutez à la liste si des données ont été trouvées
        if prospect_data:
            prospects.append(prospect_data)
            
    return prospects