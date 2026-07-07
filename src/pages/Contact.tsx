import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'

export function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto relative z-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-[#64748b] text-center mb-8">
          Have questions or feedback? We would love to hear from you.
        </p>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-[#64748b] mb-1.5">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#64748b] mb-1.5">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#64748b] mb-1.5">Message</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>
          <Button variant="primary" className="w-full text-center text-base">
            Send Message
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
