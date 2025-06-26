import { useState } from "react"
import img1 from "../src/assets/img1.png"
import img2 from "../src/assets/img2.jpg"
import img3 from "../src/assets/img3.jpg"

const images = [img1, img2, img3]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToIndex = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="slider-container">
      <div className="slider">
        <img src={images[currentIndex]} alt="Slide" className="slide-image" />
        <button className="nav-button left" onClick={goToPrevious}>
          &#10094;
        </button>
        <button className="nav-button right" onClick={goToNext}>
          &#10095;
        </button>
      </div>
      <div className="indicators">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${currentIndex === idx ? "active" : ""}`}
            onClick={() => goToIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  )
}
