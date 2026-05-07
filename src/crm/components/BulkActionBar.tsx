import { Trash2, Download, X } from 'lucide-react';

interface BulkActionBarProps {
  count: number;
  onDelete: () => void;
  onExportCSV?: () => void;
  onClearSelection: () => void;
  entityLabel?: string;       // e.g. 'lead' | 'contact' | 'property' | 'task'
}

export default function BulkActionBar({
  count,
  onDelete,
  onExportCSV,
  onClearSelection,
  entityLabel = 'item',
}: BulkActionBarProps) {
  if (count === 0) return null;

  const plural = count === 1 ? entityLabel : `${entityLabel}s`;

  return (
    <div
      role="toolbar"
      aria-label="Bulk actions"
      className="flex items-center gap-3 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-lg"
    >
      <span className="text-sm font-medium text-amber-900 dark:text-amber-200 mr-1">
        {count} {plural} selected
      </span>

      <div className="flex items-center gap-2 ml-auto">
        {onExportCSV && (
          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        )}

        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete {count} {plural}
        </button>

        <button
          onClick={onClearSelection}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          aria-label="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
