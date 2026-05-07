import { useEffect, useState } from 'react';
import { Undo2, X } from 'lucide-react';

interface UndoToastProps {
  message: string;
  duration?: number;   // ms, default 5000
  onUndo: () => void;
  onDismiss: () => void;
}

export default function UndoToast({
  message,
  duration = 5000,
  onUndo,
  onDismiss,
}: UndoToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct <= 0) {
        clearInterval(tick);
        onDismiss();
      }
    }, 50);

    return () => clearInterval(tick);
  }, [duration, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] w-full max-w-sm"
    >
      <div className="bg-slate-900 dark:bg-slate-700 text-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <p className="flex-1 text-sm font-medium">{message}</p>
          <button
            onClick={() => { onUndo(); onDismiss(); }}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors shrink-0"
          >
            <Undo2 className="w-3.5 h-3.5" />
            Undo
          </button>
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-slate-700 dark:bg-slate-600">
          <div
            className="h-full bg-amber-500 transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
