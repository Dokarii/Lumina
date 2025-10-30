import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo-area">
          <img src={LuminaLogoSolo} alt="Lumina Logo" className="lumina-logo" />
        </div>
        <strong>
          <p>Bienvenido a Lumina 🌞</p>
        </strong>
        <div className="user-area">
          {usuario && <span className="user-name">{usuario.nombre}</span>}
          <button onClick={handleLogout} className="logout-btn">
            Salir
          </button>
        </div>
      </header>
    </div>
  );
}

export default HeaderPage;
