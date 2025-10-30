import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # pon tu contraseña si tienes
        database="lumina_db"
    )
