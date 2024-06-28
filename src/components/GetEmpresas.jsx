import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/UploadExcel.css';

import imgCard1 from '/src/assets/card1.png';
import imgCard2 from '/src/assets/card2.webp';
import imgCard3 from '/src/assets/card3.jpg';

function GetEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend-tss.vercel.app/api/empresas')
      .then(response => {
        setEmpresas(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las empresas:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="upload-excel-grid-container">
      {empresas.map((empresa) => (
        <div key={empresa.id} className="upload-excel-empresa-card">
          <div className="upload-excel-card-inner">
            <h3 className="card-title">{empresa.nombre_empresa}</h3>
            <h4>{empresa.nombre}</h4>
            {/* Lógica para asignar imagen */}
            <div className="card-image-container">
              {empresa.nro_imagen === 1 && <img src={imgCard1} alt="Card 1" />}
              {empresa.nro_imagen === 2 && <img src={imgCard2} alt="Card 2" />}
              {empresa.nro_imagen === 3 && <img src={imgCard3} alt="Card 3" />}
            </div>
            <button
              className="view-button"
              onClick={() => navigate(`/empresa/${empresa.cod_empresa}`)}
            >
              Ver Empresa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetEmpresas;
