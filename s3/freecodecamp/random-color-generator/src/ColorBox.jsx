import { useState } from "react"

function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default function ColorBox() {
  const [color, setColor] = useState("#ffffff")
  const [history, setHistory] = useState([])

  const handleClick = () => {
    const newColor = getRandomColor()
    setColor(newColor)
    setHistory([newColor, ...history.slice(0, 9)])
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(color).then(() => {
      alert(`Couleur copiée : ${color}`)
    })
  }

  return (
    <div className="color-box" style={{ backgroundColor: color }}>
      <div className="color-info">
        <p>Current Color:</p>
        <h2>{color}</h2>

        <div className="buttons">
          <button onClick={handleClick}>Generate Color</button>
          <button onClick={handleCopy}>Copy</button>
        </div>

        {history.length > 0 && (
          <div className="history">
            <h3>History</h3>
            <div className="history-grid">
              {history.map((col, idx) => (
                <div
                  key={idx}
                  className="color-history"
                  style={{ backgroundColor: col }}
                  title={col}
                  onClick={() => {
                    setColor(col)
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
