import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./App.css";
import Footer from "./footer.jsx";
import HeaderPage from "./Header.jsx";

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (!userData) {
      navigate("/iniciar-sesion");
    } else {
      setUsuario(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/iniciar-sesion");
  };

  return (
    <div className="dashboard">
      <HeaderPage />
      <div className="dashboard-content">
        {usuario && (
          <div className="welcome-section">
            <h1>Bienvenido, {usuario.nombre}!</h1>
            <div className="via-form">
              <h2>Formulario diario</h2>
              <p>{usuario.nombre} aqui tienes el formulario de hoy</p>
              <Link to="/encuesta-page" rel="noopener noreferrer"><button>Responder</button></Link>
            </div>
          </div>
        )}
        <div className="right-sections">
          <div className="resumen-section">
            <h2>Resumen de tu progreso</h2>
            <button>Ver Resumen</button>
          </div>
          <div className="ultima-respuesta-section">
            <h2>Tu última respuesta</h2>
            <button>Ver Última Respuesta</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
