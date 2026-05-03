import { FORM_HONEYPOT_FIELD } from '../utils/formSubmission';

/**
 * Anti-spam honeypot for Formspree. Must remain empty.
 * Hidden with clip + `aria-hidden` so it is not read in the accessibility tree; `tabIndex={-1}` removes it from tab order.
 */

type Props = { idSuffix: string; value: string; onChange: (v: string) => void };

export default function FormHoneypot({ idSuffix, value, onChange }: Props) {
  return (
    <div
      className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
      style={{ clipPath: 'inset(50%)' }}
      aria-hidden="true"
    >
      <input
        id={`hp-${idSuffix}`}
        type="text"
        name={FORM_HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
