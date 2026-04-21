import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getCurrentUser, logout } from '../data/auth'

export default function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true')
  const [menuOpen, setMenuOpen] = useState(false)
  const user = getCurrentUser()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', dark)
  }, [dark])

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSmoothScroll = (e, hash) => {
    e.preventDefault()
    if (location.pathname === '/') {
      const element = document.getElementById(hash)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      window.location.href = `/#${hash}`
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const dashboardLink =
    user?.role === 'admin'   ? '/admin-dashboard'    :
    user?.role === 'worker'  ? '/worker-dashboard'   :
    user?.role === 'customer'? '/customer-dashboard' : null

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 hover-scale">
            💼 SkillHire
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" onClick={handleHomeClick} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition">Home</Link>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition">About Us</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition">Services</a>
            <Link to="/all-workers" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition">Workers</Link>
            <a href="#contact-form" onClick={(e) => handleSmoothScroll(e, 'contact-form')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition">Contact</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button onClick={() => setDark(d => !d)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <span className="text-xl">{dark ? '☀️' : '🌙'}</span>
            </button>

            {user ? (
              <>
                {dashboardLink && (
                  <Link to={dashboardLink} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-semibold transition hidden md:inline">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="px-4 py-2 text-red-600 dark:text-red-400 font-semibold transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-semibold transition">Login</Link>
                <Link to="/login?role=admin" className="px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 font-semibold transition hidden md:inline">⚙️ Admin</Link>
                <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg font-semibold transition hover-scale">Sign Up</Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button className="md:hidden text-gray-700 dark:text-gray-300 text-2xl" onClick={() => setMenuOpen(o => !o)}>☰</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 pb-2">
            <Link to="/" onClick={() => { handleHomeClick(); setMenuOpen(false) }} className="text-gray-700 dark:text-gray-300 font-semibold">Home</Link>
            <a href="#about" onClick={(e) => { handleSmoothScroll(e, 'about'); setMenuOpen(false) }} className="text-gray-700 dark:text-gray-300 font-semibold">About Us</a>
            <a href="#services" onClick={(e) => { handleSmoothScroll(e, 'services'); setMenuOpen(false) }} className="text-gray-700 dark:text-gray-300 font-semibold">Services</a>
            <a href="#contact-form" onClick={(e) => { handleSmoothScroll(e, 'contact-form'); setMenuOpen(false) }} className="text-gray-700 dark:text-gray-300 font-semibold">Contact</a>
            <Link to="/all-workers" className="text-gray-700 dark:text-gray-300 font-semibold" onClick={() => setMenuOpen(false)}>Workers</Link>
            {!user && <Link to="/login" className="text-gray-700 dark:text-gray-300 font-semibold" onClick={() => setMenuOpen(false)}>Login</Link>}
            {!user && <Link to="/signup" className="text-blue-600 font-semibold" onClick={() => setMenuOpen(false)}>Sign Up</Link>}
            {user && dashboardLink && <Link to={dashboardLink} className="text-gray-700 dark:text-gray-300 font-semibold" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
            {user && <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="text-left text-red-600 font-semibold">Logout</button>}
          </div>
        )}
      </div>
    </nav>
  )
}
