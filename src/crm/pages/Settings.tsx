import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import { resetCRMData } from '../utils/storage';

export default function Settings() {
  const [confirming, setConfirming] = useState(false);
  const [reset, setReset] = useState(false);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500">CRM preferences and prototype data controls.</p>
      </header>

      <CRMCard title="Workspace">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Toggle label="Email notifications" defaultChecked />
          <Toggle label="WhatsApp notifications" />
          <Toggle label="Daily summary digest" defaultChecked />
          <Toggle label="Show overdue tasks on dashboard" defaultChecked />
        </div>
      </CRMCard>

      <CRMCard title="Branding">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Field label="Company Name" defaultValue="Elevate Properties Malta" />
          <Field label="Primary Email" defaultValue="hello@elevate-properties.example" type="email" />
          <Field label="Office Phone" defaultValue="+356 2122 0000" />
          <Field label="Office Address" defaultValue="Tower Road, Sliema, Malta" />
        </div>
      </CRMCard>

      <CRMCard title="Prototype data">
        <p className="text-sm text-slate-600 mb-3">
          The CRM uses your browser's local storage as a mock backend. Resetting will restore the original sample
          leads, properties, tasks, contacts and viewings on the next page load.
        </p>
        {reset ? (
          <p className="text-sm text-emerald-700">Data reset — refresh the page to reload mock data.</p>
        ) : confirming ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                resetCRMData();
                setReset(true);
                setConfirming(false);
              }}
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-3 py-2 rounded-md"
            >
              <Trash2 className="w-4 h-4" /> Yes, reset all CRM data
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex items-center gap-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 text-sm font-medium px-3 py-2 rounded-md"
          >
            <Trash2 className="w-4 h-4" /> Reset all CRM data
          </button>
        )}
      </CRMCard>
    </div>
  );
}

function Toggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between border border-slate-200 rounded-md px-3 py-2 cursor-pointer hover:bg-slate-50">
      <span className="text-slate-700">{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="accent-teal-600" />
    </label>
  );
}

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <label className="text-sm">
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <input type={type} defaultValue={defaultValue} className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white" />
    </label>
  );
}
