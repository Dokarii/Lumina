import { Routes, Route, Navigate } from "react-router-dom";
import App from "./Pages/App.jsx";
import Registro from "./Pages/Registro.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import MoodSurvey from "./Pages/MoodSurvey.jsx";

function RequireAuth({ children }) {
  const usuarioStr = localStorage.getItem("usuario");
  const isAuthed = !!usuarioStr;
  return isAuthed ? children : <Navigate to="/" replace />;
}
function Router() {
  return (
    <Routes>
      <Route path="/iniciar-sesion" element={<App />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/encuesta-page"
        element={
          <RequireAuth>
            <MoodSurvey />
          </RequireAuth>
        }
      />
      <Route path="/" element={<RequireAuth></RequireAuth>} />
    </Routes>
  );
}

export default Router;
