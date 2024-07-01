import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../Styles/Tendencias.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Tendencias({ codEmpresa }) {
  const [baseYear, setBaseYear] = useState('2019');
  const [years, setYears] = useState(['2020', '2021', '2022', '2023']);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartDataLine, setChartDataLine] = useState(null);
  const [chartDataBar, setChartDataBar] = useState(null);

  const handleChangeBaseYear = (event) => {
    const selectedYear = event.target.value;
    setBaseYear(selectedYear);

    const newYears = [];
    for (let i = parseInt(selectedYear) + 1; i <= 2023; i++) {
      newYears.push(i.toString());
    }
    setYears(newYears);
  };

  const handleGenerateTrends = () => {
    setLoading(true);
    const yearsQuery = [baseYear, ...years].join(',');
    axios.get(`https://backend-tss.vercel.app/api/tendencias?codigoEmpresa=${codEmpresa}&tipoEstado=BALANCE%20GENERAL&years=${yearsQuery}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
        generateChartData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las tendencias:', error);
        setLoading(false);
      });
  };

  const generateChartData = (data) => {
    const labels = data.map(item => item.nombreCuenta);
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

  const columns = React.useMemo(
    () => [
      { Header: 'Tipo de Cuenta', accessor: 'tipoCuenta' },
      { Header: 'Nombre de Cuenta', accessor: 'nombreCuenta' },
      { Header: `${baseYear}`, accessor: baseYear },
      ...years.map(year => ({ Header: `${year}`, accessor: year })),
    ],
    [baseYear, years]
  );

  const tableInstance = useTable({ columns, data });

  useEffect(() => {
    if (data.length > 0) {
      generateChartData(data);
    }
  }, [data]);

  return (
    <div className="tendencias-container">
      <div className="card">
        <h3>Tendencias</h3>
        <div className="form-group">
          <label htmlFor="baseYear">Seleccione el Año Base:</label>
          <select id="baseYear" value={baseYear} onChange={handleChangeBaseYear}>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <button className="generate-button" onClick={handleGenerateTrends}>
          Generar Tendencias
        </button>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
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

          {/* Gráfico de Líneas */}
          {chartDataLine && (
            <div className="chart-container">
              <h4>Gráfico de Tendencias (Líneas)</h4>
              <Line
                data={{
                  labels: chartDataLine.labels,
                  datasets: chartDataLine.datasets,
                }}
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
              <h4>Gráfico de Tendencias (Barras)</h4>
              <Bar
                data={{
                  labels: chartDataBar.labels,
                  datasets: chartDataBar.datasets,
                }}
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
      )}
    </div>
  );
}

export default Tendencias;
