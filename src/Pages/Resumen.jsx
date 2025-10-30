import React, { useState, useEffect } from "react";
import "./Resumen.css";

function Resumen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar datos automáticamente al montar el componente
  useEffect(() => {
    handleResumen();
  }, []);

  const promedio = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const handleResumen = async () => {
    // Obtener el ID del usuario directamente con la clave correcta
    const usuario_id = localStorage.getItem("usuarioId");

    if (!usuario_id) {
      alert("No se encontró el ID del usuario");
      return;
    }

    setLoading(true);

    try {
      console.log("Obteniendo datos para el usuario ID:", usuario_id);
      const response = await fetch(
        `http://localhost:5000/calificaciones/usuario/${usuario_id}`
      );

      if (!response.ok) {
        console.error("Error en la respuesta:", response.status);
        alert(`Error al obtener datos: ${response.status}`);
        setLoading(false);
        return;
      }

      const result = await response.json();
      console.log("Datos recibidos:", result);
      const registros = result.data || result;

      if (!registros || registros.length === 0) {
        console.log("No se encontraron registros");
        alert("No hay datos para mostrar");
        setLoading(false);
        return;
      }

      // Procesar los datos para la tabla
      const processedData = registros.map((registro) => {
        const fecha = new Date(
          registro.fecha_registro || registro.fecha
        ).toLocaleDateString();
        const animo = registro.animo || 0;
        const energia = registro.energia || 0;
        const estres = registro.estres || 0;
        const promedioRegistro = Math.round((animo + energia + estres) / 3);

        return {
          fecha,
          animo,
          energia,
          estres,
          promedio: promedioRegistro,
        };
      });

      setData(processedData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      alert("Error al obtener datos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resumen-container">
      <h1>Tu resumen Lumina</h1>
      <button onClick={handleResumen} className="update-button">
        Actualizar datos
      </button>

      {loading ? (
        <p className="loading-message">Cargando datos...</p>
      ) : data ? (
        <div className="table-container">
          <table className="resumen-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Ánimo</th>
                <th>Energía</th>
                <th>Estrés</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.fecha}</td>
                  <td>{item.animo}</td>
                  <td>{item.energia}</td>
                  <td>{item.estres}</td>
                  <td>{item.promedio}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.length > 0 && (
            <div className="resumen-promedios">
              <h3>Promedios Generales</h3>
              <p>
                Ánimo: {Math.round(promedio(data.map((item) => item.animo)))}
              </p>
              <p>
                Energía:{" "}
                {Math.round(promedio(data.map((item) => item.energia)))}
              </p>
              <p>
                Estrés: {Math.round(promedio(data.map((item) => item.estres)))}
              </p>
              <p>
                Bienestar general:{" "}
                {Math.round(promedio(data.map((item) => item.promedio)))}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="no-data-message">
          No hay datos disponibles. Completa la encuesta de bienestar para ver
          resultados.
        </p>
      )}
    </div>
  );
}

export default Resumen;
