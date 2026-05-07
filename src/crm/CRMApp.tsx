import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import CRMLayout from './CRMLayout';

// Lazy-load all pages to keep the initial bundle small
const Login         = lazy(() => import('./pages/Login'));
const Dashboard     = lazy(() => import('./pages/Dashboard'));
const Leads         = lazy(() => import('./pages/Leads'));
const LeadDetail    = lazy(() => import('./pages/LeadDetail'));
const LeadEdit      = lazy(() => import('./pages/LeadEdit'));
const Properties    = lazy(() => import('./pages/Properties'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const PropertyEdit  = lazy(() => import('./pages/PropertyEdit'));
const AddProperty   = lazy(() => import('./pages/AddProperty'));
const Contacts      = lazy(() => import('./pages/Contacts'));
const Directory     = lazy(() => import('./pages/Directory'));
const Viewings      = lazy(() => import('./pages/Viewings'));
const Tasks         = lazy(() => import('./pages/Tasks'));
const Reports       = lazy(() => import('./pages/Reports'));
const Profile       = lazy(() => import('./pages/Profile'));
const Settings      = lazy(() => import('./pages/Settings'));

const Loading = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function CRMApp() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route element={<CRMLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard"             element={<Dashboard />} />

          <Route path="leads"                 element={<Leads />} />
          <Route path="leads/new"             element={<LeadEdit />} />
          <Route path="leads/:id"             element={<LeadDetail />} />
          <Route path="leads/:id/edit"        element={<LeadEdit />} />

          <Route path="properties"            element={<Properties />} />
          <Route path="properties/add"        element={<AddProperty />} />
          <Route path="properties/:id"        element={<PropertyDetail />} />
          <Route path="properties/:id/edit"   element={<PropertyEdit />} />

          <Route path="contacts"              element={<Contacts />} />
          <Route path="directory"             element={<Directory />} />
          <Route path="viewings"              element={<Viewings />} />
          <Route path="tasks"                 element={<Tasks />} />
          <Route path="reports"              element={<Reports />} />
          <Route path="profile"              element={<Profile />} />
          <Route path="settings"             element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
