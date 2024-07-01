import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../Styles/Simulacion.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Simulacion = ({ codEmpresa }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartDataLine, setChartDataLine] = useState(null);
  const [chartDataBar, setChartDataBar] = useState(null);

  const handleGenerateSimulacion = () => {
    setLoading(true);
    axios.get(`https://backend-tss.vercel.app/api/proyeccion?codigoEmpresa=${codEmpresa}&tipoEstado=BALANCE GENERAL`)
      .then(response => {
        setData(response.data);
        setLoading(false);
        generateChartData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de simulación:', error);
        setLoading(false);
      });
  };

  const generateChartData = (data) => {
    const labels = data.map(item => item.nombreCuenta);
    const years = Object.keys(data[0]).filter(key => key !== 'nombreCuenta' && key !== 'tipoCuenta');

    const datasetsLine = years.map(year => ({
      label: year,
      data: data.map(item => parseFloat(item[year])),
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.1,
    }));

    const datasetsBar = years.map(year => ({
      label: year,
      data: data.map(item => parseFloat(item[year])),
      backgroundColor: getRandomColor(),
      borderWidth: 1,
    }));

    setChartDataLine({
      labels: labels,
      datasets: datasetsLine,
    });

    setChartDataBar({
      labels: labels,
      datasets: datasetsBar,
    });
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre de la Cuenta</th>
                    <th>Tipo de Cuenta</th>
                    {Object.keys(data[0]).filter(key => key !== 'nombreCuenta' && key !== 'tipoCuenta').map(year => (
                      <th key={year} className={year === '2024' ? 'highlight-2024' : ''}>{year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombreCuenta}</td>
                      <td>{item.tipoCuenta}</td>
                      {Object.keys(item).filter(key => key !== 'nombreCuenta' && key !== 'tipoCuenta').map(year => (
                        <td key={year} className={year === '2024' ? 'highlight-2024' : ''}>{item[year]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gráfico de Líneas */}
            {chartDataLine && (
              <div className="chart-container">
                <h4>Gráfico de Proyecciones (Líneas)</h4>
                <Line
                  data={chartDataLine}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        precision: 0,
                      },
                    },
                  }}
                />
              </div>
            )}

            {/* Gráfico de Barras */}
            {chartDataBar && (
              <div className="chart-container">
                <h4>Gráfico de Proyecciones (Barras)</h4>
                <Bar
                  data={chartDataBar}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        precision: 0,
                      },
                    },
                  }}
                />
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Simulacion;
