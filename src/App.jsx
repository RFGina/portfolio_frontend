import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HabilidadesPage } from './pages/HabilidadesPage'
import { ProyectosPage } from './pages/ProyectosPage'
import { SobreMiPage } from './pages/SobreMiPage'
import { Navegation } from './components/Navegation'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navegation />
        <Routes>
          <Route path='/' element={<Navigate to='/AbautMe' />} />
          <Route path='/skills' element={<HabilidadesPage />} />
          <Route path='/projects' element={<ProyectosPage />} />
          <Route path='/AbautMe' element={<SobreMiPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App