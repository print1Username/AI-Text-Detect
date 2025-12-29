import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DetectImage from '../pages/components/detect_image'

// mock CopyButton
vi.mock('./copy_button', () => ({
  default: ({ text }: { text: string }) => (
    <button data-testid="copy-button">{text}</button>
  ),
}))

describe('DetectImage', () => {
  beforeEach(() => {
    // mock fetch
    globalThis.fetch = vi.fn()

    // mock env
    vi.stubEnv('VITE_API_BASE', 'http://api.test')
  })

  it('shows detecting text at start', () => {
    render(<DetectImage />)

    expect(screen.getByText('Detecting...')).toBeInTheDocument()
  })

  it('shows error when API base is missing', async () => {
    vi.stubEnv('VITE_API_BASE', '')

    render(<DetectImage />)

    await waitFor(() => {
      expect(
        screen.getByText('API base URL not configured')
      ).toBeInTheDocument()
    })
  })

  it('detects text from link', async () => {
    // mock fetch response
    ;(fetch as any).mockResolvedValueOnce({
      json: async () => ({ text: 'Link OCR result' }),
    })

    render(<DetectImage link="http://image.test/a.png" />)

    await waitFor(() => {
      expect(screen.getByText('Link OCR result')).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledWith(
      'http://api.test/ocr/link?link=http%3A%2F%2Fimage.test%2Fa.png',
      { method: 'POST' }
    )
  })

  it('detects text from file', async () => {
    const file = new File(['dummy'], 'test.png', { type: 'image/png' })

    ;(fetch as any).mockResolvedValueOnce({
      json: async () => ({ text: 'File OCR result' }),
    })

    render(<DetectImage file={file} />)

    await waitFor(() => {
      expect(screen.getByText('File OCR result')).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalled()
  })

  it('shows error text when fetch fails', async () => {
    ;(fetch as any).mockRejectedValueOnce(new Error('fail'))

    render(<DetectImage link="http://image.test/a.png" />)

    await waitFor(() => {
      expect(screen.getByText('OCR failed')).toBeInTheDocument()
    })
  })
})
