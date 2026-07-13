import { motion } from 'framer-motion'
import { ScoreRing } from './ScoreRing'
import type { AnalysisResult } from '../../services/api'

interface ResultsDashboardProps {
  result: AnalysisResult
  onReset: () => void
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: 'easeOut' as const },
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-3xl mx-auto space-y-8"
    >
      <motion.div {...fadeUp(0.1)} className="flex justify-center mb-12">
        <ScoreRing score={result.score} />
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="bg-[var(--color-create-surface)] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-medium text-text mb-4">Summary</h3>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-lg">{result.overall_summary}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div {...fadeUp(0.5)} className="bg-[var(--color-create-surface)] border border-emerald-100 dark:border-emerald-900/30 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matched_keywords.map((kw, i) => (
              <span
                key={i}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
              >
                {kw}
              </span>
            ))}
            {result.matched_keywords.length === 0 && (
              <p className="text-sm text-neutral-400">No keywords matched</p>
            )}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.6)} className="bg-[var(--color-create-surface)] border border-red-100 dark:border-red-900/30 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-medium text-red-600 dark:text-red-400 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missing_keywords.map((kw, i) => (
              <span
                key={i}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50"
              >
                {kw}
              </span>
            ))}
            {result.missing_keywords.length === 0 && (
              <p className="text-sm text-neutral-400">No missing keywords</p>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.7)} className="bg-[var(--color-create-surface)] border border-amber-100 dark:border-amber-900/30 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-medium text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          XYZ Formula Improvements
        </h3>
        <ul className="space-y-4">
          {result.xyz_improvements.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-base text-neutral-600 dark:text-neutral-300">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div {...fadeUp(0.9)} className="flex justify-center pt-8 pb-12">
        <button
          onClick={onReset}
          className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-full px-8 py-3 font-medium text-sm transition-all duration-300 cursor-pointer shadow-sm"
        >
          Analyze Another Resume
        </button>
      </motion.div>
    </motion.div>
  )
}
