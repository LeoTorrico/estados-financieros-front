import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../Styles/UploadExcel.module.css';

function UploadExcel() {
  const { cod_empresa } = useParams();
  const [tipoEstado, setTipoEstado] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cod_empresa || !tipoEstado || !file) {
      alert('Por favor, complete todos los campos y seleccione un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('codigoEmpresa', cod_empresa);
    formData.append('tipoEstado', tipoEstado);
    formData.append('file', file);

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
    <div className={styles['upload-excel-grid-container']}>
      <div className={styles['upload-excel-card']}>
        <form onSubmit={handleSubmit} className={styles['upload-excel-form']}>
          <div className={styles['upload-excel-card-inner']}>
            <h3>Subir archivos</h3>
            <div className={styles['form-group']}>
              <label htmlFor="tipoEstado">Tipo de Estado:</label>
              <select
                id="tipoEstado"
                value={tipoEstado}
                onChange={(e) => setTipoEstado(e.target.value)}
                className={styles['input']}
                required
              >
                <option value="">Seleccione un tipo de estado</option>
                <option value="BALANCE GENERAL">BALANCE GENERAL</option>
                <option value="ESTADOS DE RESULTADOS">ESTADOS DE RESULTADOS</option>
              </select>
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="file">Archivo Excel:</label>
              <input
                type="file"
                id="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className={styles['input']}
                required
              />
            </div>
            <button type="submit" className={styles['register-button']}>
              <span className={styles['plus-icon']}>+</span> Registrar Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadExcel;
