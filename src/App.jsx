import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Ejemplo1 from './components/Ejemplo1';
import Ejemplo2 from './components/Ejemplo2';
import DragAndDrop from './components/DragAndDrop';
import Graficas from './components/Graficas';

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

  const data2023 = {
    ventas: [
      { cuenta: 'Ventas', debe: null, haber: 48783 },
      { cuenta: '(+) Recargo en ventas', debe: null, haber: 100 }
    ],
    ventasbrutas: [
      { cuenta: 'Costo de ventas', debe: null, haber: 23880 },
      { cuenta: 'Inventario inicial de mercaderias', debe: 8000, haber: null },
      { cuenta: '(+) compras', debe: 20000, haber: null },
      { cuenta: '   Merc. disponile p/la venta', debe: 28000, haber: null },
      { cuenta: '(-) inv final de mercaderias', debe: 4120, haber: null }
    ],
    operaciones: [
      { cuenta: 'gastos de operaciones', debe: 19960, haber: null },
      { cuenta: 'impuesto a la transacciones', debe: 760, haber: null },
      { cuenta: 'gastos generales', debe: 1300, haber: null },
      { cuenta: 'sueldos y salarios', debe: 4900, haber: null },
      { cuenta: 'depreciacion y enseres', debe: 1200, haber: null },
      { cuenta: 'castigo gastos de organizacion', debe: 1000, haber: null },
      { cuenta: 'Alquileres', debe: 10800, haber: null }
    ],
    utilidad: [
      { cuenta: 'otros ingresos', debe: null, haber: 3900 },
      { cuenta: 'ingresos percibidos', debe: null, haber: 8943 },
      { cuenta: 'Reserva legal ', debe: null, haber: 443 }
    ]
  };

  const data2024 = {
    ventas: [
      { cuenta: 'Ventas', debe: null, haber: 55000 },
      { cuenta: '(+) Recargo en ventas', debe: null, haber: 200 }
    ],
    ventasbrutas: [
      { cuenta: 'Costo de ventas', debe: null, haber: 28000 },
      { cuenta: 'Inventario inicial de mercaderías', debe: 9000, haber: null },
      { cuenta: '(+) Compras', debe: 22000, haber: null },
      { cuenta: 'Merc. disponible p/la venta', debe: 31000, haber: null },
      { cuenta: '(-) Inv final de mercaderías', debe: 4500, haber: null }
    ],
    operaciones: [
      { cuenta: 'Gastos de operaciones', debe: 22000, haber: null },
      { cuenta: 'Impuesto a las transacciones', debe: 800, haber: null },
      { cuenta: 'Gastos generales', debe: 1500, haber: null },
      { cuenta: 'Sueldos y salarios', debe: 5200, haber: null },
      { cuenta: 'Depreciación y enseres', debe: 1300, haber: null },
      { cuenta: 'Castigo gastos de organización', debe: 1200, haber: null },
      { cuenta: 'Alquileres', debe: 11200, haber: null }
    ],
    utilidad: [
      { cuenta: 'Otros ingresos', debe: null, haber: 4500 },
      { cuenta: 'Ingresos percibidos', debe: null, haber: 9400 },
      { cuenta: 'Reserva legal', debe: null, haber: 500 }
    ]
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
        <button className="btn btn-primary" onClick={() => handleShowComponent('graficas')}>
          Mostrar graficas
        </button>
        <button className="btn btn-secondary" onClick={handleHideComponent}>
          Ocultar
        </button>
      </div>
      {showComponent === 'upload' && <DragAndDrop onFileUploaded={handleFileUpload} />}
      {showComponent === 'Ejemplo1' && <Ejemplo1 />}
      {showComponent === 'Ejemplo2' && <Ejemplo2 />}
      {showComponent === 'graficas' && <Graficas data2023={data2023} data2024={data2024} />}
    </div>
  );
}

export default App;
