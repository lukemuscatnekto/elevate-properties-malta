import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ElevateVideoIntroWebsiteMockup from './components/ElevateVideoIntroWebsiteMockup';
import PrivacyPage from './pages/PrivacyPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/intro-preview" element={<ElevateVideoIntroWebsiteMockup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
