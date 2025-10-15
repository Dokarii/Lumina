import { useState } from "react";
import { Link } from "react-router-dom";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    correo: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setFormData({
          nombre: "",
          edad: "",
          correo: "",
          contrasena: "",
        });
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    }
  };
  return (
    <div className="form-container">
      <p className="title">Registro Lumina</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="grid-pairs">
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
