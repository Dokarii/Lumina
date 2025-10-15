import { Routes, Route, Navigate } from 'react-router-dom'
import App from './Pages/App.jsx'
import Registro from './Pages/Registro.jsx'
import Dashboard from './Pages/Dashboard.jsx'

function RequireAuth({ children }) {
  const usuarioStr = localStorage.getItem('usuario');
  const isAuthed = !!usuarioStr;
  return isAuthed ? children : <Navigate to="/iniciar-sesion" replace />;
}
function Router() {
  return (
    <Routes>
      <Route path="/iniciar-sesion" element={<App />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
    </Routes>
  );
}

export default Router
