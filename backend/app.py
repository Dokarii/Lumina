from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth

app = Flask(__name__)
CORS(app)  # Permite comunicación con React

# Registrar rutas
app.register_blueprint(auth)

if __name__ == "__main__":
    app.run(debug=True)
