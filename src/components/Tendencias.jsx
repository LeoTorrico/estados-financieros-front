import React, { useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import '../Styles/Tendencias.css';

function Tendencias({ codEmpresa }) {
  const [baseYear, setBaseYear] = useState('2019');
  const [years, setYears] = useState(['2020', '2021', '2022', '2023']);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      })
      .catch(error => {
        console.error('Error al obtener las tendencias:', error);
        setLoading(false);
      });
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

export default Tendencias;
