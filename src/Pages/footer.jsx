import React from "react";
import "./Footer.css";
import logo from "../images/LuminaLogo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logo} alt="Lumina" className="footer-logo" />
          <div className="footer-brand-text">
            <span className="footer-title">Lumina</span>
            <span className="footer-subtitle">Bienestar y aprendizaje</span>
          </div>
        </div>

        <nav className="footer-nav">
          <a href="/">Inicio</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/resumen">Resumen</a>
        </nav>

        <div className="footer-credits">
          <span>Ricardo Tejedor Anaya & Simón Valencia Lopez</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Lumina. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}

export default Footer;
