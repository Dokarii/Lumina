import { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo,
          contrasena,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Bienvenido " + data.nombre);
        localStorage.setItem("usuario", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <>
      <div className="form-container">
        <p className="title">Iniciar Sesión</p>

        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              name="correo"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <button className="sign" type="submit">
            Entrar
          </button>

          <div className="forgot">
            <Link to="#" rel="noopener noreferrer">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>

        <p className="signup">
          <Link to="/registro" rel="noopener noreferrer">
            ¿Aún no tienes cuenta?
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
