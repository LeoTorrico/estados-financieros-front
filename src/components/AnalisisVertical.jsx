import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import '../Styles/AnalisisVertical.css'; // Crea este archivo para estilos adicionales si es necesario

function AnalisisVertical() {
  const { cod_empresa } = useParams();
  const [year, setYear] = useState('2019');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleGenerateAnalysis = () => {
    setLoading(true);
    axios.get(`https://backend-tss.vercel.app/api/analisis-vertical?codigoEmpresa=${cod_empresa}&tipoEstado=BALANCE%20GENERAL&year=${year}`)
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
      {
        Header: 'Año',
        accessor: year,
      },
      {
        Header: 'Categoría',
        accessor: 'CATEGORIA',
      },
      {
        Header: 'Cuenta',
        accessor: 'CUENTA',
      },
      {
        Header: 'Análisis Vertical %',
        accessor: 'ANALISIS VERTICAL %',
      },
      {
        Header: 'Análisis Vertical Subcuenta %',
        accessor: 'ANALISIS VERTICAL SUBCUENTA %',
      },
    ],
    [year]
  );

  const tableInstance = useTable({ columns, data });

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
    </div>
  );
}

export default AnalisisVertical;
