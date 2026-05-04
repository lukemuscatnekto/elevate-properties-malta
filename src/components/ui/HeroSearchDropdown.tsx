import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import type { HeroSearchOption } from '../../types/heroSearchDropdown';

export type { HeroSearchOption };

export type HeroSearchDropdownProps = {
  /** Stable id for the trigger (used with external `<label htmlFor>`). */
  fieldId: string;
  /** Id of the visible field label element (for `aria-labelledby`). */
  labelledBy: string;
  value: string;
  placeholder: string;
  options: HeroSearchOption[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (value: string) => void;
};

/** Matches the former native `<select>` trigger appearance (transparent, no boxed field). */
const triggerLike =
  'w-full min-h-[44px] bg-transparent text-brand-ivory/95 text-xs sm:text-sm font-light outline-none cursor-pointer truncate py-1.5 pl-0 pr-7 rounded-sm border border-transparent focus:border-brand-champagne/50 focus:ring-0 text-left';

const listboxSurface =
  'max-h-[min(50vh,280px)] overflow-y-auto overscroll-contain rounded-sm border border-brand-bronze-dark/45 bg-[#211A16] py-1 shadow-[0_16px_40px_rgba(17,15,12,0.75)]';

export default function HeroSearchDropdown({
  fieldId,
  labelledBy,
  value,
  placeholder,
  options,
  isOpen,
  onOpen,
  onClose,
  onSelect,
}: HeroSearchDropdownProps) {
  const listboxId = `${fieldId}-listbox`;

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder;

  const [menuStyle, setMenuStyle] = useState<CSSProperties | null>(null);

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

  const updateMenuPosition = useCallback(() => {
    const t = triggerRef.current;
    if (!t || !isOpen) {
      setMenuStyle(null);
      return;
    }
    const r = t.getBoundingClientRect();
    const pad = 8;
    const vw = typeof window !== 'undefined' ? window.innerWidth : r.width;
    let width = r.width;
    let left = r.left;
    if (left + width > vw - pad) {
      left = Math.max(pad, vw - pad - width);
    }
    left = Math.max(pad, left);
    width = Math.min(width, vw - pad * 2);
    setMenuStyle({
      position: 'fixed',
      top: r.bottom + 4,
      left,
      width,
      zIndex: 200,
    });
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) {
      setMenuStyle(null);
      return;
    }
    updateMenuPosition();
    const onScrollResize = () => updateMenuPosition();
    window.addEventListener('scroll', onScrollResize, true);
    window.addEventListener('resize', onScrollResize);
    const ro = triggerRef.current ? new ResizeObserver(onScrollResize) : null;
    if (triggerRef.current && ro) ro.observe(triggerRef.current);
    return () => {
      window.removeEventListener('scroll', onScrollResize, true);
      window.removeEventListener('resize', onScrollResize);
      ro?.disconnect();
    };
  }, [isOpen, updateMenuPosition]);

  useEffect(() => {
    if (!isOpen) return;
    const sel = options.findIndex((o) => o.value === value);
    setActiveIdx(sel >= 0 ? sel : 0);
    const id = requestAnimationFrame(() => menuRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [isOpen, value, options]);

  useEffect(() => {
    if (!isOpen) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;
      close();
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

  const menu =
    isOpen && menuStyle ? (
      <div
        ref={menuRef}
        id={listboxId}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={labelledBy}
        aria-activedescendant={options[activeIdx] ? `${fieldId}-opt-${activeIdx}` : undefined}
        style={menuStyle}
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
    ) : null;

  return (
    <div ref={containerRef} className="relative min-w-0">
      <button
        ref={triggerRef}
        type="button"
        id={fieldId}
        aria-labelledby={labelledBy}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className={triggerLike}
        onClick={() => (isOpen ? close() : onOpen())}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="min-w-0 truncate">{selectedLabel}</span>
      </button>
      <ChevronDown
        className={`pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-bronze-dark/70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        aria-hidden="true"
      />
      {typeof document !== 'undefined' && menu ? createPortal(menu, document.body) : null}
    </div>
  );
}
