import os
import psycopg2
import time

max_attempts = 10
attempts = 0

while attempts < max_attempts:
    try:
        print(f"Tentative de connexion à la base de données (essai {attempts + 1}/{max_attempts})...")
        conn = psycopg2.connect(
            host="ma_base_de_donnees",
            database=os.environ.get("POSTGRES_DB"),
            user=os.environ.get("POSTGRES_USER"),
            password=os.environ.get("POSTGRES_PASSWORD")
        )
        print("Connexion réussie !")
        conn.close()
        break
    except psycopg2.Error as e:
        print(f"Erreur de connexion : {e}. Nouvelle tentative dans 3 secondes...")
        time.sleep(3)
        attempts += 1
else:
    print("Échec de la connexion après plusieurs tentatives.")