import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registro.css";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    correo: "",
    contrasena: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.error("/api/register status:", res.status);
        const text = await res.text();
        try {
          const err = JSON.parse(text);
          throw new Error(err.message || `Error ${res.status}`);
        } catch {
          throw new Error(text || `Error ${res.status}`);
        }
      }

      const data = await res.json();
      alert((data && data.message) || "Registro realizado");

      if (data && data.success) {
        setFormData({
          nombre: "",
          edad: "",
          correo: "",
          contrasena: "",
        });
        navigate("/iniciar-sesion");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert(error.message || "Error al registrar usuario");
    }
  };
  return (
    <div className="form-container register">
      <p className="title">Registro Lumina</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="pair-container">
          <div className="row personal-row">
            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="edad">Edad</label>
              <input
                type="number"
                name="edad"
                id="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row credentials-row">
            <div className="input-group">
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                name="correo"
                id="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                name="contrasena"
                id="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="input-group">
          <button className="sign" type="submit">
            Registrar
          </button>
        </div>

        <p className="signup">
          <Link to="/iniciar-sesion" rel="noopener noreferrer">
            ¿Ya tienes cuenta Lumina?
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registro;
