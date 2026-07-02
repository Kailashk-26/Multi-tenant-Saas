import { useCallback, useEffect, useState } from 'react'
import { createFlag, deleteFlag, getFlags, getOrganizations, updateFlag } from '../api/orgAdminApi'
import { getApiError } from '../api/http'
import Alert from '../components/Alert'
import DashboardHeader from '../components/DashboardHeader'
import FlagForm from '../components/FlagForm'
import FlagList from '../components/FlagList'

function DashboardPage({ onLogout }) {
  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem('orgAdminUser') || 'null'))
  const [organizations, setOrganizations] = useState([])
  const [flags, setFlags] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [organizationId, setOrganizationId] = useState(admin?.organizationId || '')
  const [flagForm, setFlagForm] = useState({
    flag: '',
    description: '',
    isEnabled: false,
  })

  const selectedOrg = organizations.find((org) => org._id === organizationId)

  const loadOrganizations = useCallback(async () => {
    try {
      const orgs = await getOrganizations()
      setOrganizations(orgs)

      if (!organizationId && orgs.length) {
        setOrganizationId(orgs[0]._id)
      }
    } catch (err) {
      setError(getApiError(err, 'Unable to load organizations'))
    }
  }, [organizationId])

  const loadFlags = useCallback(async () => {
    if (!organizationId) return

    setLoading(true)
    setError('')

    try {
      const data = await getFlags(organizationId)
      setFlags(data)
    } catch (err) {
      setFlags([])
      setError(getApiError(err, 'Unable to load flags'))
    } finally {
      setLoading(false)
    }
  }, [organizationId])

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        await loadOrganizations()
      } catch {
        if (isMounted) {
          setError('Unable to load organizations')
        }
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [loadOrganizations])

  useEffect(() => {
    if (!organizationId) return

    let isMounted = true

    const load = async () => {
      try {
        await loadFlags()
      } catch {
        if (isMounted) {
          setError('Unable to load flags')
        }
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [organizationId, loadFlags])

  const handleCreateFlag = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const data = await createFlag({ ...flagForm, organizationId })
      setFlagForm({ flag: '', description: '', isEnabled: false })
      setMessage(data.message || 'Feature flag created')
      await loadFlags()
    } catch (err) {
      setError(getApiError(err, 'Unable to create flag'))
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFlag = async (flag) => {
    setError('')
    setMessage('')

    try {
      const data = await updateFlag(flag._id, !flag.isEnabled)
      setMessage(data.message || 'Feature flag updated')
      await loadFlags()
    } catch (err) {
      setError(getApiError(err, 'Unable to update flag'))
    }
  }

  const handleDeleteFlag = async (flagId) => {
    setError('')
    setMessage('')

    try {
      const data = await deleteFlag(flagId)
      setMessage(data.message || 'Feature flag deleted')
      await loadFlags()
    } catch (err) {
      setError(getApiError(err, 'Unable to delete flag'))
    }
  }

  const logout = () => {
    localStorage.removeItem('orgAdminToken')
    localStorage.removeItem('orgAdminUser')
    setAdmin(null)
    setOrganizations([])
    setFlags([])
    setMessage('')
    setError('')
    onLogout?.()
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8">
      <DashboardHeader admin={admin} organization={selectedOrg} onLogout={logout} />
      <div className="grid gap-4">
        <FlagForm form={flagForm} setForm={setFlagForm} loading={loading} onSubmit={handleCreateFlag} />
        <Alert>{message}</Alert>
        <Alert type="error">{error}</Alert>
        <FlagList
          flags={flags}
          loading={loading}
          onRefresh={loadFlags}
          onToggle={handleToggleFlag}
          onDelete={handleDeleteFlag}
        />
      </div>
    </main>
  )
}

export default DashboardPage
