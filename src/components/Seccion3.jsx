import React from 'react';
import img2 from '/src/assets/img2.svg'; 
import '../Styles/Seccion3.css'; 

function Seccion3() {
  return (
    <div className="seccion3">
      <div className="seccion3-left">
        <img src={img2} alt="Descripción de la imagen" />
      </div>
      <div className="seccion3-right">
        <h2>Lo que hace nuestra página</h2>
        <div className="feature">
          <i className="bi bi-bar-chart icon-circle"></i>
          <p>Funcionalidad 1: Detalle de la funcionalidad.</p>
        </div>
        <div className="feature">
          <i className="bi bi-bar-chart icon-circle"></i>
          <p>Funcionalidad 2: Detalle de la funcionalidad.</p>
        </div>
        <div className="feature">
          <i className="bi bi-bar-chart icon-circle"></i>
          <p>Funcionalidad 3: Detalle de la funcionalidad.</p>
        </div>
        <div className="feature">
          <i className="bi bi-bar-chart icon-circle"></i>
          <p>Funcionalidad 4: Detalle de la funcionalidad.</p>
        </div>
      </div>
    </div>
  );
}

export default Seccion3;
