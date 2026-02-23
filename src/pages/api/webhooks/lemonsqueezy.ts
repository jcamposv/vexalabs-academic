/**
 * LemonSqueezy Webhook Handler
 *
 * Receives payment events from LemonSqueezy, verifies the signature,
 * and sends a branded confirmation email via Resend.
 *
 * Environment variables required:
 *   LEMONSQUEEZY_WEBHOOK_SECRET – Signing secret from LemonSqueezy webhook settings
 *   RESEND_API_KEY – API key from resend.com
 *
 * Webhook URL to configure in LemonSqueezy:
 *   https://academic.vexalabs.co/api/webhooks/lemonsqueezy
 *
 * Events to subscribe: order_created
 */
import type { APIRoute } from 'astro';
import { getResend, EMAIL_FROM } from '../../../lib/resend';
import { purchaseConfirmationEmail } from '../../../lib/email-templates';

export const prerender = false;

/** Verifies the LemonSqueezy webhook signature using HMAC SHA-256 */
async function verifySignature(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signed = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expectedSignature = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return expectedSignature === signature;
}

export const POST: APIRoute = async ({ request }) => {
  const webhookSecret = import.meta.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('[webhook] Missing LEMONSQUEEZY_WEBHOOK_SECRET');
    return new Response('Server configuration error', { status: 500 });
  }

  // Verify signature
  const signature = request.headers.get('x-signature') ?? '';
  const rawBody = await request.text();

  const isValid = await verifySignature(rawBody, signature, webhookSecret);
  if (!isValid) {
    console.warn('[webhook] Invalid signature');
    return new Response('Invalid signature', { status: 401 });
  }

  // Parse event
  let event: LemonSqueezyWebhookEvent;
  try {
    event = JSON.parse(rawBody) as LemonSqueezyWebhookEvent;
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const eventName = event.meta.event_name;
  console.log(`[webhook] Received event: ${eventName}`);

  // Handle order_created event
  if (eventName === 'order_created') {
    const { data, meta } = event;
    const customerName = data.attributes.user_name || meta.custom_data?.name || 'Cliente';
    const customerEmail = data.attributes.user_email;
    const planName = data.attributes.first_order_item?.product_name || 'Vibe Coding Live';
    const amount = `$${(data.attributes.total / 100).toFixed(2)} USD`;

    console.log(`[webhook] Order created: ${customerEmail} – ${planName} – ${amount}`);

    // Send confirmation email via Resend
    try {
      const { error } = await getResend().emails.send({
        from: EMAIL_FROM,
        to: customerEmail,
        subject: `¡Gracias por tu compra, ${customerName.split(' ')[0]}! — Vibe Coding Live`,
        html: purchaseConfirmationEmail({
          customerName,
          planName,
          amount,
        }),
      });

      if (error) {
        console.error('[webhook] Resend email failed:', error);
      } else {
        console.log('[webhook] Confirmation email sent to:', customerEmail);
      }
    } catch (error) {
      console.error('[webhook] Email send error:', error);
      // Don't fail the webhook — LemonSqueezy would retry
    }
  }

  // Always return 200 to acknowledge receipt
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// Reject GET requests (health check)
export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ status: 'ok', endpoint: 'lemonsqueezy-webhook' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

/* ── LemonSqueezy Webhook Types ── */

interface LemonSqueezyWebhookEvent {
  meta: {
    event_name: string;
    custom_data?: Record<string, string>;
  };
  data: {
    id: string;
    type: string;
    attributes: {
      store_id: number;
      user_name: string;
      user_email: string;
      total: number;
      currency: string;
      status: string;
      first_order_item?: {
        product_id: number;
        product_name: string;
        variant_name: string;
        price: number;
      };
      created_at: string;
      urls: {
        receipt: string;
      };
    };
  };
}
