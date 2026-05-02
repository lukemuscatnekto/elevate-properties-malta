// Internal CRM root — mounted under /crm/* by main.tsx.
// NOTE: This is a frontend-only prototype. No real auth, no backend.
//   - Data is mocked + persisted in localStorage.
//   - "Login" is a mock screen, not a security boundary.
//   - TODO (later phase): website enquiries (ContactForm) could be converted into CRM leads.

import { Routes, Route, Navigate } from 'react-router-dom';
import CRMLayout from './CRMLayout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Tasks from './pages/Tasks';
import Properties from './pages/Properties';
import AddProperty from './pages/AddProperty';
import PropertyDetail from './pages/PropertyDetail';
import Contacts from './pages/Contacts';
import Directory from './pages/Directory';
import Viewings from './pages/Viewings';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';

export default function CRMApp() {
  return (
    <Routes>
      {/* Public-ish (mock) login screen, no real auth */}
      <Route path="login" element={<Login />} />

      {/* All other CRM routes share the layout */}
      <Route element={<CRMLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/add" element={<AddProperty />} />
        <Route path="properties/:id" element={<PropertyDetail />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="directory" element={<Directory />} />
        <Route path="viewings" element={<Viewings />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
