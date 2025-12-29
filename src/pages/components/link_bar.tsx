import type { InputHTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardPaste, ArrowBigRight } from 'lucide-react'

interface LinkBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string
  onValueChange?: (value: string) => void
}

export default function LinkBar({
  value,
  onValueChange,
  placeholder = 'Paste link here...',
  className,
  ...props
}: LinkBarProps) {
  const navigate = useNavigate()
  const canNavigate = Boolean(value && value.trim() !== '')

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onValueChange?.(text)
    } catch (err) {
      console.error('Failed to read clipboard', err)
    }
  }

  return (
    <div>
      <input
        type="url"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={`link-bar ${className ?? ''}`}
        {...props}
      />

      <button
        type="button"
        onClick={handlePaste}
        className="link-bar-clipboard"
        aria-label="Paste from clipboard"
      >
        <ClipboardPaste />
      </button>

      <button
        type="button"
        onClick={() => {
          if (!canNavigate) return
          navigate('/detect', { state: { link: value } })
        }}
        className={`link-bar-arrow ${!canNavigate ? 'disable' : ''}`}
      >
        <ArrowBigRight />
      </button>
    </div>
  )
}
