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
        <h2>Te garantizamos:</h2>
        <div className="feature">
          <i className="bi bi-graph-up icon-circle"></i>
          <p>Funcionalidad 1: Análisis detallado de datos financieros.</p>
        </div>
        <div className="feature">
          <i className="bi bi-shield-check icon-circle"></i>
          <p>Funcionalidad 2: Seguridad y protección de la información.</p>
        </div>
        <div className="feature">
          <i className="bi bi-lightbulb icon-circle"></i>
          <p>Funcionalidad 3: Ideas y recomendaciones basadas en datos.</p>
        </div>
        <div className="feature">
          <i className="bi bi-speedometer2 icon-circle"></i>
          <p>Funcionalidad 4: Rendimiento y eficiencia optimizada.</p>
        </div>
      </div>
    </div>
  );
}

export default Seccion3;
