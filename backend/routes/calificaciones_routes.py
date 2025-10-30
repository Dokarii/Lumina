from flask import Blueprint, request, jsonify
from database import get_connection

calificaciones_bp = Blueprint("calificaciones_bp", __name__)

@calificaciones_bp.route("/calificaciones", methods=["POST"])
def guardar_calificacion():
    data = request.get_json()
    db = get_connection()
    cursor = db.cursor()

    cursor.execute("""
        INSERT INTO calificaciones (usuario_id, animo, estres, energia)
        VALUES (%s, %s, %s, %s)
    """, (
        data["usuario_id"],
        data["animo"],
        data["estres"],
        data["energia"]
    ))

    db.commit()
    cursor.close()
    db.close()

    return jsonify({"message": "Calificación guardada"}), 201
