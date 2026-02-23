/**
 * Resend email client for transactional emails.
 *
 * Environment variable required:
 *   RESEND_API_KEY – API key from resend.com → API Keys
 */
import { Resend } from 'resend';

export const EMAIL_FROM = 'VexaLabs Academy <updates@updates.vexalabs.co>';

/** Lazy-initialized Resend client to avoid crashes if env var is missing */
let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}
