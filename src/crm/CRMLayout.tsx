import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import CRMSidebar from './components/CRMSidebar';
import CRMTopbar from './components/CRMTopbar';
import { getTheme, setTheme as persistTheme, getSidebarCollapsed, setSidebarCollapsed } from './utils/storage';
import type { CRMTheme } from './utils/storage';

export default function CRMLayout() {
  const [theme, setThemeState] = useState<CRMTheme>(() => getTheme());
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    // Auto-collapse on first load for screens narrower than 1280px
    const saved = localStorage.getItem('epm_crm_sidebar_collapsed');
    if (saved !== null) return saved === 'true';
    return typeof window !== 'undefined' && window.innerWidth < 1280;
  });

  const toggleTheme = () => {
    const next: CRMTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    persistTheme(next);
  };

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    setSidebarCollapsed(next);
  };

  // Sync getSidebarCollapsed on first load
  useEffect(() => {
    const stored = getSidebarCollapsed();
    setCollapsed(stored);
  }, []);

  return (
    // Apply dark class to CRM root so Tailwind dark: variants activate
    <div className={theme === 'dark' ? 'dark' : ''} style={{ colorScheme: theme }}>
      <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <CRMSidebar collapsed={collapsed} />

        <div className="flex flex-col flex-1 min-w-0">
          <CRMTopbar
            collapsed={collapsed}
            onToggleCollapse={toggleCollapse}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
