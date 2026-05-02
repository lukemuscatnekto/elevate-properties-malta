import {
  createLeadFromContactForm,
  createLeadFromListProperty,
  createLeadFromRequestViewing,
} from '../crm/utils/publicIntake';

type FormProvider = 'formspree' | 'netlify' | 'emailjs' | 'none';

interface FormSubmissionResult {
  success: boolean;
  message: string;
}

type FormPayload = Record<string, string | number | boolean | null | undefined>;

// Mirror successful public-form submissions into the internal CRM (localStorage).
// Public visitors never see CRM wording — this is silent.
function mirrorToCRM(formType: string, data: FormPayload): void {
  try {
    if (formType === 'contact') {
      createLeadFromContactForm({
        fullName: String(data.name ?? ''),
        email: String(data.email ?? ''),
        enquiryType: String(data.type ?? 'buying'),
        budgetRange: data.budget != null ? String(data.budget) : undefined,
        message: String(data.message ?? ''),
        phone: data.phone != null ? String(data.phone) : undefined,
      });
    } else if (formType === 'valuation') {
      createLeadFromListProperty({
        fullName: String(data.name ?? ''),
        email: String(data.email ?? ''),
        propertyLocation: String(data.location ?? ''),
        phone: data.phone != null ? String(data.phone) : undefined,
      });
    } else if (formType === 'viewing') {
      createLeadFromRequestViewing({
        fullName: String(data.name ?? ''),
        email: String(data.email ?? ''),
        phone: data.phone != null ? String(data.phone) : undefined,
        propertyTitle: data.propertyTitle != null ? String(data.propertyTitle) : undefined,
        propertyId: data.propertyId != null ? String(data.propertyId) : undefined,
        preferredDate: data.preferredDate != null ? String(data.preferredDate) : undefined,
        message: data.message != null ? String(data.message) : undefined,
      });
    }
  } catch (err) {
    // Never let an intake failure surface to the public visitor.
    console.warn('[CRM intake] failed to mirror public submission:', err);
  }
}

const FORM_PROVIDER = (import.meta.env.VITE_FORM_PROVIDER ?? 'none').toLowerCase() as FormProvider;
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

const defaultSuccessMessage = 'Thank you. A member of the Elevate team will be in touch shortly.';

const buildPayload = (formType: string, data: FormPayload) => ({
  formType,
  website: 'Elevate Properties Malta',
  submittedAt: new Date().toISOString(),
  ...data,
});

const submitToFormspree = async (payload: ReturnType<typeof buildPayload>): Promise<FormSubmissionResult> => {
  if (!FORMSPREE_ENDPOINT) {
    return {
      success: false,
      message: 'Formspree endpoint not configured. Add VITE_FORMSPREE_ENDPOINT to your environment.',
    };
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      success: false,
      message: 'We could not send your enquiry right now. Please try again or contact us by phone/email.',
    };
  }

  return {
    success: true,
    message: defaultSuccessMessage,
  };
};

const submitToNetlify = async (): Promise<FormSubmissionResult> => {
  // Netlify Forms requires static HTML form markup and will not work through this runtime utility alone.
  return {
    success: false,
    message: 'Netlify Forms requires static HTML form setup. See README for the exact integration steps.',
  };
};

const submitToEmailJs = async (): Promise<FormSubmissionResult> => {
  // EmailJS setup is intentionally documented in README to keep this frontend deployable without embedding keys.
  return {
    success: false,
    message: 'EmailJS is not configured yet. Follow README setup to connect service/template/public keys.',
  };
};

const fallbackLocalSubmission = async (): Promise<FormSubmissionResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `${defaultSuccessMessage} (demo mode - connect a form provider before launch)`,
      });
    }, 700);
  });

export const submitForm = async (formType: string, data: FormPayload): Promise<FormSubmissionResult> => {
  const payload = buildPayload(formType, data);

  try {
    let result: FormSubmissionResult;

    if (FORM_PROVIDER === 'formspree') {
      result = await submitToFormspree(payload);
    } else if (FORM_PROVIDER === 'netlify') {
      result = await submitToNetlify();
    } else if (FORM_PROVIDER === 'emailjs') {
      result = await submitToEmailJs();
    } else {
      result = await fallbackLocalSubmission();
    }

    if (
      result.success &&
      (formType === 'contact' || formType === 'valuation' || formType === 'viewing')
    ) {
      mirrorToCRM(formType, data);
    }

    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Submission failed due to a network error. Please try again shortly.',
    };
  }
};
