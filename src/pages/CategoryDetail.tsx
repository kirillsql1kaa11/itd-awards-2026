import { useCallback, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { RefObject } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Info,
  Maximize2,
  Music2,
  Pencil,
  Share2,
  Ticket,
  X,
} from 'lucide-react'
import type { Category, Nominee } from '../data/categories'
import { categories, getCategory, groupLabels } from '../data/categories'
import { EVENT } from '../data/event'
import { useVotes } from '../context/VotesContext'
import { useToast } from '../context/ToastContext'
import { useTicket } from '../context/TicketContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { ITD_CHANNEL_URL } from '../data/contacts'
import { CategoryIcon } from '../components/CategoryIcon'
import { NomineeArtwork } from '../components/NomineeArtwork'
import { getNomineeVisual } from '../lib/nomineeVisual'
import { PhotoLightbox } from '../components/PhotoLightbox'
import type { LightboxPhoto } from '../components/PhotoLightbox'
import { TicketModal } from '../components/TicketModal'
import { TrackPlayer } from '../components/TrackPlayer'
import { NotFound } from './NotFound'

function shuffleNominees(nominees: Nominee[]): Nominee[] {
  const result = [...nominees]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = result[index]
    result[index] = result[swapIndex]
    result[swapIndex] = current
  }
  return result
}

export function CategoryDetail() {
  const { categoryId } = useParams()
  const category = getCategory(categoryId)
  usePageTitle(category ? category.title : 'Номинация не найдена')

  if (!category) return <NotFound />

  return <CategoryView category={category} key={category.id} />
}

const categoryKickers: Record<string, string> = {
  'meme-goda': 'Мем',
  'project-goda': 'Проект',
  'zavoz-goda': 'Завоз',
  'event-goda': 'Событие',
  'track-goda': 'Трек',
}

