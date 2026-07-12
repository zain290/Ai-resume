import { Outlet } from 'react-router-dom'
import Header from '../alpha/Header'
import Footer from '../alpha/Footer'
import { useState, useEffect } from 'react'

export function Layout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = document.documentElement
    root.classList.add(theme)
    root.classList.add(`theme-${theme}`)
    return () => {
      root.classList.remove(theme, `theme-${theme}`)
    }
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <div className="bg-background text-text min-h-screen transition-colors duration-500 selection:bg-primary selection:text-white w-full">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="w-full min-h-screen">
        <Outlet />
      </main>
      <Footer theme={theme} />
    </div>
  )
}
