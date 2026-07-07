import { ThemeContext } from './ThemeContext'
import { tokens } from './tokens'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={tokens}>
      {children}
    </ThemeContext.Provider>
  )
}
