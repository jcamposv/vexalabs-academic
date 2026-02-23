/**
 * Resend email client for transactional emails.
 *
 * Environment variable required:
 *   RESEND_API_KEY – API key from resend.com → API Keys
 */
import { Resend } from 'resend';

export const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const EMAIL_FROM = 'VexaLabs Academy <updates@updates.vexalabs.co>';
