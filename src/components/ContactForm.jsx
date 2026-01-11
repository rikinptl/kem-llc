import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Check if backend is reachable first
      try {
        const healthCheck = await fetch('/api/health', { 
          method: 'GET',
          signal: AbortSignal.timeout(3000) // 3 second timeout
        })
        if (!healthCheck.ok) {
          throw new Error('Backend server is not responding')
        }
      } catch (healthError) {
        throw new Error('Backend server is not running. Please start it with: cd server && npm start')
      }

      // Send form data to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }))
        throw new Error(errorData.message || `Server error: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        })
        
        // Reset status message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null)
        }, 5000)
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      
      // Show more helpful error message
      console.log('Full error details:', error)
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-3xl border border-slate-silver/30 bg-stark-white p-8 md:p-12 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue tracking-tight mb-6">
          Send us a Message
        </h2>
        <p className="text-slate-silver font-light mb-8">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-midnight-blue mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-silver/30 bg-stark-white text-midnight-blue placeholder-slate-silver focus:outline-none focus:border-slate-silver/50 focus:ring-2 focus:ring-slate-silver/20 transition-all duration-300"
              placeholder="Your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-midnight-blue mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-silver/30 bg-stark-white text-midnight-blue placeholder-slate-silver focus:outline-none focus:border-slate-silver/50 focus:ring-2 focus:ring-slate-silver/20 transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-midnight-blue mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-silver/30 bg-stark-white text-midnight-blue placeholder-slate-silver focus:outline-none focus:border-slate-silver/50 focus:ring-2 focus:ring-slate-silver/20 transition-all duration-300"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-midnight-blue mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-silver/30 bg-stark-white text-midnight-blue placeholder-slate-silver focus:outline-none focus:border-slate-silver/50 focus:ring-2 focus:ring-slate-silver/20 transition-all duration-300"
              placeholder="Company name"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-midnight-blue mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-slate-silver/30 bg-stark-white text-midnight-blue placeholder-slate-silver focus:outline-none focus:border-slate-silver/50 focus:ring-2 focus:ring-slate-silver/20 transition-all duration-300 resize-none"
              placeholder="Tell us about your project or inquiry..."
            />
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800"
            >
              ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800"
            >
              <p className="font-semibold mb-2">✗ Error sending message</p>
              <p className="text-sm">Please ensure the backend server is running on port 3001, or contact us directly at <a href="mailto:kem.sales.us@gmail.com" className="underline">kem.sales.us@gmail.com</a></p>
              <p className="text-xs mt-2 opacity-75">Check browser console (F12) for details</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-midnight-blue text-stark-white px-10 py-4 font-semibold text-sm tracking-tight rounded-lg hover:bg-deep-blue transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default ContactForm

