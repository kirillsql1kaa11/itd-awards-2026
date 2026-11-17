import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  ImageDown,
  Pencil,
  RotateCcw,
  Vote,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { CategoryIcon } from '../components/CategoryIcon'
import { NomineeArtwork } from '../components/NomineeArtwork'
import { categories, groupLabels } from '../data/categories'
import { useVotes } from '../context/VotesContext'
import { useToast } from '../context/ToastContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { createVotesPoster } from '../lib/votesPoster'

export function MyVotes() {
  usePageTitle('Мой голос')
  const { votes, resetVotes } = useVotes()
  const { showToast } = useToast()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [copying, setCopying] = useState(false)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const savedCategories = categories.filter((categoryItem) => votes[categoryItem.id])

  const downloadPoster = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'itd-awards-2026-moy-golos.png'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const copyPoster = async () => {
    if (savedCategories.length === 0 || copying) return
    setCopying(true)

    try {
      const blob = await createVotesPoster(votes)
      const canCopyImage =
        typeof ClipboardItem !== 'undefined' &&
        Boolean(navigator.clipboard?.write)

      if (canCopyImage) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
          showToast('Картинка с голосами скопирована. Можно вставлять в пост.')
        } catch {
          downloadPoster(blob)
          showToast('PNG с голосами скачан — прикрепите его к посту.', 'info')
        }
      } else {
        downloadPoster(blob)
        showToast('PNG с голосами скачан — прикрепите его к посту.', 'info')
      }
    } catch {
      showToast('Не удалось собрать картинку. Попробуйте ещё раз.', 'error')
    } finally {
      setCopying(false)
    }
  }

  const requestReset = () => {
    setConfirmOpen(true)
    window.setTimeout(() => cancelButtonRef.current?.focus(), 0)
  }

  const confirmReset = () => {
    resetVotes()
    setConfirmOpen(false)
    showToast('Все голоса сброшены. Можно начать заново.', 'info')
  }

  return (
    <div className="my-votes-page">
      <PageHero
        eyebrow="Личный прогресс"
        title={
          <>
            Мой <em>голос.</em>
          </>
        }
        description="Здесь собрано всё, что вы уже выбрали. Голос можно изменить до конца голосования — выбор сохраняется в этом браузере."
        ghost="2026"
      />

      <section className="section my-votes-section">
        <div className="container">
          {savedCategories.length > 0 ? (
            <>
              <div className="my-votes-head">
                <div>
                  <p className="eyebrow">Ваши выборы</p>
                  <h2 className="display">Уже в списке</h2>
                </div>
                <div className="my-votes-head__side">
                  <button
                    type="button"
                    className="button button--gold button--sm"
                    onClick={copyPoster}
                    disabled={copying}
                  >
                    <ImageDown size={15} aria-hidden="true" />
                    {copying ? 'Собираю картинку…' : 'Скопировать картинкой'}
                  </button>
                  <span className="my-votes-head__deadline">
                    Все {categories.length} номинаций — в одном PNG для поста
                  </span>
                </div>
              </div>

              <div className="votes-grid">
                {savedCategories.map((categoryItem) => {
                  const picks = categoryItem.nominees.filter((nomineeItem) =>
                    votes[categoryItem.id]?.picks.includes(nomineeItem.id),
                  )
                  return (
                    <article className="vote-card" key={categoryItem.id}>
                      <div className="vote-card__head">
                        <span className="vote-card__icon" aria-hidden="true">
                          <CategoryIcon id={categoryItem.id} size={24} />
                        </span>
                        <div className="vote-card__title">
                          <span>{groupLabels[categoryItem.group]}</span>
                          <h2>
                            <Link to={`/nominations/${categoryItem.id}`}>
                              {categoryItem.title}
                            </Link>
                          </h2>
                        </div>
                        <span className="vote-card__check" aria-hidden="true">
                          <Check size={17} strokeWidth={3} />
                        </span>
                      </div>

                      <ul className="vote-card__picks">
                        {picks.map((nomineeItem) => (
                          <li key={nomineeItem.id}>
                            <span className="vote-card__pick-art" aria-hidden="true">
                              <NomineeArtwork
                                nominee={nomineeItem}
                                categoryId={categoryItem.id}
                              />
                            </span>
                            <span className="vote-card__pick-check" aria-hidden="true">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span>
                              <strong>{nomineeItem.name}</strong>
                              <small>{nomineeItem.handle}</small>
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="vote-card__foot">
                        <span>Голос учтён</span>
                        <Link to={`/nominations/${categoryItem.id}`} className="vote-card__edit">
                          Изменить
                          <Pencil size={13} aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className="my-votes-actions">
                <Link to="/nominations" className="button button--ghost">
                  Продолжить голосование
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <button type="button" className="text-button text-button--danger" onClick={requestReset}>
                  <RotateCcw size={14} aria-hidden="true" />
                  Сбросить все голоса
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state empty-state--large">
              <span className="empty-state__icon" aria-hidden="true">
                <Vote size={30} />
              </span>
              <p className="eyebrow">Пока пусто</p>
              <h2>Голос ещё не отдан</h2>
              <p>
                Выберите хотя бы одну номинацию — и здесь появится ваш личный список
                победителей. Начать можно с любой категории.
              </p>
              <div className="empty-state__actions">
                <Link to="/nominations" className="button button--gold">
                  Выбрать номинантов
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link to="/questions" className="button button--ghost">
                  Как это работает
                </Link>
              </div>
            </div>
          )}

          {confirmOpen && savedCategories.length > 0 && (
            <div
              className="reset-confirm"
              role="alertdialog"
              aria-labelledby="reset-title"
              aria-describedby="reset-description"
            >
              <span className="reset-confirm__icon" aria-hidden="true">
                <AlertTriangle size={22} />
              </span>
              <div className="reset-confirm__body">
                <h2 id="reset-title">Сбросить все голоса?</h2>
                <p id="reset-description">
                  Все сохранённые выборы в {categories.length} номинациях будут удалены из
                  этого браузера. Отменить действие не получится.
                </p>
              </div>
              <div className="reset-confirm__actions">
                <button
                  type="button"
                  className="button button--ghost button--sm"
                  onClick={() => setConfirmOpen(false)}
                  ref={cancelButtonRef}
                >
                  Отмена
                </button>
                <button type="button" className="button button--danger button--sm" onClick={confirmReset}>
                  Да, сбросить
                </button>
              </div>
            </div>
          )}

          <div className="my-votes-note">
            <p>
              Голоса хранятся локально в вашем браузере. Это демо-проект без сервера:
              данные никуда не отправляются и не привязаны к аккаунту.
            </p>
            <Link to="/questions#faq" className="link-inline">
              Вопросы и ответы
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
