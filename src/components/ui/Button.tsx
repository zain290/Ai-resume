import { MagneticWrapper } from './MagneticWrapper'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  className?: string
}

const variants = {
  primary: 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm',
  secondary: 'bg-pink-500 text-white hover:bg-pink-600 shadow-sm',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
}

export function Button({ children, variant = 'primary', onClick, className }: ButtonProps) {
  return (
    <MagneticWrapper strength={0.3}>
      <button
        onClick={onClick}
        className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${variants[variant]} ${className ?? ''}`}
      >
        {children}
      </button>
    </MagneticWrapper>
  )
}
