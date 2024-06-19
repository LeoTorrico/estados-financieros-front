import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Ejemplo1 from './components/Ejemplo1';
import Ejemplo2 from './components/Ejemplo2';

function App() {
  const [showComponent, setShowComponent] = useState('');

  const handleShowComponent = (component) => {
    setShowComponent(component);
  };

  const handleHideComponent = () => {
    setShowComponent('');
  };

  return (
    <div>
      <h1 className="title">ACEFTOOL</h1>
      <div className="button-container">
        <button className="btn btn-primary" onClick={() => handleShowComponent('Ejemplo1')}>
          estados de resultados gestión 2023
        </button>
        <button className="btn btn-primary" onClick={() => handleShowComponent('Ejemplo2')}>
          estados de resultados gestión 2024
        </button>
        <button className="btn btn-secondary" onClick={handleHideComponent}>
          Ocultar
        </button>
      </div>
      {showComponent === 'Ejemplo1' && <Ejemplo1 />}
      {showComponent === 'Ejemplo2' && <Ejemplo2 />}
    </div>
  );
}

export default App;
