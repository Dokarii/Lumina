import { Routes, Route } from 'react-router-dom'
import App from './Pages/App.jsx'
import Registro from './Pages/Registro.jsx'
import Dashboard from './Pages/Dashboard.jsx'
function Router() {
  return (
    <Routes>
      <Route path="/iniciar-sesion" element={<App />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default Router
