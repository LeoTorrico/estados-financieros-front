import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';

function PageEmpresa() {
  const { cod_empresa } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://backend-tss.vercel.app/api/empresas/${cod_empresa}`)
      .then(response => {
        setEmpresa(response.data);
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
      {empresa ? (
        <div>
          <h1>{empresa.nombre_empresa}</h1>
          {/* Aquí puedes agregar más detalles sobre la empresa */}
        </div>
      ) : (
        <div className="title-container">
        <h1 >Empresa no encontrada</h1>
        <div className="divider"></div>
        </div>
      )}
    </div>
  );
}

export default PageEmpresa;
