import { useState } from "react"

const data = Array.from({ length: 50 }, (_, i) => `Élément ${i + 1}`)

export default function LoadMore({ initialCount = 6, increment = 6 }) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  const hasMore = visibleCount < data.length

  const handleLoadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + increment)
      setLoading(false)
    }, 1000) 
  }

  return (
    <div className="load-container">
      <ul className="item-list">
        {data.slice(0, visibleCount).map((item, idx) => (
          <li key={idx} className="item">
            {item}
          </li>
        ))}
      </ul>

      {loading && <div className="loader"></div>}

      {!loading && hasMore && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Charger plus
        </button>
      )}

      {!hasMore && !loading && (
        <p className="end-message">Tous les éléments sont affichés.</p>
      )}
    </div>
  )
}
