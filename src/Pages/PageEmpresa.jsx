import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import UploadExcel from '../components/UploadExcel';
import Simulacion from '../components/Simulacion';
import AnalisisVertical from '../components/AnalisisVertical';
import AnalisisHorizontal from '../components/AnalisisHorizontal';
import Tendencias from '../components/Tendencias';
import Graficas from '../components/Graficas';
import Ratios from '../components/Ratios';
import { useParams } from 'react-router-dom';
import '../Styles/PageEmpresa.css';

function PageEmpresa() {
  const { cod_empresa } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAnalysis, setActiveAnalysis] = useState(''); // Estado para manejar el análisis activo

  useEffect(() => {
    axios.get(`https://backend-tss.vercel.app/api/empresa?codigoEmpresa=${cod_empresa}`)
      .then(response => {
        setEmpresa(response.data[0]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener la empresa:', error);
        setIsLoading(false);
      });
  }, [cod_empresa]);

  const renderAnalysis = () => {
    switch (activeAnalysis) {
      case 'vertical':
        return <AnalisisVertical codEmpresa={cod_empresa} />;
      case 'horizontal':
        return <AnalisisHorizontal codEmpresa={cod_empresa} />;
      case 'tendencias':
        return <Tendencias codEmpresa={cod_empresa} />;
      case 'simulacion':
        return <Simulacion codEmpresa={cod_empresa} />;
      case 'ratios':  
        return <Ratios codEmpresa={cod_empresa} />;
      default:
        return <div>Selecciona un análisis para mostrar</div>;
    }
  };

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
      <div className="panel">
        <button onClick={() => setActiveAnalysis('vertical')}>Análisis Vertical</button>
        <button onClick={() => setActiveAnalysis('horizontal')}>Análisis Horizontal</button>
        <button onClick={() => setActiveAnalysis('tendencias')}>Tendencias</button>
        <button onClick={() => setActiveAnalysis('ratios')}>Ratios</button>
        <button onClick={() => setActiveAnalysis('simulacion')}>Proyecciones</button>
      </div>
      <div className="results-container">
        {renderAnalysis()}  
      </div>
    </div>
  );
}

export default PageEmpresa;
