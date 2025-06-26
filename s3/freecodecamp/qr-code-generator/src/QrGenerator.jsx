import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

export default function QrGenerator() {
  const [text, setText] = useState("")
  const [showQR, setShowQR] = useState(false)

  const handleGenerate = () => {
    if (text.trim() !== "") {
      setShowQR(true)
    }
  }

  return (
    <div className="qr-container">
      <h2>QR Code Generator</h2>
      <input
        type="text"
        placeholder="Entrez une URL ou un texte"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="qr-input"
      />
      <button onClick={handleGenerate} className="qr-button">
        Générer le QR Code
      </button>

      {showQR && (
        <div className="qr-result">
          <QRCodeCanvas value={text} size={200} />
          <p>Code pour : <strong>{text}</strong></p>
        </div>
      )}
    </div>
  )
}
