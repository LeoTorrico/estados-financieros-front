import React, { useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../Styles/AnalisisVertical.css';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AnalisisVertical({ codEmpresa }) {
  const [year, setYear] = useState('2019');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleGenerateAnalysis = () => {
    setLoading(true);
    axios.get(`https://backend-tss.vercel.app/api/analisis-vertical?codigoEmpresa=${codEmpresa}&tipoEstado=BALANCE%20GENERAL&year=${year}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el análisis vertical:', error);
        setLoading(false);
      });
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Año', accessor: year },
      { Header: 'Categoría', accessor: 'CATEGORIA' },
      { Header: 'Cuenta', accessor: 'CUENTA' },
      { Header: 'Análisis Vertical %', accessor: 'ANALISIS VERTICAL %' },
      { Header: 'Análisis Vertical Subcuenta %', accessor: 'ANALISIS VERTICAL SUBCUENTA %' },
    ],
    [year]
  );

  const tableInstance = useTable({ columns, data });

  // Configuración de datos para el gráfico
  const chartData = {
    labels: data.map(item => item.CUENTA),
    datasets: [
      {
        label: 'Análisis Vertical %',
        data: data.map(item => item['ANALISIS VERTICAL %']),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Análisis Vertical Subcuenta %',
        data: data.map(item => item['ANALISIS VERTICAL SUBCUENTA %']),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }
    ]
  };

  return (
    <div className="analisis-vertical-container">
      <div className="card">
        <h3>Análisis Vertical</h3>
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
        <button className="generate-button" onClick={handleGenerateAnalysis}>
          Generar Análisis Vertical
        </button>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="table-container">
          <table {...tableInstance.getTableProps()} className="table">
            <thead>
              {tableInstance.headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...tableInstance.getTableBodyProps()}>
              {tableInstance.rows.map(row => {
                tableInstance.prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="chart-container">
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default AnalisisVertical;
