import { useState } from "react"

export default function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <div className="star-container">
      <h4 style={{ textAlign: "center" }}>Noter ce produit</h4>

      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1

        return (
          <span
            key={index}
            className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            title={`${starValue} étoile${starValue > 1 ? "s" : ""}`}
          >
            &#9733;
          </span>
        )
      })}
      {rating > 0 && <p className="note">Note : {rating}/{totalStars}</p>}
    </div>
  )
}
