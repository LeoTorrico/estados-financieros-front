import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import UploadExcel from '../components/UploadExcel.jsx';
import AnalisisVertical from '../components/AnalisisVertical.jsx';
import { useParams } from 'react-router-dom';
import '../Styles/PageEmpresa.css';

function PageEmpresa() {
  const { cod_empresa } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://backend-tss.vercel.app/api/empresa?codigoEmpresa=${cod_empresa}`)
      .then(response => {
        console.log('Datos recibidos:', response.data[0]);
        setEmpresa(response.data[0]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener la empresa:', error);
        setIsLoading(false);
      });
  }, [cod_empresa]);

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="spinner"></div>
      ) : empresa ? (
        <div className="title-container">
          <h1>{empresa.nombre_empresa}</h1>
          <div className="divider"></div>
        </div>
      ) : (
        <div className="title-container">
          <h1>Empresa no encontrada</h1>
          <div className="divider"></div>
        </div>
      )}
      <div className="grid-container">
        <div className="grid-item"><UploadExcel /></div>
        <div className="grid-item"><AnalisisVertical codEmpresa={cod_empresa} tipoEstado="BALANCE GENERAL" /></div>
      </div>
    </div>
  );
}

export default PageEmpresa;
