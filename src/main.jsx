import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio.jsx';
import Empresas from './Pages/Empresas.jsx';
import PageEmpresa from './Pages/PageEmpresa.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/empresas" element={<Empresas />} />
      <Route path="/empresa/:cod_empresa" element={<PageEmpresa />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
