import React from 'react';
import Navbar from '../components/Navbar';
import GetEmpresas from '../components/GetEmpresas';
import '../Styles/PageEmpresas.css';

function Empresas() {
  return (
    <div>
      <Navbar />
      <div className="title-container">
        <h1>Empresas con las que trabajamos</h1>
        <div className="divider"></div>
      </div>
      <GetEmpresas />
    </div>
  );
}

export default Empresas;
