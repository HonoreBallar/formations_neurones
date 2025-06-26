import { useEffect, useState } from "react"

export default function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (scrollTop / docHeight) * 100
      setScrollPercentage(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="scroll-indicator-container">
      <div
        className="scroll-indicator-bar"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  )
}
