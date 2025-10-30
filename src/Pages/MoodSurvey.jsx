import React, { useState } from "react";
import "./MoodSurvey.css";
import { Link } from "react-router-dom";

function MoodSurvey() {
  const [responses, setResponses] = useState({});

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: Number(value) }));
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length < 9) {
      alert("Por favor responde todas las preguntas");
      return;
    }

    const animo = Math.round((responses[1] + responses[2] + responses[3]) / 3);
    const estres = Math.round((responses[4] + responses[5] + responses[6]) / 3);
    const energia = Math.round(
      (responses[7] + responses[8] + responses[9]) / 3
    );

    const usuario_id = localStorage.getItem("usuarioId");

    if (!usuario_id) {
      alert("No se encontró el ID del usuario. Por favor inicia sesión nuevamente.");
      return;
    }

    const payload = {
      usuario_id: Number(usuario_id),
      animo,
      estres,
      energia,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/calificaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("/api/calificaciones status:", response.status);
        throw new Error("Error guardando la calificación");
      }
      alert("✅ Tu estado emocional ha sido registrado");
      setResponses({});
    } catch (error) {
      console.error(error);
      alert("❌ Hubo un error, intenta nuevamente");
    }
  };

  const questions = [
    {
      id: 1,
      text: "¿Cómo te has sentido emocionalmente en los últimos días?",
      category: "Ánimo",
    },
    {
      id: 2,
      text: "¿Sientes que puedes disfrutar las cosas que normalmente te gustan?",
      category: "Ánimo",
    },
    {
      id: 3,
      text: "¿Te has sentido motivado/a para hacer tus actividades diarias?",
      category: "Ánimo",
    },
    {
      id: 4,
      text: "¿Con qué frecuencia te sientes abrumado/a por tus responsabilidades o emociones?",
      category: "Estrés",
    },
    {
      id: 5,
      text: "¿Has tenido dificultades para dormir, concentrarte o relajarte últimamente?",
      category: "Estrés",
    },
    {
      id: 6,
      text: "¿Sientes que estás bajo presión o tensión emocional?",
      category: "Estrés",
    },
    {
      id: 7,
      text: "¿Cómo describirías tu nivel de energía en los últimos días?",
      category: "Energía",
    },
    {
      id: 8,
      text: "¿Te sientes con fuerzas para enfrentar tus actividades diarias?",
      category: "Energía",
    },
    {
      id: 9,
      text: "¿Tu cuerpo se ha sentido activo o con ganas de moverse?",
      category: "Energía",
    },
  ];

  return (
    <div className="survey-container">
      <h1 className="survey-title">Encuesta de Bienestar</h1>

      {questions.map((q) => (
        <div key={q.id} className={`question-card ${q.category.toLowerCase()}`}>
          <p className="question-text">
            {q.id}. {q.text}
          </p>
          <div className="options-container">
            {[5, 4, 3, 2, 1].map((score) => (
              <label key={score} className="option-item">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={score}
                  checked={responses[q.id] === score}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
                {score}
              </label>
            ))}
          </div>
        </div>
      ))}

      <Link to="/dashboard">
        <button className="submit-btn" onClick={handleSubmit}>
          Enviar
        </button>
      </Link>
    </div>
  );
}

export default MoodSurvey;
