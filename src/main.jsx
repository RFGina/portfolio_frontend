import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Inicializar el tema antes de renderizar
const savedTheme = localStorage.getItem('theme') || 'dark';
const htmlElement = document.querySelector('html');
if (savedTheme === 'dark') {
  htmlElement?.classList.add('dark');
} else {
  htmlElement?.classList.remove('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)