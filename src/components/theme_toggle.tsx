import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import Button from './button'

export default function ThemeToggle() {
  // Initialize state from localStorage or system preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark'
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return saved || (prefersDark ? 'dark' : 'light')
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark') // Persist choice
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light') // Persist choice
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className='theme-toggle'>
      <Button 
        onClick={toggleTheme}
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {theme === 'dark' ? (
          <><Sun size={18} className="text-yellow-400" /> <span>Light Mode</span></>
        ) : (
          <><Moon size={18} className="text-slate-700" /> <span>Dark Mode</span></>
        )}
      </Button >
    </div>
  )
}