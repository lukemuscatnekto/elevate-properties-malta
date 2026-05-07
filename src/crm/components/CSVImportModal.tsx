import { useRef, useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import type { Lead, Contact } from '../types';
import { parseCSVLeads, parseCSVContacts } from '../utils/csvHelpers';

type Mode = 'leads' | 'contacts';

interface CSVImportModalProps {
  mode: Mode;
  onConfirm: (rows: Partial<Lead>[] | Partial<Contact>[]) => void;
  onClose: () => void;
}

export default function CSVImportModal({ mode, onConfirm, onClose }: CSVImportModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<Partial<Lead>[] | Partial<Contact>[]>([]);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const label = mode === 'leads' ? 'leads' : 'contacts';
  const expectedColumns = mode === 'leads'
    ? 'firstName, lastName, email, phone, status, source, enquiryType, budgetMin, budgetMax, locationInterest, assignedAgent, notes'
    : 'firstName, lastName, email, phone, type, company, nationality, notes';

  const handleFile = (file: File) => {
    setError('');
    setRows([]);
    setFileName(file.name);

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a .csv file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      try {
        const parsed = mode === 'leads' ? parseCSVLeads(text) : parseCSVContacts(text);
        if (parsed.length === 0) {
          setError('No valid rows found. Check your column headers match the expected format.');
          return;
        }
        setRows(parsed as Partial<Lead>[] | Partial<Contact>[]);
      } catch (err) {
        setError('Could not parse the file. Ensure it is a valid CSV.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-modal-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 id="import-modal-title" className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Import {label}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Drop zone */}
          <div
            className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400 transition-colors"
            onClick={() => inputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); }}
            onDrop={e => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleFile(file);
            }}
          >
            <Upload className="w-8 h-8 text-slate-300 dark:text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {fileName ? fileName : 'Click to upload or drag & drop a CSV'}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">.csv files only</p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="sr-only"
              onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
            />
          </div>

          {/* Column hint */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Expected columns</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono break-all">{expectedColumns}</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Preview */}
          {rows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {rows.length} row{rows.length !== 1 ? 's' : ''} ready to import
                </p>
              </div>
              <div className="max-h-40 overflow-y-auto border border-slate-200 dark:border-slate-600 rounded-lg">
                {rows.slice(0, 8).map((r, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 text-xs border-b border-slate-100 dark:border-slate-700 last:border-0 text-slate-600 dark:text-slate-400"
                  >
                    {mode === 'leads'
                      ? `${(r as Partial<Lead>).firstName} ${(r as Partial<Lead>).lastName} — ${(r as Partial<Lead>).email}`
                      : `${(r as Partial<Contact>).firstName} ${(r as Partial<Contact>).lastName} — ${(r as Partial<Contact>).email}`
                    }
                  </div>
                ))}
                {rows.length > 8 && (
                  <div className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500">
                    …and {rows.length - 8} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={rows.length === 0}
            onClick={() => onConfirm(rows)}
            className="flex-1 h-10 rounded-lg text-sm font-medium bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white transition-colors"
          >
            Import {rows.length > 0 ? `${rows.length} rows` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
