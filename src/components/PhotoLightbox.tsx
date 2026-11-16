import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

export type LightboxPhoto = {
  src: string
  alt: string
  name: string
  category: string
}

type PhotoLightboxProps = {
  photos: LightboxPhoto[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function PhotoLightbox({ photos, index, onClose, onNavigate }: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const photo = photos[index]

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog?.open) dialog.close()
      previousFocus.current?.focus()
    }
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (photos.length < 2) return
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate((index + 1) % photos.length)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate((index - 1 + photos.length) % photos.length)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [index, photos.length, onNavigate])

  if (!photo) return null

  const previous = photos[(index - 1 + photos.length) % photos.length]
  const next = photos[(index + 1) % photos.length]

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-labelledby="lightbox-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="lightbox__panel">
        <div className="lightbox__bar">
          <div>
            <p className="eyebrow">{photo.category}</p>
            <h2 id="lightbox-title">{photo.name}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="lightbox__close"
            onClick={onClose}
            aria-label="Закрыть фото"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="lightbox__stage">
          {photos.length > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
              aria-label={`Предыдущее фото: ${previous.name}`}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
          )}
          <img src={photo.src} alt={photo.alt} draggable={false} />
          {photos.length > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={() => onNavigate((index + 1) % photos.length)}
              aria-label={`Следующее фото: ${next.name}`}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="lightbox__foot">
          <span>{photo.alt}</span>
          <span className="lightbox__counter">
            {index + 1} / {photos.length}
          </span>
        </div>
      </div>
    </dialog>
  )
}
