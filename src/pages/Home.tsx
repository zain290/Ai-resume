import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadZone } from '../components/ui/UploadZone'
import { ResultsDashboard } from '../components/ui/ResultsDashboard'
import { api, type AnalysisResult } from '../services/api'

export function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')

  const handleAnalyze = useCallback(async (file: File, jobDescription: string) => {
    setLoading(true)
    setError('')
    try {
      const data = await api.analyzeResume(file, jobDescription)
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleReset = useCallback(() => {
    setResult(null)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="py-12 px-4"
          >
            <ResultsDashboard result={result} onReset={handleReset} />
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <section className="min-h-screen flex items-center justify-center px-4 py-16">
              <div className="w-full max-w-xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-8"
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                    AI Resume Analyzer
                  </h1>
                  <p className="text-lg text-[#64748b] max-w-lg mx-auto">
                    Upload your resume, paste the job description. Get scored against the Google XYZ formula with actionable improvements.
                  </p>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <UploadZone onAnalyze={handleAnalyze} loading={loading} />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-8 text-xs text-[#94a3b8]"
                >
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your data stays private — resumes are analyzed and immediately discarded
                  </span>
                </motion.p>
              </div>
            </section>

            <section className="py-24 px-4">
              <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                  How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Upload & Paste',
                      desc: 'Drop your resume (PDF/DOCX) and paste the job description you are targeting.',
                    },
                    {
                      title: 'AI Analysis',
                      desc: 'Our AI scores your resume using the Google XYZ formula and checks keyword alignment.',
                    },
                    {
                      title: 'Get Results',
                      desc: 'Receive a detailed breakdown with matched/missing keywords and rewrite suggestions.',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
                    >
                      <h3 className="text-lg font-semibold text-[#0f172a] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
