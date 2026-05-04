import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { ChevronDown } from 'lucide-react';
import type { HeroSearchOption } from '../../types/heroSearchDropdown';

export type { HeroSearchOption };

export type HeroSearchDropdownProps = {
  label: string;
  value: string;
  placeholder: string;
  options: HeroSearchOption[];
  icon?: ReactNode;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (value: string) => void;
};

const triggerBase =
  'flex w-full min-h-[44px] items-center justify-between gap-2 rounded-sm border border-brand-bronze-dark/38 bg-brand-brown-dark/55 px-3 py-2 text-left text-brand-ivory/95 text-xs sm:text-sm font-light outline-none transition-colors hover:border-brand-copper/45 hover:bg-brand-muted/35 focus-visible:ring-2 focus-visible:ring-brand-champagne/45 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-panel';

const listboxSurface =
  'absolute left-0 right-0 top-full z-[70] mt-1 max-h-[min(50vh,280px)] overflow-y-auto overscroll-contain rounded-sm border border-brand-bronze-dark/45 bg-[#211A16] py-1 shadow-[0_16px_40px_rgba(17,15,12,0.75)]';

export default function HeroSearchDropdown({
  label,
  value,
  placeholder,
  options,
  icon,
  isOpen,
  onOpen,
  onClose,
  onSelect,
}: HeroSearchDropdownProps) {
  const reactId = useId();
  const fieldId = `hero-dd-${reactId.replace(/:/g, '')}`;
  const listboxId = `${fieldId}-listbox`;
  const labelId = `${fieldId}-label`;

  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder;

  const [activeIdx, setActiveIdx] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)));
  const activeIdxRef = useRef(activeIdx);
  activeIdxRef.current = activeIdx;

  const close = useCallback(() => {
    onClose();
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, [onClose]);

  const choose = useCallback(
    (v: string) => {
      onSelect(v);
      close();
    },
    [onSelect, close]
  );

  useEffect(() => {
    if (!isOpen) return;
    const sel = options.findIndex((o) => o.value === value);
    setActiveIdx(sel >= 0 ? sel : 0);
    const id = requestAnimationFrame(() => listboxRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [isOpen, value, options]);

  useEffect(() => {
    if (!isOpen) return;
    const onDoc = (e: MouseEvent) => {
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', onDocKey, true);
    return () => document.removeEventListener('keydown', onDocKey, true);
  }, [isOpen, close]);

  const onTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) close();
      else onOpen();
    }
    if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      onOpen();
    }
  };

  const onListboxKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, options.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setActiveIdx(0);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      setActiveIdx(options.length - 1);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const opt = options[activeIdxRef.current];
      if (opt) choose(opt.value);
    }
  };

  return (
    <div ref={containerRef} className="relative min-w-0">
      <p id={labelId} className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-champagne/90">
        {label}
      </p>
      <button
        ref={triggerRef}
        type="button"
        id={fieldId}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className={triggerBase}
        onClick={() => (isOpen ? close() : onOpen())}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {icon ? <span className="shrink-0 text-brand-copper">{icon}</span> : null}
          <span className="min-w-0 truncate">{selectedLabel}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-brand-bronze-dark/75 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={options[activeIdx] ? `${fieldId}-opt-${activeIdx}` : undefined}
          className={listboxSurface}
          onKeyDown={onListboxKeyDown}
        >
          {options.map((opt, i) => {
            const selected = opt.value === value;
            const active = i === activeIdx;
            return (
              <div
                key={opt.value}
                id={`${fieldId}-opt-${i}`}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                className={`cursor-pointer border-l-2 px-3 py-2.5 text-xs font-light text-brand-ivory/95 outline-none transition-colors sm:text-sm ${
                  selected ? 'border-brand-copper bg-brand-bronze-dark/25' : 'border-transparent'
                } ${active && !selected ? 'bg-brand-bronze-dark/35' : ''} ${!active && !selected ? 'hover:bg-brand-bronze-dark/28' : ''}`}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(opt.value)}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
