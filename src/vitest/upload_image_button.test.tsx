import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UploadImageButton from '../pages/components/upload_image_button'

// mock navigate
const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

// mock Button
vi.mock('./button', () => ({
  default: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}))

describe('UploadImageButton', () => {
  beforeEach(() => {
    mockNavigate.mockClear()

    // mock URL.createObjectURL
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:test-url')
  })

  it('renders upload button', () => {
    render(<UploadImageButton />)

    expect(screen.getByText('Upload Image')).toBeInTheDocument()
  })

  it('opens file dialog when button is clicked', () => {
    const { container } = render(<UploadImageButton />)

    // get hidden file input
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const clickSpy = vi.spyOn(input, 'click')

    fireEvent.click(screen.getByText('Upload Image'))

    expect(clickSpy).toHaveBeenCalled()
  })

  it('navigates when file is selected', () => {
    const { container } = render(<UploadImageButton />)

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const file = new File(['dummy'], 'test.png', {
      type: 'image/png',
    })

    fireEvent.change(input, {
      target: { files: [file] },
    })

    expect(mockNavigate).toHaveBeenCalledWith('/detect', {
      state: {
        link: 'blob:test-url',
        file,
      },
    })
  })

  it('does nothing when no file is selected', () => {
    const { container } = render(<UploadImageButton />)

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    fireEvent.change(input, {
      target: { files: [] },
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
