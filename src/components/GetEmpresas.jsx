import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/UploadExcel.css';

// Importa las imágenes de los assets
import imgCard1 from '/src/assets/card1.png';
import imgCard2 from '/src/assets/card2.webp';
import imgCard3 from '/src/assets/card3.jpg';

function GetEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nuevaEmpresa, setNuevaEmpresa] = useState({
    nombre: '',
    nro_imagen: 1,
  });
  const [imagenSeleccionada, setImagenSeleccionada] = useState(imgCard1);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend-tss.vercel.app/api/empresas')
      .then(response => {
        setEmpresas(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las empresas:', error);
        setIsLoading(false);
      });
  }, []);

  const handleChangeNombre = (event) => {
    setNuevaEmpresa({ ...nuevaEmpresa, nombre: event.target.value });
  };

  const handleNextImage = () => {
    const nextImage = nuevaEmpresa.nro_imagen === 3 ? 1 : nuevaEmpresa.nro_imagen + 1;
    setNuevaEmpresa({ ...nuevaEmpresa, nro_imagen: nextImage });
    updateImage(nextImage);
  };

  const handlePrevImage = () => {
    const prevImage = nuevaEmpresa.nro_imagen === 1 ? 3 : nuevaEmpresa.nro_imagen - 1;
    setNuevaEmpresa({ ...nuevaEmpresa, nro_imagen: prevImage });
    updateImage(prevImage);
  };

  const updateImage = (imageNumber) => {
    switch (imageNumber) {
      case 1:
        setImagenSeleccionada(imgCard1);
        break;
      case 2:
        setImagenSeleccionada(imgCard2);
        break;
      case 3:
        setImagenSeleccionada(imgCard3);
        break;
      default:
        setImagenSeleccionada(imgCard1);
        break;
    }
  };

  const handleSubmit = () => {
    // Aquí podrías enviar la nueva empresa al backend
    // y luego actualizar la lista de empresas o realizar alguna acción necesaria.
    console.log('Enviar formulario:', nuevaEmpresa);
    // Ejemplo de cómo podrías enviar los datos al backend con axios:
    // axios.post('https://backend-tss.vercel.app/api/empresas', nuevaEmpresa)
    //   .then(response => {
    //     console.log('Empresa creada:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error al crear la empresa:', error);
    //   });
  };

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="upload-excel-grid-container">
      <div className="upload-excel-empresa-card">
        <div className="upload-excel-card-inner">
          <h3 className="card-title" style={{marginBottom:5}}>Registrar Nueva Empresa</h3>
          <div id="carouselExample" className="carousel slide" data-bs-ride="false" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={imgCard1} className="d-block w-100 carousel-image" alt="Card 1" />
                    </div>
                    <div className="carousel-item">
                    <img src={imgCard2} className="d-block w-100 carousel-image" alt="Card 2" />
                    </div>
                    <div className="carousel-item">
                    <img src={imgCard3} className="d-block w-100 carousel-image" alt="Card 3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
          <input
            type="text"
            placeholder="Nombre de la empresa"
            value={nuevaEmpresa.nombre}
            onChange={handleChangeNombre}
            style={{marginTop:7, marginBottom:7}}
          />
          <button className="view-button" onClick={handleSubmit}>
            Registrar Empresa
          </button>
        </div>
      </div>

      {/* Cards existentes de las empresas */}
      {empresas.map((empresa) => (
        <div key={empresa.id} className="upload-excel-empresa-card">
          <div className="upload-excel-card-inner">
            <h3 className="card-title">{empresa.nombre_empresa}</h3>
            <h4>{empresa.nombre}</h4>
            <div className="card-image-container">
              {empresa.nro_imagen === 1 && <img src={imgCard1} alt="Card 1" />}
              {empresa.nro_imagen === 2 && <img src={imgCard2} alt="Card 2" />}
              {empresa.nro_imagen === 3 && <img src={imgCard3} alt="Card 3" />}
            </div>
            <button
              className="view-button"
              onClick={() => navigate(`/empresa/${empresa.cod_empresa}`)}
            >
              Ver Empresa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetEmpresas;
