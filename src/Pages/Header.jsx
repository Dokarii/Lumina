import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./App.css";
import LuminaLogoSolo from "../images/LuminaLogoSolo.png";

function HeaderPage() {
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
    <header className="dashboard-header">
      <div className="logo-area">
        <img src={LuminaLogoSolo} alt="Lumina Logo" className="lumina-logo" />
        <div className="brand">
          <span className="brand-title">Lumina</span>
          <span className="brand-subtitle">Bienestar y aprendizaje</span>
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/resumen">Resumen</Link>
      </nav>

      <div className="user-area">
        {usuario && <span className="user-name">{usuario.nombre}</span>}
        <button onClick={handleLogout} className="logout-btn">
          Salir
        </button>
      </div>
    </header>
  );
}

export default HeaderPage;
