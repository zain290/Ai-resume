import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadZone } from '../components/ui/UploadZone'
import { ResultsDashboard } from '../components/ui/ResultsDashboard'
import { api, type AnalysisResult } from '../services/api'
import SEO from '../components/alpha/SEO'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RezFix',
  url: 'https://rezfix.zemz.pro',
  description: 'AI-powered resume analyzer that scores your resume against job descriptions.',
  logo: 'https://rezfix.zemz.pro/favicon.svg',
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RezFix',
  url: 'https://rezfix.zemz.pro',
  description: 'AI-powered resume analyzer and optimizer using the Google XYZ formula.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://rezfix.zemz.pro/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the resume analyzer work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF or DOCX resume, paste the target job description, and our AI scores your resume using the Google XYZ formula, identifying matched and missing keywords.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Google XYZ formula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Google XYZ formula is "Accomplished X as measured by Y, by doing Z." It is a proven method for writing impactful resume bullet points.',
      },
    },
  ],
}

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
    <div className="relative pt-24 bg-background w-full flex flex-col items-center">
      <SEO
        title="RezFix - AI Resume Analyzer & Optimizer | Score Your Resume"
        description="Upload your resume and job description to get an instant AI-powered score using the Google XYZ formula. Identify missing keywords and get actionable rewrite suggestions."
        canonicalUrl="https://rezfix.zemz.pro/"
        keywords="resume analyzer, AI resume, resume scoring, Google XYZ formula, job application, career, ATS optimization, resume optimizer"
        schemaMarkup={JSON.stringify(organizationSchema) + ',' + JSON.stringify(websiteSchema) + ',' + JSON.stringify(faqSchema)}
      />
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="py-12 px-4 w-full"
          >
            <ResultsDashboard result={result} onReset={handleReset} />
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            <section className="w-full flex items-center justify-center px-4 pt-12 pb-24">
              <div className="w-full max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-12"
                >
                  <h1 className="text-4xl md:text-[56px] font-medium text-text mb-6 tracking-tight" style={{ fontFamily: 'Google Sans, var(--heading)' }}>
                    RezFix
                  </h1>
                  <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    Upload your resume, paste the job description. Get scored against the Google XYZ formula with actionable improvements.
                  </p>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-8 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm max-w-2xl mx-auto"
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
                  className="mt-8 text-sm text-neutral-500 dark:text-neutral-400"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your data stays private — resumes are analyzed and immediately discarded
                  </span>
                </motion.p>
              </div>
            </section>

            <section className="py-24 px-4 w-full bg-[var(--color-surface)]">
              <div className="w-full max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium text-center mb-16 text-text">
                  How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
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
                      className="relative p-8 rounded-3xl bg-[var(--color-create-surface)] border border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <div className="text-4xl font-light text-neutral-300 dark:text-neutral-700 mb-6 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">0{i+1}</div>
                      <h3 className="text-xl font-medium text-text mb-4">{item.title}</h3>
                      <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
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
