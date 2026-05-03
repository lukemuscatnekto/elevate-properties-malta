import { StrictMode } from 'react';
import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PrivacyPage from './pages/PrivacyPage.tsx';
import './index.css';

const CRMApp = lazy(() => import('./crm/CRMApp.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/crm/*"
          element={(
            <Suspense fallback={<div className="min-h-screen bg-black text-white grid place-items-center">Loading CRM...</div>}>
              <CRMApp />
            </Suspense>
          )}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
