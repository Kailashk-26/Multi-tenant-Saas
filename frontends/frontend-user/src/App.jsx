import { useCallback, useEffect, useState } from 'react'
import api, { getApiError } from './api/http'
import './index.css'

function App() {
  const [organizations, setOrganizations] = useState([])
  const [organizationId, setOrganizationId] = useState('')
  const [flags, setFlags] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedOrg = organizations.find((org) => org._id === organizationId)

  const loadOrganizations = useCallback(async () => {
    setError('')

    try {
      const { data } = await api.get('/api/org/getOrgs')
      const orgs = data.organizations || []
      setOrganizations(orgs)
      setOrganizationId((current) => current || orgs[0]?._id || '')
    } catch (err) {
      setError(getApiError(err, 'Unable to load organizations'))
    }
  }, [])

  const loadFlags = useCallback(async () => {
    if (!organizationId) return
    setLoading(true)
    setError('')

    try {
      const { data } = await api.get(`/api/flags/getflags/${organizationId}`)
      setFlags(data.featureFlags || [])
    } catch (err) {
      setFlags([])
      setError(getApiError(err, 'Unable to load feature flags'))
    } finally {
      setLoading(false)
    }
  }, [organizationId])

  useEffect(() => {
    void loadOrganizations()
  }, [loadOrganizations])

  useEffect(() => {
    void loadFlags()
  }, [loadFlags])

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase text-emerald-700">End user</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-slate-950">Feature availability</h1>
          <p className="mt-2 text-sm text-slate-500">Select an organization to see which features are enabled.</p>
        </div>
      </header>

      <section className="mb-4 rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="grid w-full gap-2 text-sm font-bold text-slate-700 sm:max-w-md">
            Organization
            <select
              className="h-11 rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-emerald-600"
              value={organizationId}
              onChange={(event) => setOrganizationId(event.target.value)}
            >
              <option value="" disabled>
                Select organization
              </option>
              {organizations.map((org) => (
                <option value={org._id} key={org._id}>
                  {org.name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="h-11 rounded-lg bg-emerald-700 px-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            onClick={loadFlags}
            disabled={!organizationId || loading}
          >
            Refresh
          </button>
        </div>
      </section>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-950">{selectedOrg?.name || 'Organization'} flags</h2>
            <p className="mt-1 text-sm text-slate-500">Read-only status for this tenant.</p>
          </div>
        </div>

        {loading ? (
          <p className="mt-4 text-slate-500">Loading flags...</p>
        ) : flags.length === 0 ? (
          <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-slate-600">
            No feature flags are visible for this organization.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {flags.map((flag) => (
              <article className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4" key={flag._id}>
                <div>
                  <p className="wrap-break-word text-lg font-extrabold text-slate-950">{flag.flag}</p>
                  <p className="mt-1 text-sm text-slate-500">{flag.description || 'No description'}</p>
                </div>
                <span
                  className={`w-fit min-w-24 rounded-full px-3 py-1 text-center text-xs font-extrabold ${
                    flag.isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {flag.isEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
