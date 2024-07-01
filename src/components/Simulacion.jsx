import React, { useState } from 'react';
import axios from 'axios';

const Simulacion = ({ codEmpresa }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSimulacion = () => {
    setLoading(true);
    axios.get(`https://backend-tss.vercel.app/api/proyeccion?codigoEmpresa=${codEmpresa}&tipoEstado=BALANCE GENERAL`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos de simulación:', error);
        setLoading(false);
      });
  };

  return (
    <div className="simulacion-container">
      <div className="card">
        <h3>Proyecciones Financieras</h3>
        <button className="generate-button" onClick={handleGenerateSimulacion}>
          Generar Proyecciones
        </button>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        data && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre de la Cuenta</th>
                  <th>Tipo de Cuenta</th>
                  <th>Valor Promedio</th>
                  <th>Año de Proyección</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombreCuenta}</td>
                    <td>{item.tipoCuenta}</td>
                    <td>{item.valorPromedio}</td>
                    <td>{item.yearProyeccion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default Simulacion;
