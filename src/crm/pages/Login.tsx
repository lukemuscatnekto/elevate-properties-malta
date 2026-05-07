import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@elevatepropertiesmalta.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    if (password === 'elevate2025') {
      navigate('/crm/dashboard');
    } else {
      setError('Invalid credentials. (Demo password: elevate2025)');
    }
    setLoading(false);
  };

  const inputCls =
    'w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm placeholder:text-slate-400 outline-none focus:border-amber-400 transition-colors';

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <span className="text-amber-400 font-bold text-2xl tracking-tight">Elevate</span>
          <p className="text-slate-400 text-sm mt-1">Internal CRM</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-5">Sign in</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="crm-email" className="sr-only">Email</label>
              <input
                id="crm-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label htmlFor="crm-password" className="sr-only">Password</label>
              <input
                id="crm-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className={inputCls}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in…' : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-4">
            Demo credentials: any email / <span className="font-mono">elevate2025</span>
          </p>
        </div>
      </div>
    </div>
  );
}
