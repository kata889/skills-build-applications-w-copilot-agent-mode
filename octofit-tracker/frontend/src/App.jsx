import { useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Dashboard() {
  return (
    <section className="dashboard-panel p-4 p-lg-5">
      <p className="eyebrow mb-2">Your fitness community</p>
      <h1 className="display-5 fw-bold mb-3">Move more. Achieve together.</h1>
      <p className="lead text-secondary mb-4">
        Track activity, meet your team, and find your next workout.
      </p>
      <div className="row g-3">
        {navigation.map(({ label, to }) => (
          <div className="col-12 col-sm-6 col-xl-4" key={to}>
            <Link className="dashboard-link" to={to}>
              <span className="fw-semibold">{label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark app-navbar">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="" className="brand-logo" />
            <span>OctoFit Tracker</span>
          </Link>
          <button
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <nav
            className={`navbar-collapse${menuOpen ? ' show' : ''}`}
            id="primary-navigation"
          >
            <div className="navbar-nav ms-auto">
              {navigation.map(({ label, to }) => (
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="container py-4 py-lg-5">
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>

      <footer className="container mt-auto py-4 text-center text-secondary">
        OctoFit Tracker · Build healthy habits together
      </footer>
    </div>
  )
}

export default App
