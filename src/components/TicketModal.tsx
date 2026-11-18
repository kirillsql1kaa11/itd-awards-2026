import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, Check, Send, Ticket as TicketIcon, X } from 'lucide-react'
import { ITD_BOT_NAME, ITD_BOT_URL } from '../data/contacts'

type TicketModalProps = {
  onClose: () => void
  onActivate: (number: string) => void
}

export function TicketModal({ onClose, onActivate }: TicketModalProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 30)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previous?.focus()
    }
  }, [onClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const number = value.trim().toUpperCase()

    if (number.length < 4) {
      setError('Введите номер из сообщения бота — минимум 4 символа.')
      inputRef.current?.focus()
      return
    }

    onActivate(number)
  }

  const preview = value.trim().toUpperCase()

  return (
    <div
      className="ticket-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="ticket-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-title"
        ref={dialogRef}
      >
        <button
          type="button"
          className="ticket-modal__close"
          onClick={onClose}
          aria-label="Закрыть окно регистрации"
        >
          <X size={17} aria-hidden="true" />
        </button>

        <p className="eyebrow">Регистрация</p>
        <h2 id="ticket-title">Билет участника</h2>
        <p className="ticket-modal__lead">
          Первый голос — по билету. Получи свой номер у бота в Telegram, введи его ниже,
          и голос будет учтён.
        </p>

        <div className="ticket-modal__ticket" aria-hidden="true">
          <span className="ticket-modal__ticket-top">ITD AWARDS · 2026</span>
          <strong className="ticket-modal__ticket-number">№ {preview || '____'}</strong>
          <span className="ticket-modal__ticket-bottom">
            <span>Один голос</span>
            <span>Сезон 2026</span>
          </span>
        </div>

        <a className="ticket-modal__bot" href={ITD_BOT_URL} target="_blank" rel="noreferrer">
          <span className="ticket-modal__bot-icon" aria-hidden="true">
            <Send size={17} />
          </span>
          <span className="ticket-modal__bot-text">
            <strong>{ITD_BOT_NAME}</strong>
            <small>Открыть бота и получить номер</small>
          </span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <form className="ticket-modal__form" onSubmit={handleSubmit}>
          <label htmlFor="ticket-number">Номер билета</label>
          <input
            id="ticket-number"
            ref={inputRef}
            className="ticket-modal__input"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              setError('')
            }}
            placeholder="ITD-0000"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'ticket-error' : undefined}
          />
          {error && (
            <p className="ticket-modal__error" id="ticket-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="button button--gold ticket-modal__submit">
            Активировать билет
            <Check size={16} aria-hidden="true" />
          </button>
        </form>

        <p className="ticket-modal__note">
          <TicketIcon size={13} aria-hidden="true" />
          Номер останется в этом браузере, чтобы не вводить его перед каждым голосом.
        </p>
      </div>
    </div>
  )
}
