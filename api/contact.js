import nodemailer from 'nodemailer'
import {
  applyCors,
  checkRateLimit,
  escapeHtml,
  getClientIp,
  rejectDisallowedOrigin,
  safeSubjectName,
  sanitizeContactInput,
  validateContactPayload,
} from './lib/security.js'

export default async function handler(req, res) {
  applyCors(req, res, { methods: 'POST, OPTIONS', headers: 'Content-Type' })

  if (req.method === 'OPTIONS') {
    if (rejectDisallowedOrigin(req, res)) return
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  if (rejectDisallowedOrigin(req, res)) return

  const ip = getClientIp(req)
  const rate = checkRateLimit(`contact:${ip}`, { windowMs: 15 * 60 * 1000, max: 5 })
  if (!rate.ok) {
    res.setHeader('Retry-After', String(rate.retryAfter))
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    })
  }

  try {
    const data = sanitizeContactInput(req.body)
    const validation = validateContactPayload(data)
    if (!validation.ok) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      })
    }

    const { name, email, phone, company, message } = data

    const gmailUser = process.env.GMAIL_USER || 'kem.sales.us@gmail.com'
    const gmailPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '') || ''

    if (!gmailPassword) {
      console.error('GMAIL_APP_PASSWORD is not set in environment variables')
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact support.',
      })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    })

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeCompany = escapeHtml(company)
    const safeMessage = escapeHtml(message)

    const mailOptions = {
      from: gmailUser,
      to: 'kem.sales.us@gmail.com',
      subject: `New Contact Form Submission from ${safeSubjectName(name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #001F3F; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F; width: 150px;">Name:</td>
                <td style="padding: 10px; background-color: white;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F;">Email:</td>
                <td style="padding: 10px; background-color: white;">
                  <a href="mailto:${safeEmail}" style="color: #0EA5E9; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F;">Phone:</td>
                <td style="padding: 10px; background-color: white;">${safePhone}</td>
              </tr>
              ` : ''}
              ${company ? `
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F;">Company:</td>
                <td style="padding: 10px; background-color: white;">${safeCompany}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F; vertical-align: top;">Message:</td>
                <td style="padding: 10px; background-color: white; white-space: pre-wrap;">${safeMessage}</td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #708090; font-size: 12px;">
              <p>This email was sent from the KEM LLC contact form.</p>
              <p>Submitted on: ${escapeHtml(new Date().toLocaleString())}</p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
    })
  }
}
