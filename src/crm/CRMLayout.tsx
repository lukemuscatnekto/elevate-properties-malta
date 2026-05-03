import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import CRMSidebar from './components/CRMSidebar';
import CRMTopbar from './components/CRMTopbar';
import CRMFloatingActions from './components/CRMFloatingActions';

const COLLAPSE_KEY = 'epm_crm_sidebar_collapsed';

export default function CRMLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Compact mode: persisted across sessions, and auto-enabled on medium screens.
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem(COLLAPSE_KEY);
    if (stored !== null) return stored === '1';
    // Auto-collapse on medium screens (< 1280px) on first visit.
    return window.matchMedia('(max-width: 1279px)').matches;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
    }
  }, [collapsed]);

  return (
    // Force a light, professional workspace inside the CRM scope.
    // The public site's body styles (charcoal/white) are overridden here.
    <div className="min-h-screen flex bg-slate-100 text-slate-800 font-sans">
      <CRMSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <CRMTopbar
          onMenuClick={() => setSidebarOpen(true)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      <CRMFloatingActions />
    </div>
  );
}
