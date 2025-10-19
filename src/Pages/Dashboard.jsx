import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./App.css";

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
      <header className="dashboard-header">
        <div className="logo-area">
          <img
            src= "../images/LuminaLogoSolo.png" alt="Lumina Logo" className="lumina-logo"
          />
        </div>
        <strong>
          <p>
            Bienvenido a Lumina 🌞
          </p>
        </strong>
        <div className="user-area">
          {usuario && <span className="user-name">{usuario.nombre}</span>}
          <button onClick={handleLogout} className="logout-btn">
            Salir
          </button>
        </div>
      </header>

      {/* 💬 Bienvenida */}
      <main className="dashboard-content">
        <div className="grid">
          <section className="card">
            <h2>Tu perfil</h2>
            {usuario ? (
              <p>
                Nombre: <strong>{usuario.nombre}</strong>
              </p>
            ) : (
              <p>Inicia sesión para ver tu perfil.</p>
            )}
          </section>

          <section className="card card-actions">
            <h2>Acciones rápidas</h2>
            <div className="actions">
              <button className="btn-secondary" disabled>
                Editar perfil
              </button>
              <button className="btn-secondary" disabled>
                Ver reportes
              </button>
              <button className="btn-secondary" disabled>
                Configuración
              </button>
            </div>
          </section>

          <section className="card">
            <h2>Estado</h2>
            <p>Todo listo. Próximamente más funcionalidades.</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
