import { motion } from 'framer-motion'

interface ScoreRingProps {
  score: number
}

export function ScoreRing({ score }: ScoreRingProps) {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const getColor = () => {
    if (score >= 80) return '#06b6d4'
    if (score >= 60) return '#6366f1'
    if (score >= 40) return '#ec4899'
    return '#f43f5e'
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width="160" height="160" className="transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-4xl font-bold"
            style={{ color: getColor() }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <p className="text-sm font-medium text-[#64748b]">Overall Score</p>
    </div>
  )
}
