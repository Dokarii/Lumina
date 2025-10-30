import mysql.connector as mysql

def get_connection():
<<<<<<< HEAD
    return mysql.connector.connect(
=======
    connection = mysql.connect(
>>>>>>> 04c78dc80f5981cbfddada3316a60ed11de31805
        host="localhost",
        user="root",
        password="",  # pon tu contraseña si tienes
        database="lumina_db"
    )
<<<<<<< HEAD
=======
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

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS encuestas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            fecha DATE NOT NULL,
            puntuacion_animo INT NOT NULL CHECK (puntuacion_animo BETWEEN 1 AND 10),
            habitos TEXT,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
        )
    """)
        connection.commit()
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


if __name__ == "__main__":
    init_db()
    print("Tabla 'usuarios' verificada/creada correctamente.")
>>>>>>> 04c78dc80f5981cbfddada3316a60ed11de31805
