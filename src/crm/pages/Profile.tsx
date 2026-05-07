export default function Profile() {
  const inputCls = 'w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-amber-400 transition-colors';
  const lbl = 'block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1';

  return (
    <div className="max-w-xl space-y-5">
      <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Profile</h1>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xl font-bold text-amber-700 dark:text-amber-300 select-none">
            ND
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">Nico Dalton</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Director — Elevate Properties Malta</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>First name</label><input defaultValue="Nico" className={inputCls} /></div>
          <div><label className={lbl}>Last name</label><input defaultValue="Dalton" className={inputCls} /></div>
        </div>
        <div><label className={lbl}>Email</label><input type="email" defaultValue="admin@elevatepropertiesmalta.com" className={inputCls} /></div>
        <div><label className={lbl}>Phone</label><input type="tel" defaultValue="+356 9981 6646" className={inputCls} /></div>
        <div><label className={lbl}>Role</label><input defaultValue="Director" className={inputCls} /></div>

        <button className="h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors">
          Save profile
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Change password</h2>
        <div><label className={lbl}>Current password</label><input type="password" className={inputCls} /></div>
        <div><label className={lbl}>New password</label><input type="password" className={inputCls} /></div>
        <div><label className={lbl}>Confirm new password</label><input type="password" className={inputCls} /></div>
        <button className="h-9 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          Update password
        </button>
      </div>
    </div>
  );
}
