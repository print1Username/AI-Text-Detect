import { useEffect, useState } from 'react'
import CopyButton from './copy_button'

interface DetectImageProps {
  link?: string
  file?: File
}

export default function DetectImage({ link, file }: DetectImageProps) {
  const [text, setText] = useState('Detecting...')
  const API_BASE = import.meta.env.VITE_API_BASE

  useEffect(() => {
    if (!API_BASE) {
      setText('API base URL not configured')
      return
    }

    const detect = async () => {
      try {
        // Upload image
        if (file) {
          const formData = new FormData()
          formData.append('file', file)

          const res = await fetch(`${API_BASE}/ocr/image`, {
            method: 'POST',
            body: formData,
          })

          const data = await res.json()
          setText(data.text)
          return
        }

        // Detect from link
        if (link) {
          const res = await fetch(
            `${API_BASE}/ocr/link?link=${encodeURIComponent(link)}`,
            { method: 'POST' }
          )

          const data = await res.json()
          setText(data.text)
        }
      } catch (err) {
        setText('OCR failed')
        console.error(err)
      }
    }

    detect()
  }, [file, link, API_BASE])

  return (
    <>
      {link && (
        <img
          className={`detect-image ${!file || !link ? 'border-none' : ''}`}
          src={link}
        />
      )}

      <div className='flex items-center gap-3'>
        <h2>Detect Text:</h2>
        <CopyButton text={text}/>
      </div>


      <pre className="detect-image-text">{text}</pre>
    </>
  )
}
