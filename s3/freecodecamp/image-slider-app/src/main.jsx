import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ImageSlider from './ImageSlider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageSlider />
  </StrictMode>,
)
