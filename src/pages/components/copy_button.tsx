import { useState } from 'react'
import { ClipboardCopy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!text) return

    await navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="copy-button"
      aria-label="Copy text"
    >
      {copied ? (
        <Check size={18} className="text-green-500" />
      ) : (
        <ClipboardCopy size={18}/>
      )}
    </button>
  )
}
