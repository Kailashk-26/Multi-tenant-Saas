import { useEffect, useState } from 'react'
import { getApiError } from '../api/http'
import { getOrganizations, loginAdmin, signupAdmin } from '../api/orgAdminApi'
import AuthPanel from '../components/AuthPanel'

const AuthPage = ({ onAuthenticated, loading, setLoading, error, setError }) => {
  const [mode, setMode] = useState('login')
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    organizationId: '',
  })
  const [organizations, setOrganizations] = useState([])

  const handleAuthSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = mode === 'signup'
        ? authForm
        : { email: authForm.email, password: authForm.password }

      const data = mode === 'signup'
        ? await signupAdmin(payload)
        : await loginAdmin(payload)

      if (!data?.token) {
        throw new Error('Authentication failed')
      }

      localStorage.setItem('orgAdminToken', data.token)
      localStorage.setItem('orgAdminUser', JSON.stringify(data.user || { organizationId: authForm.organizationId }))
      onAuthenticated?.(data)
    } catch (err) {
      setError(getApiError(err, mode === 'signup' ? 'Signup failed' : 'Login failed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    const loadOrganizations = async () => {
      try {
        const orgs = await getOrganizations()
        if (isMounted) {
          setOrganizations(orgs)
          if (!authForm.organizationId && orgs.length) {
            setAuthForm((current) => ({ ...current, organizationId: orgs[0]._id }))
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(getApiError(err, 'Unable to load organizations'))
        }
      }
    }

    void loadOrganizations()

    return () => {
      isMounted = false
    }
  }, [authForm.organizationId, setError])

  return (
    <AuthPanel
      mode={mode}
      setMode={setMode}
      form={authForm}
      setForm={setAuthForm}
      organizations={organizations}
      loading={loading}
      onSubmit={handleAuthSubmit}
      error={error}
    />
  )
}

export default AuthPage
