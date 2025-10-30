import mysql.connector as mysql


def get_connection():
    connection = mysql.connect(
        host="localhost",
        user="root",
        password="",  # pon tu contraseña si tienes
        database="lumina_db",
    )
    return connection


def init_db():
    connection = None
    cursor = None
    try:
        connection = get_connection()
        cursor = connection.cursor()
        # Usuarios
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
        # Calificaciones (para MoodSurvey/Resumen)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS calificaciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                animo INT,
                estres INT,
                energia INT,
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
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
    print("Tablas 'usuarios' y 'calificaciones' verificadas/creadas correctamente.")
