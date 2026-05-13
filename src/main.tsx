import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ElevateVideoIntroWebsiteMockup from './components/ElevateVideoIntroWebsiteMockup';
import PrivacyPage from './pages/PrivacyPage';
import GuidesPage from './pages/GuidesPage';
import MaltaPropertyGuide from './pages/MaltaPropertyGuide';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/guides/malta-property-market" element={<MaltaPropertyGuide />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/intro-preview" element={<ElevateVideoIntroWebsiteMockup />} />
        </Routes>
        <FloatingWhatsAppButton />
      </>
    </BrowserRouter>
  </StrictMode>,
);
