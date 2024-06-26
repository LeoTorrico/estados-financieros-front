import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/UploadExcel.css'; 

function UploadExcel() {
  const [codigoEmpresa, setCodigoEmpresa] = useState('');
  const [tipoEstado, setTipoEstado] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codigoEmpresa || !tipoEstado || !file) {
      alert('Por favor, complete todos los campos y seleccione un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('codigoEmpresa', codigoEmpresa);
    formData.append('tipoEstado', tipoEstado);
    formData.append('file', file); // Cambiado a 'file'

    // Imprimir FormData en la consola
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post('https://backend-tss.vercel.app/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Empresa registrada con éxito');
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
      alert('Error al registrar la empresa');
    }
  };

  return (
    <div className="upload-excel-card">
      <form onSubmit={handleSubmit} className="upload-excel-form">
        <div className="card">
          <h3>Registrar Empresa</h3>
          <div className="form-group">
            <label htmlFor="codigoEmpresa">Código de Empresa:</label>
            <input
              type="text"
              id="codigoEmpresa"
              value={codigoEmpresa}
              onChange={(e) => setCodigoEmpresa(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipoEstado">Tipo de Estado:</label>
            <input
              type="text"
              id="tipoEstado"
              value={tipoEstado}
              onChange={(e) => setTipoEstado(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Archivo Excel:</label>
            <input
              type="file"
              id="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            <span className="plus-icon">+</span> Registrar Empresa
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadExcel;
