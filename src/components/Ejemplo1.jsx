import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Ejemplo1() {
  // Datos simulados para el estado de resultados
  const ventas = [
    { cuenta: 'Ventas', debe: null, haber: 48783},
    { cuenta: '(+) Recargo en ventas', debe: null, haber: 100 }
  ];
  const ventasbrutas = [
    { cuenta: 'Costo de ventas', debe: null, haber: 23880},
    { cuenta: 'Inventario inicial de mercaderias', debe: 8000, haber: null },
    { cuenta: '(+) compras', debe: 20000, haber: null},
    { cuenta: '   Merc. disponile p/la venta', debe: 28000, haber: null},
    { cuenta: '(-) inv final de mercaderias', debe: 4120, haber: null},
  ];
  const operaciones = [
    {cuenta: 'gastos de operaciones', debe: 19960, haber: null},
    {cuenta: 'impuesto a la transacciones', debe: 760, haber: null},
    {cuenta: 'gastos generales', debe: 1300, haber: null},
    {cuenta: 'sueldos y salarios', debe: 4900, haber: null},
    {cuenta: 'depreciacion y enseres', debe: 1200, haber: null},
    {cuenta: 'castigo gastos de organizacion', debe: 1000, haber: null},
    {cuenta: 'Alquileres', debe: 10800, haber: null}
  ];
  const utilidad = [
    {cuenta: 'otros ingresos', debe: null, haber: 3900},
    {cuenta: 'ingresos percibidos', debe: null, haber: 8943},
    {cuenta: 'Reserva legal ', debe: null, haber: 443},
  ];

  // Calculamos las Ventas Netas sumando los ingresos y restando los costos
  const ventasNetas = ventas.reduce((total, item) => {
    if (item.cuenta === 'Ventas') {
      total += item.haber;
    } else if (item.cuenta === '(+) Recargo en ventas') {
      total += item.haber;
    }
    return total;
  }, 0);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">COMERCIAL "MAGNOLIA" Ltda</h1>
      <h1 className="text-center mb-4">ESTADO DE RESULTADOS</h1>
      <h2 className="text-center mb-4">al 31 de diciembre del 2023</h2>
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
            <td colSpan="2">25003</td>
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
            <td colSpan="2">5043</td>
          </tr>
          {utilidad.map((item, index) => (
            <tr key={index}>
              <td>{item.cuenta}</td>
              <td>{item.debe}</td>
              <td>{item.haber}</td>
            </tr>
          ))}
          <tr>
            <td className="text-center"><strong>UTILIDAD NETA DE LA GESTION</strong></td>
            <td colSpan="2">5043</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Ejemplo1;
