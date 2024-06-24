import React from 'react'
import Navbar from '../components/Navbar'
import Seccion1 from '../components/Seccion1'
import Seccion2 from '../components/Seccion2'
import Seccion3 from '../components/Seccion3'
import UploadExcel from '../components/UploadExcel'

const Inicio = () => {
  return (
    <div>
        <Navbar />
        <Seccion1 />
        <Seccion2 />
        <Seccion3 />
        <UploadExcel />
    </div>
  )
}

export default Inicio