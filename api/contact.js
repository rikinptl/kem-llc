import nodemailer from 'nodemailer'

// Vercel serverless function
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const { name, email, phone, company, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      })
    }

    // Get credentials from environment variables (Vercel secrets)
    const gmailUser = process.env.GMAIL_USER || 'kem.sales.us@gmail.com'
    const gmailPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '') || ''

    if (!gmailPassword) {
      console.error('GMAIL_APP_PASSWORD is not set in environment variables')
      return res.status(500).json({ 
        success: false, 
        message: 'Email service is not configured. Please contact support.' 
      })
    }

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    })

    // Email content
    const mailOptions = {
      from: gmailUser,
      to: 'kem.sales.us@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #001F3F; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F; width: 150px;">Name:</td>
                <td style="padding: 10px; background-color: white;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F;">Email:</td>
                <td style="padding: 10px; background-color: white;">
                  <a href="mailto:${email}" style="color: #0EA5E9; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F;">Phone:</td>
                <td style="padding: 10px; background-color: white;">
                  <a href="tel:${phone}" style="color: #0EA5E9; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ''}
              ${company ? `
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F;">Company:</td>
                <td style="padding: 10px; background-color: white;">${company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold; color: #001F3F; vertical-align: top;">Message:</td>
                <td style="padding: 10px; background-color: white; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #708090; font-size: 12px;">
              <p>This email was sent from the KEM LLC contact form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
      replyTo: email, // Allows replying directly to the customer
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}

