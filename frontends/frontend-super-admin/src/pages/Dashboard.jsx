import { useEffect, useState } from 'react'
import api, { getApiError } from '../api/http'

const Dashboard = ({ onLogout }) => {
    const token=localStorage.getItem('superAdminToken')
    const [orgName, setOrgName] = useState('')
    const [organizations, setOrganizations] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const fetchOrganizations = async () => {
        setLoading(true)
        setError('')

        try {
        const { data } = await api.get('/api/org/getOrgs')
        setOrganizations(data.organizations || [])
        } catch (err) {
        setError(getApiError(err, 'Unable to load organizations'))
        } finally {
        setLoading(false)
        }
    }

    const handleCreateOrg = async (event) => {
        event.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        try {
        const { data } = await api.post('/api/org/createOrg', { name: orgName.trim() })

        setOrgName('')
        setMessage(data.message || 'Organization created')
        await fetchOrganizations()
        } catch (err) {
        setError(getApiError(err, 'Unable to create organization'))
        } finally {
        setLoading(false)
        }
    }

    const handleDelete=async(event,id)=>{
        event.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        try {
            const { data } = await api.delete(`/api/org/deleteOrg/${id}`)

            setOrgName('')
            setMessage(data.message || 'Organization deleted')
            await fetchOrganizations()
        } catch (err) {
            setError(getApiError(err, 'Unable to delete organization'))
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('superAdminToken')
        onLogout?.()
        setOrganizations([])
        setMessage('')
        setError('')
    }

    useEffect(() => {
        if (!token) return

        let isMounted = true

        const loadOrganizations = async () => {
            try {
                await fetchOrganizations()
            } catch {
                if (isMounted) {
                    setError('Unable to load organizations')
                }
            }
        }

        void loadOrganizations()

        return () => {
            isMounted = false
        }
    }, [token])

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase text-emerald-700">Super admin</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-slate-950">Organizations</h1>
        </div>
        <button className="h-11 rounded-lg bg-emerald-100 px-4 font-bold text-emerald-800" type="button" onClick={logout}>
          Logout
        </button>
      </header>

      <section className="mb-4 rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/10">
        <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleCreateOrg}>
          <label className="grid w-full gap-2 text-sm font-bold text-slate-700">
            Organization name
            <input
              className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
              value={orgName}
              onChange={(event) => setOrgName(event.target.value)}
              placeholder="Acme Workspace"
              required
            />
          </label>
          <button
            className="h-11 rounded-lg bg-emerald-700 px-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            Create
          </button>
        </form>
      </section>

      {message && (
        <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-lg font-extrabold text-slate-950">Tenant list</h2>
          <button
            className="h-10 rounded-lg bg-emerald-100 px-4 font-bold text-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            onClick={fetchOrganizations}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {loading && organizations.length === 0 ? (
          <p className="mt-4 text-slate-500">Loading organizations...</p>
        ) : organizations.length === 0 ? (
          <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-slate-600">No organizations found.</p>
        ) : (
          <div className="mt-4 grid gap-2">
            <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-extrabold text-slate-500 sm:grid-cols-[minmax(140px,1fr)_minmax(180px,1.4fr)_auto]">
              <span>Name</span>
              <span>Organization ID</span>
              <span className="sm:text-right">Action</span>
            </div>
            {organizations.map((org) => (
              <div
                className="grid gap-3 rounded-lg border border-slate-200 p-4 grid-cols-1 sm:grid-cols-[minmax(140px,1fr)_minmax(180px,1.4fr)_auto] sm:items-center"
                key={org._id}
              >
                <strong className="text-slate-950">{org.name}</strong>
                <code className="wrap-break-word text-slate-600">{org._id}</code>
                <button onClick={(e)=>handleDelete(e,org._id)} className="w-full rounded-2xl bg-red-600 px-3 py-2 font-semibold text-white sm:w-auto sm:justify-self-end">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Dashboard