import {
  createLeadFromContactForm,
  createLeadFromListProperty,
  createLeadFromRequestViewing,
  type ContactFormIntake,
  type ListPropertyIntake,
  type RequestViewingIntake,
} from '../crm/utils/publicIntake';

export const FORM_HONEYPOT_FIELD = '_gotcha' as const;

type FormProvider = 'formspree' | 'netlify' | 'emailjs' | 'none';

interface FormSubmissionResult {
  success: boolean;
  message: string;
}

type FormPayload = Record<string, string | number | boolean | null | undefined>;

const FALLBACK_CHANNELS =
  'You may also reach us directly on +356 9981 6646, WhatsApp (see the contact section on this page), or at nicodalton@elevatepropertiesmalta.com — an Elevate Properties Malta advisor will handle your enquiry manually.';

const FORM_PROVIDER = (import.meta.env.VITE_FORM_PROVIDER ?? 'none').toLowerCase() as FormProvider;
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

export const SPAM_HONEYPOT_RESPONSE: FormSubmissionResult = {
  success: true,
  message:
    'Thank you. If your enquiry requires a reply, our concierge will be in touch through the details you provided.',
};

function formspreeEndpointReady(raw: string | undefined): boolean {
  const u = (raw ?? '').trim();
  if (!u) return false;
  if (/PASTE_FORMSPREE|YOUR_FORM|xxxxxxxx/i.test(u)) return false;
  try {
    const url = new URL(u);
    if (url.protocol !== 'https:') return false;
    return url.hostname === 'formspree.io' || url.hostname === 'formspree.com';
  } catch {
    return false;
  }
}

/** Ensures every Formspree JSON body includes a non-empty `message` string. */
function normalizeMessage(formType: string, data: FormPayload): string {
  const raw = String(data.message ?? '').trim();
  if (raw) return raw;
  if (formType === 'viewing') {
    const title = String(data.propertyTitle ?? 'Selected listing');
    const loc = String(data.propertyLocation ?? '').trim();
    return `[Private viewing] ${title}${loc ? ` — ${loc}` : ''}. (No additional notes were entered in the form.)`;
  }
  if (formType === 'valuation') {
    const loc = String(data.location ?? '').trim();
    return `[Confidential valuation / list property]${loc ? ` Locality: ${loc}.` : ''} No free-text message was added — see name, email, and phone above.`;
  }
  return '[Website contact] (Message field was empty in payload — please refer to other fields.)';
}

function buildPayload(formType: string, fields: FormPayload) {
  const subject =
    formType === 'contact'
      ? `Elevate Properties Malta — website contact (${String(fields.type ?? 'enquiry')})`
      : formType === 'valuation'
        ? 'Elevate Properties Malta — confidential valuation / list property'
        : `Elevate Properties Malta — private viewing (${String(fields.propertyTitle ?? 'listing')})`;

  return {
    ...fields,
    formType,
    subject,
    website: 'Elevate Properties Malta',
    submittedAt: new Date().toISOString(),
  };
}

export function defaultSuccessForFormType(formType: string): string {
  switch (formType) {
    case 'contact':
      return 'Thank you. Your enquiry has been received by Elevate Properties Malta. An advisor will follow up shortly.';
    case 'valuation':
      return 'Your confidential valuation request has been received. An advisor from Elevate Properties Malta will follow up shortly.';
    case 'viewing':
      return 'Viewing request received. Our team will contact you shortly.';
    default:
      return 'Thank you — your submission was received.';
  }
}

function isHoneypotTripped(data: FormPayload): boolean {
  return String(data[FORM_HONEYPOT_FIELD] ?? '').trim() !== '';
}

// ─── CRM mirror ───────────────────────────────────────────────────────────────
/**
 * Silently mirrors a successful public-form submission into the CRM.
 * Wrapped in try/catch so a CRM error never surfaces to the public visitor.
 * All writes go through crmIntakeApi.ts — swap that file for a real API later.
 */
