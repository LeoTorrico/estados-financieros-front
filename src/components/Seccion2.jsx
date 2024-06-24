import React from 'react';
import '../Styles/Seccion2.css';
import imgCard1 from '/src/assets/card1.png'; // Ajusta la ruta según corresponda
import imgCard2 from '/src/assets/card2.webp';
import imgCard3 from '/src/assets/card3.jpg';

function Seccion2() {
  return (
    <div className="seccion2">
      <div className="seccion2-content">
        <h2 className="seccion2-title">Nuestra Funcionalidad</h2>
        <p className="seccion2-description">Explora las características y ventajas que ofrecemos.</p>
        <div className="cards-container">
          <div className="card">
            <img src={imgCard1} alt="Card 1" className="card-image"/>
            <h3 className="card-title">Función 1</h3>
            <p className="card-description">Descripción de la función 1.</p>
            <button className="card-button">Ir</button>
          </div>
          <div className="card">
            <img src={imgCard2} alt="Card 2" className="card-image"/>
            <h3 className="card-title">Función 2</h3>
            <p className="card-description">Descripción de la función 2.</p>
            <button className="card-button">Ir</button>
          </div>
          <div className="card">
            <img src={imgCard3} alt="Card 3" className="card-image"/>
            <h3 className="card-title">Función 3</h3>
            <p className="card-description">Descripción de la función 3.</p>
            <button className="card-button">Ir</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seccion2;
