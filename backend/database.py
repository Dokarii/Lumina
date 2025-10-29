import mysql.connector as mysql

def get_connection():
    connection = mysql.connect(
        host="localhost",
        user="root",
        password="",
        database="lumina_db"
    )
    return connection


def init_db():
    connection = None
    cursor = None
    try:
        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                edad INT,
                correo VARCHAR(255) NOT NULL UNIQUE,
                contrasena VARCHAR(255) NOT NULL
            )
            """
        )
        connection.commit()
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


if __name__ == "__main__":
    init_db()
    print("Tabla 'usuarios' verificada/creada correctamente.")
