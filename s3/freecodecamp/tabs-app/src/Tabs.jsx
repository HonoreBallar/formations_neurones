import { useState } from "react"

const tabsData = [
  {
    label: "Accueil",
    content: "Bienvenue sur la page d'accueil.",
  },
  {
    label: "Profil",
    content: "Voici les informations de votre profil.",
  },
  {
    label: "Paramètres",
    content: "Modifiez vos paramètres ici.",
  },
]

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabsData.map((tab, idx) => (
          <button
            key={idx}
            className={`tab-button ${idx === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {tabsData[activeTab].content}
      </div>
    </div>
  )
}
