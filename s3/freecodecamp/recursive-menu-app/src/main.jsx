import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TreeMenu from './TreeMenu.jsx'

const menuData = [
  {
    label: "Dashboard",
    children: [],
  },
  {
    label: "Utilisateurs",
    children: [
      { label: "Liste", children: [] },
      { label: "Permissions", children: [] },
    ],
  },
  {
    label: "Paramètres",
    children: [
      {
        label: "Interface",
        children: [
          { label: "Thèmes", children: [] },
          { label: "Police", children: [] },
        ],
      },
      {
        label: "Sécurité",
        children: [
          { label: "Mot de passe", children: [] },
          { label: "2FA", children: [] },
        ],
      },
    ],
  },
]


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TreeMenu items={menuData} />
  </StrictMode>,
)
