import React, { useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import '../Styles/AnalisisHorizontal.css';

function AnalisisHorizontal({ codEmpresa }) {
  const [baseYear, setBaseYear] = useState('2019');
  const [compareYear, setCompareYear] = useState('2020');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeBaseYear = (event) => {
    setBaseYear(event.target.value);
  };

  const handleChangeCompareYear = (event) => {
    setCompareYear(event.target.value);
  };

  const handleGenerateAnalysis = () => {
    setLoading(true);
    axios.get(`https://backend-tss.vercel.app/api/analisis-horizontal?codigoEmpresa=${codEmpresa}&tipoEstado=BALANCE%20GENERAL&year1=${baseYear}&year2=${compareYear}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el análisis horizontal:', error);
        setLoading(false);
      });
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Tipo de Cuenta', accessor: 'tipoCuenta' },
      { Header: 'Nombre de Cuenta', accessor: 'nombreCuenta' },
      { Header: `${baseYear}`, accessor: baseYear },
      { Header: `${compareYear}`, accessor: compareYear },
      { Header: 'Variación Absoluta', accessor: 'variacionAbsoluta' },
      { Header: 'Variación Relativa %', accessor: 'variacionRelativa' },
    ],
    [baseYear, compareYear]
  );

  const tableInstance = useTable({ columns, data });

  return (
    <div className="analisis-horizontal-container">
      <div className="card">
        <h3>Análisis Horizontal</h3>
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
        <div className="form-group">
          <label htmlFor="compareYear">Seleccione el Año a Comparar:</label>
          <select id="compareYear" value={compareYear} onChange={handleChangeCompareYear}>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <button className="generate-button" onClick={handleGenerateAnalysis}>
          Generar Análisis Horizontal
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
    </div>
  );
}

export default AnalisisHorizontal;
