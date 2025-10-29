# src/ai_agent_crew/utils/logger.py
import logging
import os
from pathlib import Path

def get_logger(name: str) -> logging.Logger:
    """
    Configure et retourne un logger pour le module spécifié.
    
    Args:
        name (str): Nom du module pour lequel le logger est créé.
    
    Returns:
        logging.Logger: Logger configuré avec fichier et console.
    
    Example:
        >>> logger = get_logger(__name__)
        >>> logger.info("Démarrage de l'application")
    """
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        # Handler pour fichier
        log_dir = Path("logs")
        log_dir.mkdir(exist_ok=True)
        file_handler = logging.FileHandler(log_dir / "app.maximum.log")
        file_handler.setFormatter(logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        ))
        
        # Handler pour console
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(logging.Formatter(
            "%(asctime)s - %(levelname)s - %(message)s"
        ))
        
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
    
    return logger