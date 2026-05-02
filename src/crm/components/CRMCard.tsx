import type { ReactNode } from 'react';

interface CRMCardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export default function CRMCard({
  title,
  action,
  children,
  className = '',
  padded = true,
}: CRMCardProps) {
  return (
    <section className={`bg-white border border-slate-200 rounded-lg shadow-sm ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          {title && <h3 className="text-sm font-semibold text-slate-800">{title}</h3>}
          {action}
        </header>
      )}
      <div className={padded ? 'p-4' : ''}>{children}</div>
    </section>
  );
}
