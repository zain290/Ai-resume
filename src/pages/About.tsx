import { motion } from 'framer-motion'

export function About() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
        >
          About Resume Analyzer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-lg text-[#64748b] leading-relaxed"
        >
          Built for job seekers who want an edge. Our AI analyzes your resume against any job description
          using the Google XYZ formula — the same standard top-tier recruiters use.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-[#64748b] leading-relaxed"
        >
          We score formatting, keyword alignment, and impact statements. Every analysis gives you
          actionable steps to improve your resume and land more interviews.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto"
        >
          {[
            { value: '100+', label: 'Resumes Analyzed' },
            { value: 'XYZ', label: 'Formula Check' },
            { value: 'AI', label: 'Powered' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <p className="text-lg font-bold text-indigo-500">{stat.value}</p>
              <p className="text-xs text-[#64748b] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
