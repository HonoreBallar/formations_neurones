import { useState } from "react"
import "./Accordion.css"

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="accordion">
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>&#9656;</span>
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  )
}
