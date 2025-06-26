import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ScrollIndicator from './ScrollIndicator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <ScrollIndicator />
      <div style={{ height: "3000px", padding: "2rem" }}>
        <h1>Scroll Indicator 🚀</h1>
        <p>Fais défiler cette page pour voir la progression !</p>
      </div>
    </>
  </StrictMode>,
)
