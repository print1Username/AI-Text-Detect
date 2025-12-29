import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BackButton from '../pages/components/back_button'

// mock react-router-dom
const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('BackButton', () => {
  it('renders back button', () => {
    render(<BackButton />)

    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  it('navigates to home when clicked', () => {
    render(<BackButton />)

    fireEvent.click(screen.getByText('Back'))

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
