import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-p flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-brand-600"></div>
          <NavLink to="/" className="font-semibold">EduAI</NavLink>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/onboarding" className={({isActive}) => isActive ? 'text-brand-700' : 'text-gray-600 hover:text-gray-900'}>
            Onboarding
          </NavLink>
          <NavLink to="/" className={({isActive}) => isActive ? 'text-brand-700' : 'text-gray-600 hover:text-gray-900'}>
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
