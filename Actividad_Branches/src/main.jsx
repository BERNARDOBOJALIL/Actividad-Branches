import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Api from '../src/api/api'
import Login from './login/login';  // Mantén el componente Login
import './index.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Página de Login */}
        <Route path="/api" element={<Api />} />  {/* Página de la API */}
      </Routes>
    </Router>
  </StrictMode>,
);