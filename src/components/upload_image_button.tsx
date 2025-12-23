import { useRef } from 'react'
import { ImageUp } from 'lucide-react'
import Button from './button'

export default function UploadImageButton() {
  const inputRef = useRef<HTMLInputElement>(null)

  // open file dialog
  const handleClick = () => {
    inputRef.current?.click()
  }

  // handle file selected
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log('Selected file:', file)
    // do upload / preview here
  }

  return (
    <>
      <Button
        onClick={handleClick}
        className="flex items-center gap-2"
      >
        Upload Image
        <ImageUp size={18} />
      </Button>

      {/* hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </>
  )
}
