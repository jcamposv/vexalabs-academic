/**
 * HTML email templates with VexaLabs Academy branding.
 * Uses inline styles for maximum email client compatibility.
 */

const LOGO_URL = 'https://academic.vexalabs.co/logo-vexalabs-academy.svg';
const BRAND_GREEN = '#4ade80';
const BRAND_DARK = '#0b0d10';
const BRAND_SURFACE = '#10131a';
const BRAND_BORDER = '#1e2330';
const TEXT_PRIMARY = '#f1f3f5';
const TEXT_MUTED = '#8b919e';

/** Generates the purchase confirmation email HTML */
export function purchaseConfirmationEmail(data: {
  customerName: string;
  planName: string;
  amount: string;
}): string {
  const firstName = data.customerName.split(' ')[0] ?? data.customerName;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>¡Gracias por tu compra!</title>
</head>
<body style="margin:0; padding:0; background-color:${BRAND_DARK}; font-family:'Inter',Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND_DARK};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="${LOGO_URL}" alt="VexaLabs Academy" width="200" style="display:block; height:auto;" />
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background-color:${BRAND_SURFACE}; border:1px solid ${BRAND_BORDER}; border-radius:16px; padding:40px 32px;">

              <!-- Check icon -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="display:inline-block; width:64px; height:64px; line-height:64px; text-align:center; background-color:rgba(74,222,128,0.15); border:2px solid rgba(74,222,128,0.3); border-radius:50%; font-size:32px;">
                      &#10003;
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <h1 style="margin:0; font-size:28px; font-weight:800; color:${TEXT_PRIMARY}; line-height:1.3;">
                      <span style="color:${BRAND_GREEN};">¡Muchas gracias,</span><br />${firstName}!
                    </h1>
                  </td>
                </tr>
              </table>

              <!-- Description -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <p style="margin:0; font-size:16px; color:${TEXT_MUTED}; line-height:1.6; max-width:440px;">
                      Tu lugar en <strong style="color:${TEXT_PRIMARY};">Vibe Coding Live</strong> está confirmado. Acá están los detalles de tu compra.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Order details box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.2); border-radius:12px; padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px; color:${TEXT_MUTED}; padding-bottom:8px;">Plan</td>
                        <td align="right" style="font-size:14px; font-weight:600; color:${TEXT_PRIMARY}; padding-bottom:8px;">${data.planName}</td>
                      </tr>
                      <tr>
                        <td style="font-size:14px; color:${TEXT_MUTED}; padding-bottom:8px;">Monto</td>
                        <td align="right" style="font-size:14px; font-weight:600; color:${BRAND_GREEN}; padding-bottom:8px;">${data.amount}</td>
                      </tr>
                      <tr>
                        <td style="font-size:14px; color:${TEXT_MUTED};">Inicio</td>
                        <td align="right" style="font-size:14px; font-weight:600; color:${TEXT_PRIMARY};">Lunes 16 de marzo, 7:00 PM (GMT-6)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="border-top:1px solid ${BRAND_BORDER};"></td>
                </tr>
              </table>

              <!-- Next steps heading -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0; font-size:16px; font-weight:700; color:${TEXT_PRIMARY};">Próximos pasos:</p>
                  </td>
                </tr>
              </table>

              <!-- Step 1 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="36" valign="top">
                    <div style="display:inline-block; width:28px; height:28px; line-height:28px; text-align:center; background-color:rgba(74,222,128,0.15); border-radius:50%; font-size:12px; font-weight:700; color:${BRAND_GREEN};">1</div>
                  </td>
                  <td style="padding-left:12px;">
                    <p style="margin:0 0 2px; font-size:14px; font-weight:600; color:${TEXT_PRIMARY};">Uníte al Discord</p>
                    <p style="margin:0; font-size:13px; color:${TEXT_MUTED};">Conectá con la comunidad. El link está más abajo.</p>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="36" valign="top">
                    <div style="display:inline-block; width:28px; height:28px; line-height:28px; text-align:center; background-color:rgba(74,222,128,0.15); border-radius:50%; font-size:12px; font-weight:700; color:${BRAND_GREEN};">2</div>
                  </td>
                  <td style="padding-left:12px;">
                    <p style="margin:0 0 2px; font-size:14px; font-weight:600; color:${TEXT_PRIMARY};">Preparate para el lunes 16 de marzo</p>
                    <p style="margin:0; font-size:13px; color:${TEXT_MUTED};">Primera sesión en vivo a las 7:00 PM (Costa Rica).</p>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="36" valign="top">
                    <div style="display:inline-block; width:28px; height:28px; line-height:28px; text-align:center; background-color:rgba(74,222,128,0.15); border-radius:50%; font-size:12px; font-weight:700; color:${BRAND_GREEN};">3</div>
                  </td>
                  <td style="padding-left:12px;">
                    <p style="margin:0 0 2px; font-size:14px; font-weight:600; color:${TEXT_PRIMARY};">Revisá tu recibo de LemonSqueezy</p>
                    <p style="margin:0; font-size:13px; color:${TEXT_MUTED};">Recibiste un recibo separado con los detalles del pago.</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="https://academic.vexalabs.co" style="display:inline-block; background-color:${BRAND_GREEN}; color:${BRAND_DARK}; text-decoration:none; font-size:14px; font-weight:700; padding:14px 32px; border-radius:12px;">
                      Ir a VexaLabs Academy
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Support -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <p style="margin:0; font-size:13px; color:${TEXT_MUTED};">
                      ¿Preguntas? Escribinos a <a href="mailto:jairo@vexalabs.co" style="color:${BRAND_GREEN}; text-decoration:underline;">jairo@vexalabs.co</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0; font-size:12px; color:${TEXT_MUTED};">
                &copy; ${new Date().getFullYear()} VexaLabs. Todos los derechos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}
