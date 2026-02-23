/**
 * LemonSqueezy Webhook Handler — Vercel Serverless Function
 *
 * Receives payment events from LemonSqueezy, verifies the signature,
 * and sends a branded confirmation email via Resend.
 *
 * Webhook URL: https://academic.vexalabs.co/api/webhooks/lemonsqueezy
 * Events: order_created, order_refunded
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const EMAIL_FROM = 'VexaLabs Academy <jairo@updates.vexalabs.co>';

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

/** Generates branded HTML email */
function buildEmailHtml(data: { customerName: string; planName: string; amount: string }): string {
  const firstName = data.customerName.split(' ')[0] ?? data.customerName;
  const LOGO_URL = 'https://academic.vexalabs.co/logo-vexalabs-academy.svg';

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:#0b0d10;font-family:'Inter',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0d10;">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td align="center" style="padding-bottom:32px;">
    <img src="${LOGO_URL}" alt="VexaLabs Academy" width="200" style="display:block;height:auto;" />
  </td></tr>

  <tr><td style="background-color:#10131a;border:1px solid #1e2330;border-radius:16px;padding:40px 32px;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding-bottom:24px;">
        <div style="display:inline-block;width:64px;height:64px;line-height:64px;text-align:center;background-color:rgba(74,222,128,0.15);border:2px solid rgba(74,222,128,0.3);border-radius:50%;font-size:32px;color:#4ade80;">&#10003;</div>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding-bottom:16px;">
        <h1 style="margin:0;font-size:28px;font-weight:800;color:#f1f3f5;line-height:1.3;">
          <span style="color:#4ade80;">¡Muchas gracias,</span><br />${firstName}!
        </h1>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding-bottom:28px;">
        <p style="margin:0;font-size:16px;color:#8b919e;line-height:1.6;max-width:440px;">
          Tu lugar en <strong style="color:#f1f3f5;">Vibe Coding Live</strong> está confirmado.
        </p>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="background-color:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:12px;padding:20px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:14px;color:#8b919e;padding-bottom:8px;">Plan</td>
            <td align="right" style="font-size:14px;font-weight:600;color:#f1f3f5;padding-bottom:8px;">${data.planName}</td>
          </tr>
          <tr>
            <td style="font-size:14px;color:#8b919e;padding-bottom:8px;">Monto</td>
            <td align="right" style="font-size:14px;font-weight:600;color:#4ade80;padding-bottom:8px;">${data.amount}</td>
          </tr>
          <tr>
            <td style="font-size:14px;color:#8b919e;">Inicio</td>
            <td align="right" style="font-size:14px;font-weight:600;color:#f1f3f5;">Lunes 16 de marzo, 7:00 PM (GMT-6)</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="border-top:1px solid #1e2330;"></td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:20px;">
        <p style="margin:0;font-size:16px;font-weight:700;color:#f1f3f5;">Próximos pasos:</p>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td width="36" valign="top"><div style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;background-color:rgba(74,222,128,0.15);border-radius:50%;font-size:12px;font-weight:700;color:#4ade80;">1</div></td>
        <td style="padding-left:12px;">
          <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#f1f3f5;">Uníte al Discord</p>
          <p style="margin:0;font-size:13px;color:#8b919e;">Conectá con la comunidad. El link está en tu recibo de LemonSqueezy.</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td width="36" valign="top"><div style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;background-color:rgba(74,222,128,0.15);border-radius:50%;font-size:12px;font-weight:700;color:#4ade80;">2</div></td>
        <td style="padding-left:12px;">
          <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#f1f3f5;">Preparate para el lunes 16 de marzo</p>
          <p style="margin:0;font-size:13px;color:#8b919e;">Primera sesión en vivo a las 7:00 PM (Costa Rica).</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td width="36" valign="top"><div style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;background-color:rgba(74,222,128,0.15);border-radius:50%;font-size:12px;font-weight:700;color:#4ade80;">3</div></td>
        <td style="padding-left:12px;">
          <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#f1f3f5;">Revisá tu recibo de LemonSqueezy</p>
          <p style="margin:0;font-size:13px;color:#8b919e;">Recibiste un recibo separado con los detalles del pago.</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td align="center">
        <a href="https://academic.vexalabs.co" style="display:inline-block;background-color:#4ade80;color:#0b0d10;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:12px;">Ir a VexaLabs Academy</a>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <p style="margin:0;font-size:13px;color:#8b919e;">¿Preguntas? Escribinos a <a href="mailto:jairo@vexalabs.co" style="color:#4ade80;text-decoration:underline;">jairo@vexalabs.co</a></p>
      </td></tr>
    </table>

  </td></tr>

  <tr><td align="center" style="padding-top:24px;">
    <p style="margin:0;font-size:12px;color:#8b919e;">&copy; 2026 VexaLabs. Todos los derechos reservados.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/* ── Main Handler ── */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', endpoint: 'lemonsqueezy-webhook' });
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[webhook] Missing LEMONSQUEEZY_WEBHOOK_SECRET');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Get raw body
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const rawBody = Buffer.concat(chunks).toString('utf-8');

  // Verify signature
  const signature = (req.headers['x-signature'] as string) ?? '';
  const isValid = await verifySignature(rawBody, signature, webhookSecret);
  if (!isValid) {
    console.warn('[webhook] Invalid signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Parse event
  let event: LemonSqueezyWebhookEvent;
  try {
    event = JSON.parse(rawBody) as LemonSqueezyWebhookEvent;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const eventName = event.meta.event_name;
  console.log(`[webhook] Received event: ${eventName}`);

  // Handle order_created
  if (eventName === 'order_created') {
    const { data, meta } = event;
    const customerName = data.attributes.user_name || meta.custom_data?.name || 'Cliente';
    const customerEmail = data.attributes.user_email;
    const planName = data.attributes.first_order_item?.product_name || 'Vibe Coding Live';
    const amount = `$${(data.attributes.total / 100).toFixed(2)} USD`;

    console.log(`[webhook] Order: ${customerEmail} – ${planName} – ${amount}`);

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[webhook] Missing RESEND_API_KEY');
      return res.status(200).json({ received: true, email: 'skipped - no api key' });
    }

    try {
      const resend = new Resend(resendApiKey);
      const { error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: customerEmail,
        subject: `¡Gracias por tu compra, ${customerName.split(' ')[0]}! — Vibe Coding Live`,
        html: buildEmailHtml({ customerName, planName, amount }),
      });

      if (error) {
        console.error('[webhook] Resend error:', JSON.stringify(error));
      } else {
        console.log('[webhook] Email sent to:', customerEmail);
      }
    } catch (error) {
      console.error('[webhook] Email send error:', error);
    }
  }

  return res.status(200).json({ received: true });
}

/* ── Types ── */

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
      urls: { receipt: string };
    };
  };
}
