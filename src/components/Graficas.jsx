import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function Graficas({ data2023, data2024 }) {
  const aggregateData = (data2023, data2024) => {
    const accounts = Array.from(new Set([...data2023.map(d => d.cuenta), ...data2024.map(d => d.cuenta)]));
    return accounts.map(cuenta => ({
      cuenta,
      '2023': data2023.find(d => d.cuenta === cuenta)?.haber || data2023.find(d => d.cuenta === cuenta)?.debe || 0,
      '2024': data2024.find(d => d.cuenta === cuenta)?.haber || data2024.find(d => d.cuenta === cuenta)?.debe || 0,
    }));
  };

  const ventasData = aggregateData(data2023.ventas, data2024.ventas);
  const ventasBrutasData = aggregateData(data2023.ventasbrutas, data2024.ventasbrutas);
  const operacionesData = aggregateData(data2023.operaciones, data2024.operaciones);
  const utilidadData = aggregateData(data2023.utilidad, data2024.utilidad);

  const renderBarChart = (data, title) => (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cuenta" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="2023" fill="#8884d8" />
          <Bar dataKey="2024" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div>
      {renderBarChart(ventasData, 'Ventas')}
      {renderBarChart(ventasBrutasData, 'Ventas Brutas')}
      {renderBarChart(operacionesData, 'Operaciones')}
      {renderBarChart(utilidadData, 'Utilidad')}
    </div>
  );
}

export default Graficas;
