import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

const directionVariants = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
}

export function AnimatedSection({
  children,
  className,
  direction = 'up',
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimation(ref, {
    from: { opacity: 0, ...directionVariants[direction] },
    to: { opacity: 1, x: 0, y: 0 },
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionVariants[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
