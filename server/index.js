import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'kem.sales.us@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '') || '', // Remove spaces from App Password
  },
})

// Verify transporter connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Email service configuration error:', error.message)
    console.log('💡 Make sure GMAIL_APP_PASSWORD is set correctly in .env file')
  } else {
    console.log('✅ Email service ready to send messages')
  }
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      })
    }

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER || 'kem.sales.us@gmail.com',
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

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/contact`)
})

