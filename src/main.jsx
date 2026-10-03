import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

import ElEstudio from './pages/ElEstudio.jsx'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad.jsx'
import AvisoLegal from './pages/AvisoLegal.jsx'

const path = window.location.pathname;

let ComponentToRender = <App />;
if (path === '/estudio') {
  ComponentToRender = <ElEstudio />;
} else if (path === '/politica-de-privacidad') {
  ComponentToRender = <PoliticaPrivacidad />;
} else if (path === '/aviso-legal') {
  ComponentToRender = <AvisoLegal />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {ComponentToRender}
  </StrictMode>,
)
