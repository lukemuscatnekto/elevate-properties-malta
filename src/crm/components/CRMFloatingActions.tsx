import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, UserPlus, Building2, ListTodo, X } from 'lucide-react';

export default function CRMFloatingActions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Add Lead',
      icon: UserPlus,
      onClick: () => navigate('/crm/leads?new=1'),
    },
    {
      label: 'Add Property',
      icon: Building2,
      onClick: () => navigate('/crm/properties/add'),
    },
    {
      label: 'Add Task',
      icon: ListTodo,
      onClick: () => navigate('/crm/tasks?new=1'),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {open &&
        actions.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              setOpen(false);
              onClick();
            }}
            className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 shadow-md rounded-full pl-3 pr-4 py-2 text-sm hover:bg-slate-50 hover:text-teal-700"
            aria-label={label}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg flex items-center justify-center transition-transform"
        aria-label={open ? 'Close quick actions' : 'Open quick actions'}
        aria-expanded={open}
      >
        {open ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
    </div>
  );
}
