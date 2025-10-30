from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth
<<<<<<< HEAD
from routes.calificaciones_routes import calificaciones_bp

app = Flask(__name__)
CORS(app)

# Registrar rutas
app.register_blueprint(auth)
app.register_blueprint(calificaciones_bp)
=======
from database import init_db

app = Flask(__name__)
# Permite CORS para endpoints bajo /api
CORS(app, resources={r"/api/*": {"origins": "*"}})

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
>>>>>>> 04c78dc80f5981cbfddada3316a60ed11de31805

if __name__ == "__main__":
    app.run(debug=True)
