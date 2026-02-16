import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './layouts/Header'
import Main from './views/Home/Index'
import AboutUs from './views/Nosotros/Nosotros'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import Contact from './views/Contacto/Contacto'
import TiendaIndex from './views/Tienda/Index'
import ProductoDetalle from './views/Tienda/ProductoDetalle'
import PaqueteDetalle from './views/Tienda/PaqueteDetalle'
import CarritoIndex from './views/Carrito/Index'
import Login from './views/Login/Login'
import AdminIndex from './views/Admin/Index'
import AdminPerfil from './views/Admin/Perfil'
import ProductoNuevo from './views/Admin/ProductoNuevo'
import ProductoEditar from './views/Admin/ProductoEditar'
import CategoriaNueva from './views/Admin/CategoriaNueva'
import CategoriaEditar from './views/Admin/CategoriaEditar'
import PaqueteNuevo from './views/Admin/PaqueteNuevo'
import PaqueteEditar from './views/Admin/PaqueteEditar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path="/" element={<><Header /><Main /></>} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/tienda" element={<TiendaIndex />} />
          <Route path="/tienda/paquete/:id" element={<PaqueteDetalle />} />
          <Route path="/tienda/:slug" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<CarritoIndex />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminIndex /></ProtectedRoute>} />
          <Route path="/admin/perfil" element={<ProtectedRoute><AdminPerfil /></ProtectedRoute>} />
          <Route path="/admin/productos/nuevo" element={<ProtectedRoute><ProductoNuevo /></ProtectedRoute>} />
          <Route path="/admin/productos/:id/editar" element={<ProtectedRoute><ProductoEditar /></ProtectedRoute>} />
          <Route path="/admin/categorias/nueva" element={<ProtectedRoute><CategoriaNueva /></ProtectedRoute>} />
          <Route path="/admin/categorias/:id/editar" element={<ProtectedRoute><CategoriaEditar /></ProtectedRoute>} />
          <Route path="/admin/paquetes/nuevo" element={<ProtectedRoute><PaqueteNuevo /></ProtectedRoute>} />
          <Route path="/admin/paquetes/:id/editar" element={<ProtectedRoute><PaqueteEditar /></ProtectedRoute>} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)