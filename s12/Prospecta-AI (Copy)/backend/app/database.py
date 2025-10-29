from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de la base de données SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./prospects.db"

# Crée le moteur de la base de données SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Crée une session locale pour chaque transaction
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Déclare une base pour les classes de modèles ORM
Base = declarative_base()