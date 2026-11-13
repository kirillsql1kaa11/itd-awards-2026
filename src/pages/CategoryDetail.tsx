import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { CSSProperties, RefObject } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Info,
  Lock,
  Pencil,
  Share2,
  X,
} from 'lucide-react'
import type { Category, Nominee } from '../data/categories'
import { categories, getCategory, groupLabels } from '../data/categories'
import { EVENT } from '../data/event'
import { useVotes } from '../context/VotesContext'
import { useToast } from '../context/ToastContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { makeInitials, makeTone, pluralize } from '../lib/format'
import { CategoryIcon } from '../components/CategoryIcon'
import { NotFound } from './NotFound'

export function CategoryDetail() {
  const { categoryId } = useParams()
  const category = getCategory(categoryId)
  usePageTitle(category ? category.title : 'Номинация не найдена')

  if (!category) return <NotFound />

  return <CategoryView category={category} key={category.id} />
}

function CategoryView({ category }: { category: Category }) {
  const { votes, saveVote } = useVotes()
  const { showToast } = useToast()
  const savedPicks = votes[category.id]?.picks ?? []
  const [draft, setDraft] = useState<string[]>(savedPicks)
  const [editing, setEditing] = useState(savedPicks.length === 0)
  const [error, setError] = useState('')
  const firstNomineeRef = useRef<HTMLButtonElement>(null)

  const currentIndex = categories.findIndex((categoryItem) => categoryItem.id === category.id)
  const previousCategory = categories[(currentIndex - 1 + categories.length) % categories.length]
  const nextCategory = categories[(currentIndex + 1) % categories.length]
  const selectedNominees = category.nominees.filter((nomineeItem) =>
    draft.includes(nomineeItem.id),
  )
  const saved = savedPicks.length > 0

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

    saveVote(category.id, draft)
    setEditing(false)
    setError('')
    showToast('Голос сохранён. Спасибо, что выбираете своих.')
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
                  <Info size={14} aria-hidden="true" />
                  {category.nominees.length}{' '}
                  {pluralize(category.nominees.length, 'номинант', 'номинанта', 'номинантов')}
                </span>
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
              {saved && !editing && (
                <div className="saved-strip" role="status">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>Ваш голос сохранён. Спасибо, что выбираете своих.</span>
                  <button type="button" className="saved-strip__button" onClick={handleEdit}>
                    <Pencil size={13} aria-hidden="true" />
                    Изменить
                  </button>
                </div>
              )}
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
                {category.nominees.map((nomineeItem, index) => {
                  const isSelected = draft.includes(nomineeItem.id)
                  return (
                    <NomineeCard
                      key={nomineeItem.id}
                      nominee={nomineeItem}
                      selected={isSelected}
                      editing={editing}
                      index={index}
                      onToggle={() => toggleNominee(nomineeItem.id)}
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
              </div>
              <h2 id="vote-panel-title">
                {saved && !editing ? 'Голос учтён' : 'Сделайте выбор'}
              </h2>

              {saved && !editing && (
                <p className="vote-panel__success" role="status">
                  <Check size={15} aria-hidden="true" />
                  Выбрано: {selectedNominees.length}{' '}
                  {pluralize(selectedNominees.length, 'номинант', 'номинанта', 'номинантов')}
                </p>
              )}

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

              <div className="vote-panel__note">
                <Lock size={14} aria-hidden="true" />
                <p>
                  Демо-режим: голос хранится только в вашем браузере. Его можно изменить
                  до {EVENT.votingEndLabel}.
                </p>
              </div>
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
    </div>
  )
}

type NomineeCardProps = {
  nominee: Nominee
  selected: boolean
  editing: boolean
  index: number
  onToggle: () => void
  buttonRef?: RefObject<HTMLButtonElement | null>
}

function NomineeCard({
  nominee,
  selected,
  editing,
  index,
  onToggle,
  buttonRef,
}: NomineeCardProps) {
  const tone = makeTone(nominee.id)
  const avatarStyle = {
    '--tone': tone,
    '--shift': `${(index % 4) * 12}deg`,
  } as CSSProperties

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`nominee ${selected ? 'is-selected' : ''}`}
      aria-pressed={selected}
      disabled={!editing}
      onClick={onToggle}
    >
      <span className="nominee__avatar" style={avatarStyle} aria-hidden="true">
        <span className="nominee__initials">{makeInitials(nominee.name)}</span>
      </span>
      <span className="nominee__body">
        <span className="nominee__top">
          <span className="nominee__name">{nominee.name}</span>
          <span className="nominee__handle">{nominee.handle}</span>
        </span>
        <span className="nominee__tagline">{nominee.tagline}</span>
      </span>
      <span
        className="nominee__control"
        aria-hidden="true"
      >
        {selected && <Check size={15} strokeWidth={3} />}
      </span>
    </button>
  )
}
