function FlagForm({ form, setForm, loading, onSubmit }) {
  return (
    <section className="mb-4 rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/10">
      <form className="grid gap-4 lg:grid-cols-[minmax(160px,0.9fr)_minmax(220px,1.5fr)_auto_auto] lg:items-end" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Flag key
          <input
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
            value={form.flag}
            onChange={(event) => setForm({ ...form, flag: event.target.value })}
            placeholder="new_dashboard"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Description
          <input
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="Enable redesigned dashboard"
          />
        </label>
        <label className="flex h-11 items-center gap-2 text-sm font-bold text-slate-700">
          <input
            className="size-4 accent-emerald-700"
            type="checkbox"
            checked={form.isEnabled}
            onChange={(event) => setForm({ ...form, isEnabled: event.target.checked })}
          />
          Enabled
        </label>
        <button
          className="h-11 rounded-lg bg-emerald-700 px-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          Create flag
        </button>
      </form>
    </section>
  )
}

export default FlagForm
