import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './globals.css'
import Header from './layouts/Header'
import Main from './views/Home/Index'
import AboutUs from './views/Nosotros/Nosotros'
import Navbar from './layouts/Navbar'
import Contact from './views/Contacto/Contacto'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      
      {/* Navbar se queda aquí para ser GLOBAL (visible en todas las páginas) */}
      <Navbar/>
      
      <Routes>
        {/* CAMBIO CLAVE: 
           Agrupamos Header y Main dentro de un Fragmento (<>...</>) 
           en la propiedad element de la ruta "/"
        */}
        <Route path="/" element={
          <>
            <Header/>
            <Main/>
          </>
        } />
        
        {/* En /nosotros NO ponemos el Header, así que no saldrá */}
        <Route path="/nosotros" element={<AboutUs/>} />
        <Route path='/contact'  element={<Contact/>} />
        
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
      
    </BrowserRouter>
  </StrictMode>,
)