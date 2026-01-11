import React from 'react'

const Footer = () => {
  return (
    <footer id="contact" className="py-section px-6 lg:px-12 border-t border-slate-silver/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-silver text-sm font-light">
            © {new Date().getFullYear()} KEM. All rights reserved.
          </p>
          <p className="text-slate-silver text-sm font-light italic">
            Built for Enterprise
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

