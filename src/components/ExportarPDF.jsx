import React from 'react';
import axios from 'axios';

function ExportarPDF() {
  const handleExportPDF = () => {
    const data = [
      { campo1: 'valor1', campo2: 'valor2' },
      { campo1: 'valor3', campo2: 'valor4' },
      
    ];
    
    const filename = 'empresa_reporte.pdf';
    
    axios.post('https://backend-tss.vercel.app/api/generar-pdf', { data, filename }, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Cambia el nombre del archivo si es necesario
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error('Error al exportar PDF:', error);
      });
  };

  return (
    <div>
      <h3>Exportar PDF</h3>
      <button onClick={handleExportPDF}>Exportar PDF</button>
    </div>
  );
}

export default ExportarPDF;
