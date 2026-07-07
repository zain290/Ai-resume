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
      <motion.div {...fadeUp(0.1)} className="flex justify-center">
        <ScoreRing score={result.score} />
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#0f172a] mb-3">Summary</h3>
        <p className="text-[#64748b] leading-relaxed">{result.overall_summary}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div {...fadeUp(0.5)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-emerald-600 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matched_keywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200"
              >
                {kw}
              </span>
            ))}
            {result.matched_keywords.length === 0 && (
              <p className="text-sm text-[#94a3b8]">No keywords matched</p>
            )}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.6)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-pink-600 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missing_keywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 border border-pink-200"
              >
                {kw}
              </span>
            ))}
            {result.missing_keywords.length === 0 && (
              <p className="text-sm text-[#94a3b8]">No missing keywords</p>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.7)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-amber-600 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          XYZ Formula Improvements
        </h3>
        <ul className="space-y-3">
          {result.xyz_improvements.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#64748b]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div {...fadeUp(0.9)} className="flex justify-center pb-12">
        <button
          onClick={onReset}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-[#64748b] border border-slate-200 hover:bg-slate-50 hover:text-[#0f172a] transition-all cursor-pointer bg-white shadow-sm"
        >
          Analyze Another Resume
        </button>
      </motion.div>
    </motion.div>
  )
}
