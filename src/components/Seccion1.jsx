import React from 'react';
import img1 from '/src/assets/img1.svg'; 
import '../Styles/Seccion1.css'; 
import { Link } from 'react-router-dom';

function Seccion1() {
  return (
    <div className="seccion1">
      <div className="seccion1-left">
        <h2>Comienza a analizar la vida de tu empresa!</h2>
        <p>Con nuestros distintos métodos podrás ver la salud de tu empresa.</p>
        <Link to="/empresas">
          <button className="custom-button">COMIENZA</button>
        </Link>
      </div>
      <div className="seccion1-right">
        <img src={img1} alt="Descripción de la imagen" />
      </div>
    </div>
  );
}

export default Seccion1;
