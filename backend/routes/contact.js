const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create reusable Nodemailer transporter with connection timeout protection
function createTransporter() {
  const user = process.env.EMAIL_USER;
  const rawPass = process.env.EMAIL_PASS || '';
  const pass = rawPass.replace(/\s+/g, '').trim();

  if (process.env.EMAIL_SERVICE === 'gmail' || !process.env.EMAIL_HOST) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 465,
    secure: process.env.EMAIL_SECURE === 'true' || parseInt(process.env.EMAIL_PORT, 10) === 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

// Map subject keys to clean titles
const subjectMap = {
  'engineering-hardware': 'Engineering Hardware Inquiry',
  'pharma-materials': 'Pharma Materials Inquiry',
  'ibr-certified': 'IBR Certified Materials',
  'quotation': 'Request for Quotation',
  'partnership': 'Partnership Opportunities',
  'other': 'General Inquiry',
};

const getSubjectLabel = (val) => subjectMap[val] || val || 'General Inquiry';

// Generate structured HTML email for Admin notification
function generateAdminEmailHtml({ name, email, phone, company, subject, message, receivedAt }) {
  const subjectText = getSubjectLabel(subject);
  const replyMailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subjectText} - Jay Traders`)}`;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Website Inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;padding:30px 10px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);border:1px solid #e5e7eb;">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg, #dc2626 0%, #991b1b 100%);padding:28px 32px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.3px;">
                  📬 New Contact Form Inquiry
                </h1>
                <p style="margin:6px 0 0 0;color:#fecaca;font-size:14px;">
                  Jay Traders Website Lead
                </p>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding:28px 32px;">
                
                <!-- Notice Badge -->
                <div style="background-color:#eff6ff;border-left:4px solid #2563eb;padding:12px 16px;border-radius:4px;margin-bottom:24px;">
                  <span style="color:#1e40af;font-size:13px;font-weight:600;">
                    Inquiry Category:
                  </span>
                  <span style="color:#1d4ed8;font-size:14px;font-weight:700;margin-left:6px;">
                    ${subjectText}
                  </span>
                </div>

                <!-- Contact Details Table -->
                <h2 style="margin:0 0 14px 0;color:#111827;font-size:16px;font-weight:700;border-bottom:2px solid #f3f4f6;padding-bottom:8px;">
                  Contact Information
                </h2>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 12px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;width:130px;color:#6b7280;font-size:13px;font-weight:600;">
                      Full Name
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:600;">
                      Email Address
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">
                      <a href="mailto:${email}" style="color:#dc2626;text-decoration:none;font-weight:600;">
                        ${email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:600;">
                      Phone Number
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">
                      ${phone ? `<a href="tel:${phone}" style="color:#111827;text-decoration:none;font-weight:600;">${phone}</a>` : '<span style="color:#9ca3af;font-style:italic;">Not provided</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:600;">
                      Company Name
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">
                      ${company || '<span style="color:#9ca3af;font-style:italic;">Not provided</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;background-color:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:600;">
                      Date & Time
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-size:13px;">
                      ${receivedAt}
                    </td>
                  </tr>
                </table>

                <!-- Message Section -->
                <h2 style="margin:0 0 12px 0;color:#111827;font-size:16px;font-weight:700;border-bottom:2px solid #f3f4f6;padding-bottom:8px;">
                  Message Content
                </h2>
                <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #dc2626;border-radius:6px;padding:16px 18px;margin-bottom:28px;">
                  <p style="margin:0;color:#1f2937;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
                </div>

                <!-- Call to action button -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center">
                      <a href="${replyMailto}" style="display:inline-block;background-color:#dc2626;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;box-shadow:0 2px 4px rgba(220,38,38,0.3);">
                        ↩ Reply Directly to ${name}
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
                <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.5;">
                  Jay Traders • Industrial & Engineering Hardware Suppliers<br>
                  303/1/2 Makarpura GIDC, Vadodara, Gujarat 390010
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

// Generate confirmation email for user
function generateUserConfirmationHtml({ name, subject }) {
  const subjectText = getSubjectLabel(subject);
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;padding:30px 10px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);border:1px solid #e5e7eb;">
            <tr>
              <td style="background:linear-gradient(135deg, #dc2626 0%, #991b1b 100%);padding:28px 32px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">
                  Thank You for Contacting Jay Traders
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 16px 0;color:#111827;font-size:15px;font-weight:600;">
                  Hello ${name},
                </p>
                <p style="margin:0 0 16px 0;color:#4b5563;font-size:14px;line-height:1.6;">
                  We have received your inquiry regarding <strong>${subjectText}</strong>. Our team is reviewing the details and will get back to you within 24 business hours.
                </p>
                <div style="background-color:#f9fafb;border-radius:8px;padding:16px;margin:20px 0;border:1px solid #e5e7eb;">
                  <h3 style="margin:0 0 8px 0;color:#111827;font-size:14px;">Need urgent assistance?</h3>
                  <p style="margin:0;color:#4b5563;font-size:13px;line-height:1.5;">
                    📞 +91 9925031497 / +91 9904301497<br>
                    ✉️ <a href="mailto:jaytraders2008@yahoo.com" style="color:#dc2626;">jaytraders2008@yahoo.com</a>
                  </p>
                </div>
                <p style="margin:0;color:#6b7280;font-size:13px;">
                  Best regards,<br>
                  <strong style="color:#111827;">Team Jay Traders</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

// POST /api/contact (mounted on /api/contact in server.js, so route is '/')
router.post('/', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Name, email, subject, and message are required fields.' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email configuration missing: EMAIL_USER or EMAIL_PASS not set.');
    return res.status(500).json({
      message: 'Email service is currently not configured on the server. Please contact us directly by phone.',
    });
  }

  const now = new Date();
  const receivedAt = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const adminRecipient = process.env.ADMIN_EMAIL_RECEIVER || 'jaytraders2008@yahoo.com';
  const transporter = createTransporter();

  const adminMailOptions = {
    from: `"Jay Traders Portal" <${process.env.EMAIL_USER}>`,
    to: adminRecipient,
    replyTo: email,
    subject: `New Inquiry [${getSubjectLabel(subject)}] from ${name}`,
    html: generateAdminEmailHtml({ name, email, phone, company, subject, message, receivedAt }),
  };

  const userMailOptions = {
    from: `"Jay Traders" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We have received your inquiry - Jay Traders`,
    html: generateUserConfirmationHtml({ name, subject }),
  };

  try {
    // Send admin notification
    await transporter.sendMail(adminMailOptions);

    // Send confirmation to user (non-blocking for response)
    transporter.sendMail(userMailOptions).catch((err) => {
      console.warn('Customer confirmation email failed:', err.message);
    });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error.message || error);
    return res.status(500).json({
      message: 'Failed to deliver message. Please verify your email or contact us directly by phone.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;