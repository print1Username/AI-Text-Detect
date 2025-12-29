import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LinkBar from '../pages/components/link_bar'

// mock navigate
const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('LinkBar', () => {
  beforeEach(() => {
    // mock clipboard
    Object.assign(navigator, {
      clipboard: {
        readText: vi.fn().mockResolvedValue('http://paste.test'),
      },
    })

    mockNavigate.mockClear()
  })

  it('renders input with value', () => {
    render(<LinkBar value="http://test.com" />)

    const input = screen.getByDisplayValue('http://test.com')
    expect(input).toBeInTheDocument()
  })

  it('calls onValueChange when typing', () => {
    const onValueChange = vi.fn()

    render(<LinkBar value="" onValueChange={onValueChange} />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'http://input.test' },
    })

    expect(onValueChange).toHaveBeenCalledWith('http://input.test')
  })

  it('pastes text from clipboard', async () => {
    const onValueChange = vi.fn()
  
    render(<LinkBar value="" onValueChange={onValueChange} />)
  
    fireEvent.click(
      screen.getByRole('button', { name: /paste from clipboard/i })
    )
  
    await waitFor(() => {
      expect(navigator.clipboard.readText).toHaveBeenCalled()
      expect(onValueChange).toHaveBeenCalledWith('http://paste.test')
    })
  })

  it('navigates when value is valid', () => {
    render(<LinkBar value="http://go.test" />)

    const arrowButton = screen.getAllByRole('button')[1]
    fireEvent.click(arrowButton)

    expect(mockNavigate).toHaveBeenCalledWith('/detect', {
      state: { link: 'http://go.test' },
    })
  })

  it('does not navigate when value is empty', () => {
    render(<LinkBar value="" />)

    const arrowButton = screen.getAllByRole('button')[1]
    fireEvent.click(arrowButton)

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
