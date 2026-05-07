import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PrivacyPage from './pages/PrivacyPage.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';

// CRM is code-split — the full CRM bundle only loads when the user navigates to /crm/*
const CRMApp = lazy(() => import('./crm/CRMApp.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"        element={<App />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/crm/*"
          element={
            <Suspense fallback={
              <div className="min-h-screen bg-slate-900 text-slate-100 grid place-items-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-slate-400">Loading CRM…</p>
                </div>
              </div>
            }>
              <CRMApp />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
