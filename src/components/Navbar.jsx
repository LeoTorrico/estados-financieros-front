import React from 'react';
import '../Styles/Navbar.css'; // Actualiza la ruta del archivo CSS
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary my-app-custom-navbar fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand custom-brand" href="#">ACEFTOOL</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active " aria-current="page" Link to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#" Link to="/empresas">Empresas</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
