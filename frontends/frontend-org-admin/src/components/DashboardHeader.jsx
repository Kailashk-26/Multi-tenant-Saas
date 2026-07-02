function DashboardHeader({ admin, organization, onLogout }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase text-emerald-700">{organization?.name || 'Organization'}</p>
        <h1 className="mt-2 text-4xl font-extrabold leading-tight text-slate-950">Feature flags</h1>
        {admin?.name && <p className="mt-2 text-sm text-slate-500">Signed in as {admin.name}</p>}
      </div>
      <button className="h-11 rounded-lg bg-emerald-100 px-4 font-bold text-emerald-800" type="button" onClick={onLogout}>
        Logout
      </button>
    </header>
  )
}

export default DashboardHeader
