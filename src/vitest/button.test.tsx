import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../pages/components/button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('has default ui-button class', () => {
    render(<Button>Test</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('ui-button')
  })

  it('merges custom className', () => {
    render(<Button className="custom-class">Test</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('ui-button')
    expect(button).toHaveClass('custom-class')
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Test</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledOnce()
  })
})
