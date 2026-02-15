import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import Header from './layouts/Header'
import Main from './views/Home/Index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header/>
    <Main/>
    
  </StrictMode>,
)
