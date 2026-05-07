import { useState } from 'react';
import { Sun, Moon, Trash2, RefreshCw } from 'lucide-react';
import { getTheme, setTheme as persistTheme, resetCRMData } from '../utils/storage';
import type { CRMTheme } from '../utils/storage';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Settings() {
  const [theme, setThemeLocal] = useState<CRMTheme>(() => getTheme());
  const [resetOpen, setResetOpen] = useState(false);

  const toggleTheme = (t: CRMTheme) => {
    setThemeLocal(t);
    persistTheme(t);
    // Force CRM layout to re-read by reloading (simplest approach for settings page)
    window.location.reload();
  };

  const handleReset = () => {
    resetCRMData();
    window.location.reload();
  };

  const card = 'bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5';

  return (
    <div className="max-w-xl space-y-5">
      <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>

      {/* Theme */}
      <div className={card}>
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Appearance</h2>
        <div className="flex gap-3">
          {([['light','Light', Sun], ['dark','Dark', Moon]] as [CRMTheme, string, React.ComponentType<{className?:string}>][]).map(([t, label, Icon]) => (
            <button
              key={t}
              onClick={() => toggleTheme(t)}
              className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-colors ${
                theme === t
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${theme === t ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
              <span className={`text-sm font-medium ${theme === t ? 'text-amber-700 dark:text-amber-300' : 'text-slate-500 dark:text-slate-400'}`}>{label}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">Theme preference is saved in your browser and applies to the CRM workspace only.</p>
      </div>

      {/* Map provider */}
      <div className={card}>
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Map provider</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Maps use <strong>OpenStreetMap</strong> tiles by default.
          Set <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">VITE_MAPTILER_KEY</code> in your <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">.env</code> file and rebuild to switch to <strong>MapTiler Streets v2</strong> (higher resolution, no request limits on commercial plans).
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className={`w-2 h-2 rounded-full ${import.meta.env.VITE_MAPTILER_KEY ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
          <span className="text-slate-500 dark:text-slate-400">
            {import.meta.env.VITE_MAPTILER_KEY ? 'MapTiler key detected — using MapTiler tiles' : 'No MapTiler key — using OpenStreetMap tiles'}
          </span>
        </div>
      </div>

      {/* Form intake */}
      <div className={card}>
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Public form intake</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Contact, Valuation, and Viewing forms on the public website automatically create leads here via the <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">crmIntakeApi</code> module.
          Currently writing to <strong>localStorage</strong>. To connect a real backend, replace the body of <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">saveLead()</code> in <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">src/crm/utils/crmIntakeApi.ts</code> with a single <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">fetch()</code> call.
        </p>
      </div>

      {/* Danger zone */}
      <div className={`${card} border-red-200 dark:border-red-900/50`}>
        <h2 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Danger zone
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Reset all CRM data to the default mock dataset. This clears all leads, properties, contacts, tasks, viewings, and activity logs from localStorage and reloads the page.
        </p>
        <button
          onClick={() => setResetOpen(true)}
          className="h-9 px-4 rounded-lg border border-red-300 dark:border-red-700 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset to mock data
        </button>
      </div>

      <ConfirmDialog
        open={resetOpen}
        title="Reset all CRM data?"
        message="All your leads, contacts, properties, tasks, and activity logs will be cleared and replaced with the default demo data. This cannot be undone."
        confirmLabel="Yes, reset everything"
        danger
        onConfirm={handleReset}
        onCancel={() => setResetOpen(false)}
      />
    </div>
  );
}
