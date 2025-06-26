import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ColorBox from './ColorBox.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorBox />
  </StrictMode>,
)
