import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const getInitialTheme = () => {
    return localStorage.getItem("theme") || "light"
  }

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      Passer en {theme === "light" ? "sombre 🌙" : "clair ☀️"}
    </button>
  )
}
