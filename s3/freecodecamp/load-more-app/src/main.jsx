import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoadMore from './LoadMore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadMore />
  </StrictMode>,
)
