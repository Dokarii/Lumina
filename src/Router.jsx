import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./Pages/App.jsx";
import Registro from "./Pages/Registro.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import MoodSurvey from "./Pages/MoodSurvey.jsx";
import Resumen from "./Pages/Resumen.jsx";

function RequireAuth({ children }) {
  const usuarioStr = localStorage.getItem("usuario");
  const isAuthed = !!usuarioStr;
  return isAuthed ? children : <Navigate to="/" replace />;
}
const router = createBrowserRouter(
  [
    { path: "/", element: <Navigate to="/iniciar-sesion" replace /> },
    { path: "/iniciar-sesion", element: <App /> },
    { path: "/registro", element: <Registro /> },
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
    },
    {
      path: "/resumen",
      element: (
        <RequireAuth>
          <Resumen />
        </RequireAuth>
      ),
    },
    {
      path: "/encuesta-page",
      element: (
        <RequireAuth>
          <MoodSurvey />
        </RequireAuth>
      ),
    },
  ],
  {
    future: { v7_relativeSplatPath: true },
  }
);

export default function Router() {
  return <RouterProvider router={router} />;
}
