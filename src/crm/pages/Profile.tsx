import CRMCard from '../components/CRMCard';

export default function Profile() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">User Profile</h1>
        <p className="text-sm text-slate-500">Your CRM account details (mock).</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CRMCard title="Account">
          <div className="flex flex-col items-center text-center py-2">
            <div className="w-20 h-20 rounded-full bg-amber-300/20 text-amber-700 flex items-center justify-center font-semibold text-2xl">
              LM
            </div>
            <p className="mt-3 text-base font-semibold text-slate-800">Luke Muscat</p>
            <p className="text-xs text-slate-500">Senior Agent · Sliema Office</p>
            <p className="text-xs text-slate-500 mt-1">luke@elevate-properties.example</p>
          </div>
        </CRMCard>

        <CRMCard title="Personal Details" className="lg:col-span-2">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" onSubmit={(e) => e.preventDefault()}>
            <Field label="Full Name" defaultValue="Luke Muscat" />
            <Field label="Mobile" defaultValue="+356 7900 0000" />
            <Field label="Email" defaultValue="luke@elevate-properties.example" type="email" />
            <Field label="Office" defaultValue="Sliema HQ" />
            <Field label="Role" defaultValue="Senior Agent" />
            <Field label="License No." defaultValue="MT-EA-12345" />
            <div className="sm:col-span-2 flex justify-end">
              <button type="submit" className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md">Save (mock)</button>
            </div>
          </form>
        </CRMCard>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <label className="text-sm">
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
      />
    </label>
  );
}
