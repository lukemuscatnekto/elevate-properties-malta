// MOCK login screen — no real authentication.
// Included only so /crm/login resolves; clicking Sign In simply navigates to the dashboard.
// TODO (Phase 2): wire to a real auth provider when a backend exists.

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-full max-w-sm p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-semibold text-center">
          Elevate Properties Malta
        </p>
        <h1 className="text-xl font-semibold text-slate-800 text-center mt-1">CRM Sign In</h1>
        <p className="text-xs text-slate-500 text-center mt-1">Internal access only.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/crm/dashboard');
          }}
          className="mt-5 space-y-3"
        >
          <label className="text-sm block">
            <span className="text-xs text-slate-500 block mb-1">Email</span>
            <input
              type="email"
              defaultValue="luke@elevate-properties.example"
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm"
            />
          </label>
          <label className="text-sm block">
            <span className="text-xs text-slate-500 block mb-1">Password</span>
            <input
              type="password"
              defaultValue="demo"
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-md"
          >
            Sign In
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center mt-4">
          Prototype build — login is not enforced.
        </p>
      </div>
    </div>
  );
}
