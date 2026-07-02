function AuthPanel({ mode, setMode, form, setForm, organizations, loading, onSubmit, error }) {
  const isSignup = mode === 'signup'

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-7 shadow-xl shadow-emerald-950/10">
        <p className="text-xs font-extrabold uppercase text-emerald-700">Organization admin</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
          {isSignup ? 'Create admin account' : 'Admin login'}
        </h1>
        <p className="mt-2 text-sm text-slate-500">Choose your organization, then manage its feature flags.</p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
          <button
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              mode === 'login' ? 'bg-emerald-700 text-white' : 'text-slate-600'
            }`}
            type="button"
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              mode === 'signup' ? 'bg-emerald-700 text-white' : 'text-slate-600'
            }`}
            type="button"
            onClick={() => setMode('signup')}
          >
            Signup
          </button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          {isSignup && (
            <>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Name
                <input
                  className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Organization
                <select
                  className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
                  value={form.organizationId}
                  onChange={(event) => setForm({ ...form, organizationId: event.target.value })}
                  required
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
            </>
          )}

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Email
            <input
              className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Password
            <input
              className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-emerald-600"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </label>

          <button
            className="h-11 rounded-lg bg-emerald-700 px-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading || (isSignup && !form.organizationId)}
          >
            {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Login'}
          </button>

          {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default AuthPanel
