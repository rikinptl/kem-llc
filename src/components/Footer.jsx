import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Footer = () => {
  const { ref } = useScrollAnimation()

  return (
    <footer
      ref={ref}
      className="py-section px-6 lg:px-12 border-t border-slate-silver/20 relative overflow-hidden bg-stark-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Footer Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-slate-silver text-sm font-light"
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} KEM. All rights reserved.
          </motion.p>
          <motion.p
            className="text-slate-silver text-sm font-light italic"
            whileHover={{ scale: 1.05 }}
          >
            Built for Enterprise
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
