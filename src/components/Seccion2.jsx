import React from 'react';
import '../Styles/Seccion2.css';
import imgCard1 from '/src/assets/card1.png'; // Ajusta la ruta según corresponda
import imgCard2 from '/src/assets/card2.webp';
import imgCard3 from '/src/assets/card3.jpg';
import imgCard4 from '/src/assets/card4.webp';
import imgCard5 from '/src/assets/card5.avif';

function Seccion2() {
  return (
    <div className="seccion2">
      <div className="seccion2-content">
        <h2 className="seccion2-title">Ofrecemos los siguientes análisis</h2>
        <p className="seccion2-description">Explora las características y ventajas que ofrecemos.</p>
        <div className="cards-container">
          <div className="card">
            <img src={imgCard1} alt="Card 1" className="card-image"/>
            <h3 className="card-title">Vertical</h3>
            <p className="card-description">Análisis de la estructura financiera interna.</p>
          </div>
          <div className="card">
            <img src={imgCard2} alt="Card 2" className="card-image"/>
            <h3 className="card-title">Horizontal</h3>
            <p className="card-description">Comparación de datos financieros a lo largo del tiempo.</p>
          </div>
          <div className="card">
            <img src={imgCard3} alt="Card 3" className="card-image"/>
            <h3 className="card-title">Tendencias</h3>
            <p className="card-description">Identificación de patrones y proyecciones futuras.</p>
          </div>
          <div className="card">
            <img src={imgCard4} alt="Card 4" className="card-image"/>
            <h3 className="card-title">Proyecciones</h3>
            <p className="card-description">Estimaciones financieras basadas en datos actuales.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seccion2;
