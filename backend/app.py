from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth
from routes.calificaciones_routes import calificaciones_bp
from database import init_db

app = Flask(__name__)
# Permite CORS para toda la app (incluye /api)
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)

# Cabeceras CORS explícitas para preflight y peticiones reales
@app.after_request
def add_cors_headers(response):
    response.headers.setdefault("Access-Control-Allow-Origin", "*")
    response.headers.setdefault(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With",
    )
    response.headers.setdefault(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    )
    return response

# Inicializar base de datos (crea tablas si no existen)
init_db()

# Ruta raíz para ver el estado del backend
@app.get("/")
def root():
    return "OK - Lumina backend"

# Registrar rutas con prefijo /api
app.register_blueprint(auth, url_prefix="/api")
app.register_blueprint(calificaciones_bp, url_prefix="/api")


if __name__ == "__main__":
    app.run(debug=True)
