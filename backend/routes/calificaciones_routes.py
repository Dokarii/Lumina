from flask import Blueprint, request, jsonify
from database import get_connection
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
import numpy as np

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

@calificaciones_bp.route("/api/resumen/<int:usuario_id>", methods=["GET"])
def resumen_usuario(usuario_id):
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT animo, estres, energia, fecha_registro FROM calificaciones
        WHERE usuario_id = %s
    """, (usuario_id,))
    rows = cursor.fetchall()
    cursor.close()
    db.close()

    if not rows or len(rows) == 0:
        return jsonify({"error": "No hay registros de calificaciones para este usuario."}), 404

    # Extraer listas
    animo = [r["animo"] for r in rows if r["animo"] is not None]
    estres = [r["estres"] for r in rows if r["estres"] is not None]
    energia = [r["energia"] for r in rows if r["energia"] is not None]

    promedios = {
        "animo": round(float(np.mean(animo)), 2) if animo else None,
        "estres": round(float(np.mean(estres)), 2) if estres else None,
        "energia": round(float(np.mean(energia)), 2) if energia else None
    }

    # Gráfico de promedios
    fig, ax = plt.subplots(figsize=(5, 4))
    labels = ["Ánimo", "Estrés", "Energía"]
    values = [promedios["animo"], promedios["estres"], promedios["energia"]]
    sns.barplot(x=labels, y=values, ax=ax, palette="pastel")
    ax.set_ylim(0, 10)
    ax.set_ylabel("Promedio")
    ax.set_title("Promedio de cada grupo")
    plt.tight_layout()
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    plt.close(fig)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()

    # Gráfico de evolución temporal (opcional, por fechas)
    img_evo_base64 = None
    if len(rows) > 1:
        fechas = [r["fecha_registro"] for r in rows]
        fig2, ax2 = plt.subplots(figsize=(6, 4))
        ax2.plot(fechas, animo, label="Ánimo", marker="o")
        ax2.plot(fechas, estres, label="Estrés", marker="o")
        ax2.plot(fechas, energia, label="Energía", marker="o")
        ax2.set_ylabel("Valor")
        ax2.set_xlabel("Fecha")
        ax2.legend()
        ax2.set_title("Evolución temporal")
        plt.tight_layout()
        buf2 = io.BytesIO()
        plt.savefig(buf2, format="png")
        plt.close(fig2)
        buf2.seek(0)
        img_evo_base64 = base64.b64encode(buf2.read()).decode("utf-8")
        buf2.close()

    return jsonify({
        "promedios": promedios,
        "grafico_barras": img_base64,
        "grafico_evolucion": img_evo_base64
    }), 200

@calificaciones_bp.route("/calificaciones/usuario/<int:usuario_id>", methods=["GET"])
def obtener_por_usuario(usuario_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT animo, estres, energia, fecha_registro
        FROM calificaciones
        WHERE usuario_id = %s
        ORDER BY fecha_registro ASC
    """, (usuario_id,))

    datos = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({"data": datos})
