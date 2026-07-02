function FlagList({ flags, loading, onRefresh, onToggle, onDelete }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-lg font-extrabold text-slate-950">Flags</h2>
        <button
          className="h-10 rounded-lg bg-emerald-100 px-4 font-bold text-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={onRefresh}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {loading && flags.length === 0 ? (
        <p className="mt-4 text-slate-500">Loading flags...</p>
      ) : flags.length === 0 ? (
        <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-slate-600">No flags created yet.</p>
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
              <div className="flex flex-wrap gap-2">
                <button
                  className="h-10 rounded-lg bg-emerald-100 px-4 font-bold text-emerald-800"
                  type="button"
                  onClick={() => onToggle(flag)}
                >
                  {flag.isEnabled ? 'Disable' : 'Enable'}
                </button>
                <button
                  className="h-10 rounded-lg bg-red-600 px-4 font-bold text-white"
                  type="button"
                  onClick={() => onDelete(flag._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default FlagList
