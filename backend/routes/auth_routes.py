from flask import Blueprint, request, jsonify
from database import get_connection
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    nombre = data.get("nombre")
    edad = data.get("edad")
    correo = data.get("correo")
    contrasena = generate_password_hash(data.get("contrasena"))

    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO usuarios (nombre, edad, correo, contrasena)
            VALUES (%s, %s, %s, %s)
        """, (nombre, edad, correo, contrasena))
        conn.commit()
        return jsonify({"success": True, "message": "Usuario registrado correctamente"})
    except Exception as e:
        conn.rollback()
        return jsonify({"success": False, "message": str(e)})
    finally:
        cursor.close()
        conn.close()

@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    correo = data.get("correo")
    contrasena = data.get("contrasena")

    conn = None
    cursor = None

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM usuarios WHERE correo = %s", (correo,))
        results = cursor.fetchall()
        user = results[0] if results else None

        if user and check_password_hash(user["contrasena"], contrasena):
            return jsonify({
                "success": True,
                "message": "Inicio de sesión exitoso",
                "nombre": user["nombre"],
                "correo": user["correo"]
            })
        else:
            return jsonify({
                "success": False,
                "message": "Correo o contraseña incorrectos"
            })

    except Exception as e:
        print("Error en login:", e)
        return jsonify({"success": False, "message": "Error interno del servidor"})

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
