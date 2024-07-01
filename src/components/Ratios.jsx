import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Ratios.css';

const Ratios = ({ codEmpresa }) => {
  const [year, setYear] = useState('2019');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleGenerateRatios = () => {
    setLoading(true);
    axios.get(`https://backend-tss.vercel.app/api/ratios-financieros/${codEmpresa}/${year}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los ratios financieros:', error);
        setLoading(false);
      });
  };

  return (
    <div className="ratios-container">
      <div className="card">
        <h3>Ratios Financieros</h3>
        <div className="form-group">
          <label htmlFor="year">Seleccione el Año:</label>
          <select id="year" value={year} onChange={handleChangeYear}>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <button className="generate-button" onClick={handleGenerateRatios}>
          Generar Ratios Financieros
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
                  <th>Ratio</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Liquidez Corriente</td>
                  <td>{data.liquidez_corriente}</td>
                </tr>
                <tr>
                  <td>Prueba Ácida</td>
                  <td>{data.prueba_acida}</td>
                </tr>
                <tr>
                  <td>Capital de Trabajo</td>
                  <td>{data.capital_trabajo}</td>
                </tr>
                <tr>
                  <td>Endeudamiento Total</td>
                  <td>{data.endeudamiento_total}</td>
                </tr>
                <tr>
                  <td>Deuda Total</td>
                  <td>{data.deuda_total}</td>
                </tr>
                <tr>
                  <td>Solvencia</td>
                  <td>{data.solvencia}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default Ratios;
