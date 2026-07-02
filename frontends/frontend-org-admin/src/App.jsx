import { useEffect, useState } from 'react'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('orgAdminToken') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem('orgAdminToken') || '')
    }

    window.addEventListener('storage', syncToken)
    return () => window.removeEventListener('storage', syncToken)
  }, [])

  if (!token) {
    return (
      <AuthPage
        onAuthenticated={() => setToken(localStorage.getItem('orgAdminToken') || '')}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
    )
  }

  return <DashboardPage onLogout={() => setToken('')} />
}

export default App
