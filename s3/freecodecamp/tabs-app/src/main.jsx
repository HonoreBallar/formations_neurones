import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tabs from './Tabs'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tabs />
  </StrictMode>,
)
