from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth
from routes.calificaciones_routes import calificaciones_bp

app = Flask(__name__)
CORS(app)

# Registrar rutas
app.register_blueprint(auth)
app.register_blueprint(calificaciones_bp)

if __name__ == "__main__":
    app.run(debug=True)
