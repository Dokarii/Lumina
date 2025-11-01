import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./App.css";
import Footer from "./footer.jsx";
import HeaderPage from "./Header.jsx";

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [miniChart, setMiniChart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (!userData) {
      navigate("/iniciar-sesion");
    } else {
      setUsuario(userData);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMiniChart = async () => {
      if (!usuario || !usuario.id) return;
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/resumen/${usuario.id}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.grafico_barras) {
          setMiniChart(`data:image/png;base64,${data.grafico_barras}`);
        }
      } catch {
      }
    };
    fetchMiniChart();
  }, [usuario]);

  return (
    <div className="dashboard">
      <HeaderPage />

      <main className="dashboard-content grid">
        {usuario && (
          <section className="card welcome">
            <div className="card-header">
              <h1>Bienvenido, {usuario.nombre}!</h1>
              <p>Tu espacio personal para registrar tu estado y ver tu progreso.</p>
            </div>

            <div className="card-body">
              <div className="cta">
                <h2>Formulario diario</h2>
                <p>{usuario.nombre} aquí tienes el formulario de hoy</p>
                <Link to="/encuesta-page" rel="noopener noreferrer">
                  <button className="btn-primary">Responder</button>
                </Link>
              </div>
            </div>
          </section>
        )}

        <aside className="right-column">
          <section className="card resumen">
            <div className="card-header">
              <h2>Resumen</h2>
              <p>Visualiza un vistazo rápido de tus resultados recientes.</p>
            </div>
            <div className="card-body">
              {miniChart && (
                <div className="mini-chart">
                  <img src={miniChart} alt="Resumen rápido" />
                </div>
              )}
              <Link to="/resumen">
                <button className="btn-primary">Ver Resumen</button>
              </Link>
            </div>
          </section>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
