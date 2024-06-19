import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Ejemplo2() {
  // Datos simulados para el estado de resultados
  const ventas = [
    { cuenta: 'Ventas', debe: null, haber: 55000 },
    { cuenta: '(+) Recargo en ventas', debe: null, haber: 200 }
  ];
  const ventasbrutas = [
    { cuenta: 'Costo de ventas', debe: null, haber: 28000 },
    { cuenta: 'Inventario inicial de mercaderías', debe: 9000, haber: null },
    { cuenta: '(+) Compras', debe: 22000, haber: null },
    { cuenta: 'Merc. disponible p/la venta', debe: 31000, haber: null },
    { cuenta: '(-) Inv final de mercaderías', debe: 4500, haber: null },
  ];
  const operaciones = [
    { cuenta: 'Gastos de operaciones', debe: 22000, haber: null },
    { cuenta: 'Impuesto a las transacciones', debe: 800, haber: null },
    { cuenta: 'Gastos generales', debe: 1500, haber: null },
    { cuenta: 'Sueldos y salarios', debe: 5200, haber: null },
    { cuenta: 'Depreciación y enseres', debe: 1300, haber: null },
    { cuenta: 'Castigo gastos de organización', debe: 1200, haber: null },
    { cuenta: 'Alquileres', debe: 11200, haber: null }
  ];
  const utilidad = [
    { cuenta: 'Otros ingresos', debe: null, haber: 4500 },
    { cuenta: 'Ingresos percibidos', debe: null, haber: 9400 },
    { cuenta: 'Reserva legal', debe: null, haber: 500 },
  ];

  // Calculamos las Ventas Netas sumando los ingresos y restando los costos
  const ventasNetas = ventas.reduce((total, item) => {
    if (item.cuenta === 'Ventas' || item.cuenta === '(+) Recargo en ventas') {
      total += item.haber || 0;
    }
    return total;
  }, 0);

  // Calculamos la Utilidad Bruta en Ventas
  const utilidadBruta = ventasbrutas.reduce((total, item) => {
    if (item.haber) {
      total += item.haber;
    } else if (item.debe) {
      total -= item.debe;
    }
    return total;
  }, 0);

  // Calculamos la Utilidad en Operaciones
  const utilidadOperaciones = operaciones.reduce((total, item) => {
    if (item.debe) {
      total -= item.debe;
    }
    return total;
  }, utilidadBruta);

  // Calculamos la Utilidad Neta de la Gestión
  const utilidadNeta = utilidad.reduce((total, item) => {
    if (item.haber) {
      total += item.haber;
    }
    return total;
  }, utilidadOperaciones);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">COMERCIAL "MAGNOLIA" Ltda</h1>
      <h1 className="text-center mb-4">ESTADO DE RESULTADOS</h1>
      <h2 className="text-center mb-4">al 31 de diciembre del 2024</h2>
      <h2 className="text-center mb-4">expresado en bolivianos</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Cuentas</th>
            <th scope="col">Debe</th>
            <th scope="col">Haber</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((item, index) => (
            <tr key={index}>
              <td>{item.cuenta}</td>
              <td>{item.debe}</td>
              <td>{item.haber}</td>
            </tr>
          ))}
          <tr>
            <td className="text-center"><strong>VENTAS NETAS</strong></td>
            <td colSpan="2">{ventasNetas}</td>
          </tr>
          {ventasbrutas.map((item, index) => (
            <tr key={index}>
              <td>{item.cuenta}</td>
              <td>{item.debe}</td>
              <td>{item.haber}</td>
            </tr>
          ))}
          <tr>
            <td className="text-center"><strong>UTILIDAD BRUTA EN VENTAS</strong></td>
            <td colSpan="2">{utilidadBruta}</td>
          </tr>
          {operaciones.map((item, index) => (
            <tr key={index}>
              <td>{item.cuenta}</td>
              <td>{item.debe}</td>
              <td>{item.haber}</td>
            </tr>
          ))}
          <tr>
            <td className="text-center"><strong>UTILIDAD EN OPERACIONES</strong></td>
            <td colSpan="2">{utilidadOperaciones}</td>
          </tr>
          {utilidad.map((item, index) => (
            <tr key={index}>
              <td>{item.cuenta}</td>
              <td>{item.debe}</td>
              <td>{item.haber}</td>
            </tr>
          ))}
          <tr>
            <td className="text-center"><strong>UTILIDAD NETA DE LA GESTIÓN</strong></td>
            <td colSpan="2">{utilidadNeta}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Ejemplo2;
