import { useState } from 'react'
import './index.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('superAdminToken') || '')

  if (token) {
    return <Dashboard onLogout={() => setToken('')} />
  }

  return <Login onLogin={() => setToken(localStorage.getItem('superAdminToken') || '')} />
}

export default App
