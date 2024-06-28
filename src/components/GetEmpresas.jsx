import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/UploadExcel.css';

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
