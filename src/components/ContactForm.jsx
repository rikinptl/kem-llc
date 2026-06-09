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
  const [submitStatus, setSubmitStatus] = useState(null)

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(15000),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }))
        throw new Error(errorData.message || `Server error: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="landing-card p-8 md:p-10">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-kem-forest tracking-tight mb-3">
          Send us a message
        </h2>
        <p className="text-kem-forest/60 mb-8">
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['name', 'email', 'phone', 'company'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-semibold text-kem-forest/80 mb-2 capitalize">
                {field === 'email' ? 'Email *' : field === 'name' ? 'Name *' : field}
              </label>
              <input
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field === 'name' || field === 'email'}
                className="form-input"
                placeholder={
                  field === 'name'
                    ? 'Your full name'
                    : field === 'email'
                      ? 'you@company.com'
                      : field === 'phone'
                        ? '+1 (555) 123-4567'
                        : 'Company name'
                }
              />
            </div>
          ))}

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-kem-forest/80 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="form-input resize-none"
              placeholder="Tell us about your project or inquiry..."
            />
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-kem-lime/40 border border-kem-forest/15 text-kem-forest text-sm"
            >
              Thank you! Your message has been sent—we&apos;ll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm"
            >
              <p className="font-semibold mb-1">Couldn&apos;t send your message</p>
              <p>
                Email us directly at{' '}
                <a href="mailto:kem.sales.us@gmail.com" className="underline">
                  kem.sales.us@gmail.com
                </a>
              </p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="landing-pill-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default ContactForm