function CategoryView({ category }: { category: Category }) {
  const { votes, saveVote } = useVotes()
  const { ticket, activateTicket } = useTicket()
  const { showToast } = useToast()
  const savedPicks = votes[category.id]?.picks ?? []
  const [draft, setDraft] = useState<string[]>(savedPicks)
  const [editing, setEditing] = useState(savedPicks.length === 0)
  const [error, setError] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [ticketOpen, setTicketOpen] = useState(false)
  const firstNomineeRef = useRef<HTMLButtonElement>(null)
  const closeTicketModal = useCallback(() => setTicketOpen(false), [])
  const [orderedNominees] = useState(() =>
    category.id === 'track-goda' ? shuffleNominees(category.nominees) : category.nominees,
  )

  const currentIndex = categories.findIndex((categoryItem) => categoryItem.id === category.id)
  const previousCategory = categories[(currentIndex - 1 + categories.length) % categories.length]
  const nextCategory = categories[(currentIndex + 1) % categories.length]
  const selectedNominees = orderedNominees.filter((nomineeItem) =>
    draft.includes(nomineeItem.id),
  )
  const saved = savedPicks.length > 0
  const photoNominees = orderedNominees.filter((nomineeItem) => nomineeItem.photo)
  const lightboxPhotos: LightboxPhoto[] = photoNominees.map((nomineeItem) => ({
    src: nomineeItem.photo ?? '',
    alt: nomineeItem.photoAlt ?? nomineeItem.name,
    name: nomineeItem.name,
    category: category.title,
  }))
  const kicker = categoryKickers[category.id] ?? 'Автор'

  const openPhoto = (nomineeId: string) => {
    const index = photoNominees.findIndex((nomineeItem) => nomineeItem.id === nomineeId)
    if (index >= 0) setLightboxIndex(index)
  }

  const toggleNominee = (nomineeId: string) => {
    if (!editing) return
    setError('')
    setDraft([nomineeId])
  }

  const handleSave = () => {
    if (draft.length === 0) {
      setError('Выберите номинанта — без этого голос не сохранится.')
      firstNomineeRef.current?.focus()
      return
    }

    if (!ticket) {
      setError('')
      setTicketOpen(true)
      return
    }

    saveVote(category.id, draft)
    setEditing(false)
    setError('')
    showToast(`Голос учтён. Билет ${ticket.number}.`)
  }

  const handleTicketActivated = (number: string) => {
    const next = activateTicket(number)
    setTicketOpen(false)
    saveVote(category.id, draft)
    setEditing(false)
    setError('')
    showToast(`Билет ${next.number} активирован. Голос учтён.`)
  }

  const handleEdit = () => {
    setDraft(savedPicks)
    setEditing(true)
    setError('')
  }

  const handleCancelEdit = () => {
    setDraft(savedPicks)
    setEditing(false)
    setError('')
  }

  const removePick = (nomineeId: string) => {
    if (!editing) return
    setDraft(draft.filter((pick) => pick !== nomineeId))
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Ссылка на номинацию скопирована.', 'info')
    } catch {
      showToast('Не удалось скопировать ссылку.', 'error')
    }
  }

  return (
    <div className="category-page">
      <header className="category-head">
        <div className="container">
          <nav className="crumbs" aria-label="Хлебные крошки">
            <span className="crumbs__item">
              <Link to="/">Главная</Link>
            </span>
            <span className="crumbs__item">
              <span className="crumbs__separator" aria-hidden="true">
                /
              </span>
              <Link to="/nominations">Номинации</Link>
            </span>
            <span className="crumbs__item">
              <span className="crumbs__separator" aria-hidden="true">
                /
              </span>
              <span>{category.title}</span>
            </span>
          </nav>

          <div className="category-head__grid">
            <div className="category-head__content">
              <div className="category-head__title-row">
                <span className="category-head__icon" aria-hidden="true">
                  <CategoryIcon id={category.id} size={30} />
                </span>
                <div>
                  <p className="eyebrow">
                    {groupLabels[category.group]} · Один выбор
                  </p>
                  <h1 className="category-title">{category.title}</h1>
                </div>
              </div>
              <p className="category-description">{category.description}</p>
              <div className="meta-pills">
                <span className="meta-pill">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  Один голос
                </span>
                <span className="meta-pill">
                  <Clock3 size={14} aria-hidden="true" />
                  до {EVENT.votingEndLabel}
                </span>
                <button type="button" className="meta-pill meta-pill--button" onClick={handleShare}>
                  <Share2 size={14} aria-hidden="true" />
                  Поделиться
                </button>
              </div>
            </div>

            <aside className="category-head__aside" aria-label="Информация о голосовании">
              <div className="category-note">
                <span className="category-note__icon" aria-hidden="true">
                  <Info size={18} />
                </span>
                <div>
                  <span className="category-note__label">Формат номинации</span>
                  <p>Выберите одного номинанта. Голос можно изменить до конца голосования.</p>
                </div>
              </div>
              <div className="category-note category-note--status">
                <span className="status-dot" aria-hidden="true" />
                <div>
                  <span className="category-note__label">Голосование открыто</span>
                  <p>До {EVENT.votingEndLabel}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section className="section category-vote-section">
        <div className="container">
          <div className="vote-layout">
            <div className="nominees-column">
              {saved && editing && (
                <div className="saved-strip saved-strip--editing">
                  <Pencil size={17} aria-hidden="true" />
                  <span>Режим редактирования. Сохраните новый выбор или отмените изменения.</span>
                  <button
                    type="button"
                    className="saved-strip__button"
                    onClick={handleCancelEdit}
                  >
                    <X size={13} aria-hidden="true" />
                    Отменить
                  </button>
                </div>
              )}

              <div className="vote-list-head">
                <h2>Номинанты</h2>
                <div className="selection-count" aria-live="polite">
                  <span>{draft.length > 0 ? 'Номинант выбран' : 'Голос не отдан'}</span>
                </div>
              </div>

              <div className="nominee-list">
                {orderedNominees.map((nomineeItem, index) => {
                  const isSelected = draft.includes(nomineeItem.id)
                  return (
                    <NomineeCard
                      key={nomineeItem.id}
                      nominee={nomineeItem}
                      categoryId={category.id}
                      groupLabel={groupLabels[category.group]}
                      kicker={kicker}
                      selected={isSelected}
                      editing={editing}
                      index={index}
                      onToggle={() => toggleNominee(nomineeItem.id)}
                      onOpenPhoto={() => openPhoto(nomineeItem.id)}
                      buttonRef={index === 0 ? firstNomineeRef : undefined}
                    />
                  )
                })}
              </div>

              {editing && (
                <p className="nominee-list__note">
                  Нажмите на карточку, чтобы отметить выбор.
                </p>
              )}
            </div>

            <aside className="vote-panel" aria-labelledby="vote-panel-title">
              <div className="vote-panel__head">
                <p className="eyebrow">Ваш голос</p>
                {ticket && (
                  <span className="vote-panel__ticket">
                    <Ticket size={12} aria-hidden="true" />
                    {ticket.number}
                  </span>
                )}
              </div>
              <h2 id="vote-panel-title">
                {saved && !editing ? 'Голос учтён' : 'Сделайте выбор'}
              </h2>

              <ul className="picked-list">
                {selectedNominees.length > 0 ? (
                  selectedNominees.map((nomineeItem) => (
                    <li key={nomineeItem.id}>
                      <span className="picked-list__check" aria-hidden="true">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="picked-list__name">{nomineeItem.name}</span>
                      {editing && (
                        <button
                          type="button"
                          className="picked-list__remove"
                          onClick={() => removePick(nomineeItem.id)}
                          aria-label={`Убрать ${nomineeItem.name} из выбора`}
                        >
                          <X size={13} aria-hidden="true" />
                        </button>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="picked-list__empty">
                    Пока пусто — выберите номинанта.
                  </li>
                )}
              </ul>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              {editing ? (
                <button type="button" className="button button--gold vote-panel__button" onClick={handleSave}>
                  Сохранить голос
                  <Check size={17} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  className="button button--ghost vote-panel__button"
                  onClick={handleEdit}
                >
                  Изменить голос
                  <Pencil size={15} aria-hidden="true" />
                </button>
              )}
            </aside>
          </div>

          <nav className="category-pagination" aria-label="Другие номинации">
            <Link
              to={`/nominations/${previousCategory.id}`}
              className="category-pagination__link"
            >
              <span className="category-pagination__label">
                <ArrowLeft size={14} aria-hidden="true" />
                Предыдущая
              </span>
              <strong>
                <span aria-hidden="true">
                  <CategoryIcon id={previousCategory.id} size={18} />
                </span>
                {previousCategory.title}
              </strong>
            </Link>
            <Link
              to={`/nominations/${nextCategory.id}`}
              className="category-pagination__link category-pagination__link--next"
            >
              <span className="category-pagination__label">
                Следующая
                <ArrowRight size={14} aria-hidden="true" />
              </span>
              <strong>
                <span aria-hidden="true">
                  <CategoryIcon id={nextCategory.id} size={18} />
                </span>
                {nextCategory.title}
              </strong>
            </Link>
          </nav>
        </div>
      </section>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={lightboxPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {ticketOpen && (
        <TicketModal onClose={closeTicketModal} onActivate={handleTicketActivated} />
      )}
    </div>
  )
}

type NomineeCardProps = {
  nominee: Nominee
  categoryId: string
  groupLabel: string
  kicker: string
  selected: boolean
  editing: boolean
  index: number
  onToggle: () => void
  onOpenPhoto: () => void
  buttonRef?: RefObject<HTMLButtonElement | null>
}

function NomineeCard({
  nominee,
  categoryId,
  groupLabel,
  kicker,
  selected,
  editing,
  index,
  onToggle,
  onOpenPhoto,
  buttonRef,
}: NomineeCardProps) {
  const visual = getNomineeVisual(categoryId, nominee)
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      className={`nominee nominee--${visual} ${selected ? 'is-selected' : ''} ${
        editing ? '' : 'is-locked'
      }`}
    >
      <button
        ref={buttonRef}
        type="button"
        className="nominee__toggle"
        aria-pressed={selected}
        aria-label={selected ? `${nominee.name} — выбран` : `Выбрать ${nominee.name}`}
        disabled={!editing}
        onClick={onToggle}
      />

      <div className="nominee__media">
        {visual === 'photo' ? (
          <>
            <NomineeArtwork
              nominee={nominee}
              categoryId={categoryId}
              className="nominee__photo-img"
            />
            <button
              type="button"
              className="nominee__zoom"
              onClick={onOpenPhoto}
              aria-label={`Открыть фото крупнее: ${nominee.photoAlt ?? nominee.name}`}
            >
              <Maximize2 size={13} aria-hidden="true" />
              Увеличить
            </button>
          </>
        ) : (
          <span className="nominee__art" aria-hidden="true">
            <NomineeArtwork nominee={nominee} categoryId={categoryId} />
          </span>
        )}

        <div className="nominee__overlay">
          <span className="nominee__kicker">
            {kicker}
            <span className="nominee__kicker-sep" aria-hidden="true">
              /
            </span>
            {groupLabel}
          </span>
          <h3 className="nominee__name">{nominee.name}</h3>
          <a
            className="nominee__profile"
            href={ITD_CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={`Канал ИТД ИТП в Telegram`}
          >
            {nominee.handle}
            <ArrowUpRight size={10} aria-hidden="true" />
          </a>
        </div>

        <span className="nominee__number" aria-hidden="true">
          {number}
        </span>
        <span className="nominee__control" aria-hidden="true">
          {selected && <Check size={15} strokeWidth={3} />}
        </span>
      </div>

      <div className="nominee__body">
        <p className="nominee__tagline">{nominee.tagline}</p>
        {nominee.song && (
          <span className="nominee__song">
            <Music2 size={11} aria-hidden="true" />
            Песня: {nominee.song}
          </span>
        )}
        {nominee.audio && <TrackPlayer src={nominee.audio} title={nominee.name} />}
      </div>
    </article>
  )
}
