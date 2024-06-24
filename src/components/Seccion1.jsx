import React from 'react';
import img1 from '/src/assets/img1.svg'; 
import '../Styles/Seccion1.css'; 

function Seccion1() {
  return (
    <div className="seccion1">
      <div className="seccion1-left">
        <h2>Lo que hace nuestra página</h2>
        <p>Esta página te permite hacer X, Y y Z de manera eficiente y fácil.</p>
        <button className="custom-button">Conoce más</button>
      </div>
      <div className="seccion1-right">
        <img src={img1} alt="Descripción de la imagen" />
      </div>
    </div>
  );
}

export default Seccion1;
