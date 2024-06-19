import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Ejemplo1 from './components/Ejemplo1';
import Ejemplo2 from './components/Ejemplo2';
import DragAndDrop from './components/DragAndDrop';

function App() {
  const [showComponent, setShowComponent] = useState('');
  const [fileData, setFileData] = useState(null);

  const handleShowComponent = (component) => {
    setShowComponent(component);
  };

  const handleHideComponent = () => {
    setShowComponent('');
  };

  const handleFileUpload = (data) => {
    setFileData(data);
    console.log('Uploaded file data:', data);
  };

  return (
    <div>
      <h1 className="title">ACEFTOOL</h1>
      <div className="d-grid gap-2">
        <button className="btn btn-primary" onClick={() => handleShowComponent('upload')}>
          Subir archivo excel
        </button>
        <button className="btn btn-primary" onClick={() => handleShowComponent('Ejemplo1')}>
          Estados de resultados gestión 2023
        </button>
        <button className="btn btn-primary" onClick={() => handleShowComponent('Ejemplo2')}>
          Estados de resultados gestión 2024
        </button>
        <button className="btn btn-primary" type="button">
          Mostrar graficas
        </button>
        <button className="btn btn-secondary" onClick={handleHideComponent}>
          Ocultar
        </button>
      </div>
      {showComponent === 'upload' && <DragAndDrop onFileUploaded={handleFileUpload} />}
      {showComponent === 'Ejemplo1' && <Ejemplo1 />}
      {showComponent === 'Ejemplo2' && <Ejemplo2 />}
    </div>
  );
}

export default App;
