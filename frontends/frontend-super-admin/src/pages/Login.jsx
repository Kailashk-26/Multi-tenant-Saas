import { useState } from 'react'
import api, { getApiError } from '../api/http'

const Login = ({ onLogin }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data } = await api.post('/api/users/superlogin', loginForm)

      localStorage.setItem('superAdminToken', data.token)
      onLogin?.()
    } catch (err) {
      setError(getApiError(err, 'Login failed'))
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <main className="grid min-h-screen place-items-center px-4 py-10">
        <section className="grid w-full max-w-md gap-6 rounded-lg border border-slate-200 bg-white p-7 shadow-xl shadow-emerald-950/10">
          <div>
            <p className="text-xs font-extrabold uppercase text-emerald-700">Super admin</p>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-slate-950">Organization control</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to create organizations and review every tenant in the system.
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleLogin}>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Email
              <input
                className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
                type="email"
                value={loginForm.email}
                onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Password
              <input
                className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                required
              />
            </label>
            <button
              className="h-11 rounded-lg bg-emerald-700 px-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  )
}

export default Login