async function mirrorToCRM(formType: string, data: FormPayload): Promise<void> {
  try {
    if (formType === 'contact') {
      await createLeadFromContactForm(data as ContactFormIntake);
    } else if (formType === 'valuation') {
      await createLeadFromListProperty(data as ListPropertyIntake);
    } else if (formType === 'viewing') {
      await createLeadFromRequestViewing(data as RequestViewingIntake);
    }
  } catch (err) {
    // CRM errors must never break the public-facing form
    console.warn('[CRM intake] Could not mirror submission:', err);
  }
}

// ─── Providers ────────────────────────────────────────────────────────────────
const submitToFormspree = async (payload: ReturnType<typeof buildPayload>): Promise<FormSubmissionResult> => {
  if (!formspreeEndpointReady(FORMSPREE_ENDPOINT)) {
    return {
      success: false,
      message: `Form delivery is not configured yet. Set VITE_FORMSPREE_ENDPOINT to your live https://formspree.io/f/… URL (replace any placeholder), rebuild, and redeploy. ${FALLBACK_CHANNELS}`,
    };
  }

  const response = await fetch(FORMSPREE_ENDPOINT!.trim(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let body: { error?: string; errors?: string[]; message?: string } | null = null;
  try {
    body = (await response.json()) as typeof body;
  } catch {
    /* non-JSON body */
  }

  if (response.ok) {
    return {
      success: true,
      message: defaultSuccessForFormType(String(payload.formType)),
    };
  }

  const remote =
    (body?.errors && body.errors.join('; ')) ||
    body?.error ||
    body?.message ||
    `HTTP ${response.status}`;

  return {
    success: false,
    message: `We could not deliver this submission (${remote}). ${FALLBACK_CHANNELS}`,
  };
};

const submitToNetlify = async (): Promise<FormSubmissionResult> => ({
  success: false,
  message: `This project is set up for Formspree. Switch VITE_FORM_PROVIDER to formspree and add your endpoint, then rebuild. ${FALLBACK_CHANNELS}`,
});

const submitToEmailJs = async (): Promise<FormSubmissionResult> => ({
  success: false,
  message: `EmailJS is not wired in this build. Use Formspree for production forms. ${FALLBACK_CHANNELS}`,
});

const fallbackLocalSubmission = async (formType: string): Promise<FormSubmissionResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `${defaultSuccessForFormType(formType)} [Browser demo only — no email was sent. Add Formspree env vars and rebuild to go live.]`,
      });
    }, 600);
  });

// ─── Main export ──────────────────────────────────────────────────────────────
export const submitForm = async (formType: string, data: FormPayload): Promise<FormSubmissionResult> => {
  if (isHoneypotTripped(data)) {
    return SPAM_HONEYPOT_RESPONSE;
  }

  const { [FORM_HONEYPOT_FIELD]: _honeypot, ...rest } = data;

  const pageUrl   = typeof window !== 'undefined' ? window.location.href : '';
  const referrer  = typeof document !== 'undefined' && document.referrer?.trim() ? document.referrer.trim() : undefined;

  const enriched: FormPayload = {
    ...rest,
    pageUrl,
    ...(referrer ? { referrer } : {}),
    message: normalizeMessage(formType, rest),
  };

  const providerPayload = buildPayload(formType, enriched);

  try {
    let result: FormSubmissionResult;

    if (FORM_PROVIDER === 'formspree') {
      result = await submitToFormspree(providerPayload);
    } else if (FORM_PROVIDER === 'netlify') {
      result = await submitToNetlify();
    } else if (FORM_PROVIDER === 'emailjs') {
      result = await submitToEmailJs();
    } else {
      result = await fallbackLocalSubmission(formType);
    }

    // Mirror into CRM on success (or in demo/fallback mode — every submission creates a lead)
    if (result.success && (formType === 'contact' || formType === 'valuation' || formType === 'viewing')) {
      void mirrorToCRM(formType, enriched);
    }

    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: `A network error interrupted delivery. Please try again in a moment. ${FALLBACK_CHANNELS}`,
    };
  }
};
