import { useEffect, useState } from 'react'

interface DetectImageProps {
  link?: string
  file?: File
}

export default function DetectImage({ link, file }: DetectImageProps) {
  const [text, setText] = useState('Detecting...')
  const API_BASE = 'http://localhost:8000'

  useEffect(() => {
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
          const res = await fetch(`${API_BASE}/ocr/link?link=${encodeURIComponent(link)}`, {
            method: 'POST',
          })

          const data = await res.json()
          setText(data.text)
        }
      } catch (err) {
        setText('OCR failed')
        console.error(err)
      }
    }

    detect()
  }, [file, link])

  return (
    <>
      {link && <img className={`detect-image ${!file || !link ? 'border-none' : ''}`} src={link} />}

      <h2>Detect Text:</h2>

      <pre className='detect-image-text'>{text}</pre>
    </>
  )
}
