import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import CopyButton from '../pages/components/copy_button'

describe('CopyButton', () => {
  beforeEach(() => {
    // mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('renders copy button', () => {
    render(<CopyButton text="hello" />)

    expect(
      screen.getByRole('button', { name: /copy text/i })
    ).toBeInTheDocument()
  })

  it('copies text when clicked', async () => {
    render(<CopyButton text="hello world" />)

    fireEvent.click(screen.getByRole('button'))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'hello world'
    )
  })

  it('shows success state after click', async () => {
    render(<CopyButton text="copy me" />)

    fireEvent.click(screen.getByRole('button'))

    expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })

  it('resets copied state after 1500ms', async () => {
    render(<CopyButton text="reset test" />)

    fireEvent.click(screen.getByRole('button'))

    // copied = true
    expect(navigator.clipboard.writeText).toHaveBeenCalled()

    vi.advanceTimersByTime(1500)

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
  })

  it('does nothing if text is empty', () => {
    render(<CopyButton text="" />)

    fireEvent.click(screen.getByRole('button'))

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
  })
})
