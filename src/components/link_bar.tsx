import type { InputHTMLAttributes } from 'react'

import { Clipboard } from 'lucide-react';

interface LinkBarProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: (value: string) => void
}

export default function LinkBar({
  value,
  onChange,
  placeholder = 'Paste link here...',
  className,
  ...props
}: LinkBarProps) {
  return (
    <input
      type="url"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={`link-bar ${className ?? ''}`}
      {...props}
    />
  )
}
