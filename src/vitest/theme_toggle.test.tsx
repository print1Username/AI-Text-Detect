import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ThemeToggle from '../pages/components/theme_toggle'

// mock Button to avoid style logic
vi.mock('./button', () => ({
  default: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    // clear localStorage
    localStorage.clear()

    // reset html class
    document.documentElement.className = ''

    // mock matchMedia
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
  })

  it('uses light theme by default', () => {
    render(<ThemeToggle />)

    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('switches to dark mode when clicked', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button'))

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(screen.getByText('Light Mode')).toBeInTheDocument()
  })

  it('switches back to light mode when clicked again', () => {
    render(<ThemeToggle />)

    // first click -> dark
    fireEvent.click(screen.getByRole('button'))

    // second click -> light
    fireEvent.click(screen.getByRole('button'))

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  })

  it('reads theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')

    render(<ThemeToggle />)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByText('Light Mode')).toBeInTheDocument()
  })
})
