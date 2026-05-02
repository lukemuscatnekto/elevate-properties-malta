import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CRMSidebar from './components/CRMSidebar';
import CRMTopbar from './components/CRMTopbar';
import CRMFloatingActions from './components/CRMFloatingActions';

export default function CRMLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Force a light, professional workspace inside the CRM scope.
    // The public site's body styles (charcoal/white) are overridden here.
    <div className="min-h-screen flex bg-slate-100 text-slate-800 font-sans">
      <CRMSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <CRMTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      <CRMFloatingActions />
    </div>
  );
}
