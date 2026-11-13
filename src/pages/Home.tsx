import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MousePointerClick,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { categories, totalNominees } from '../data/categories'
import { EVENT } from '../data/event'
import { useVotes } from '../context/VotesContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { CategoryRow } from '../components/CategoryRow'
import { Countdown } from '../components/Countdown'
import { Reveal } from '../components/Reveal'
import { pluralize } from '../lib/format'

const featuredIds = [
  'king-itd',
  'queen-itd',
  'artist-goda',
  'meme-goda',
  'track-goda',
  'event-goda',
]

const steps = [
  {
    icon: MousePointerClick,
    title: 'Выбери',
    text: 'Открой номинацию и отметь одного номинанта, который запомнился в этом году.',
    tag: '17 категорий',
  },
  {
    icon: CheckCircle2,
    title: 'Сохрани',
    text: 'В каждой номинации — один голос. Выбор можно изменить до 20 декабря.',
    tag: 'один голос',
  },
  {
    icon: Trophy,
    title: 'Дождись',
    text: 'Мы объявим первых победителей на церемонии 27 декабря. Ваш голос уже будет учтён.',
    tag: '27 декабря',
  },
]

export function Home() {
  usePageTitle('ITD AWARDS 2026')
  const { votedCount } = useVotes()
  const featuredCategories = categories.filter((categoryItem) =>
    featuredIds.includes(categoryItem.id),
  )
  const tickerItems = [...categories, ...categories]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grid-bg" aria-hidden="true" />
        <Sparkles className="hero__spark hero__spark--one" size={22} aria-hidden="true" />
        <Sparkles className="hero__spark hero__spark--two" size={15} aria-hidden="true" />
        <Sparkles className="hero__spark hero__spark--three" size={28} aria-hidden="true" />
        <Sparkles className="hero__spark hero__spark--four" size={13} aria-hidden="true" />

        <div className="container hero__inner">
          <div className="hero__meta">
            <span>ПЕРВЫЙ СЕЗОН</span>
            <span className="hero__meta-center">ITD COMMUNITY AWARDS</span>
            <span>{EVENT.edition} / {EVENT.year}</span>
          </div>

          <div className="hero__content">
            <p className="hero__eyebrow">
              <Sparkles size={13} aria-hidden="true" />
              Первая премия сообщества · 2026
              <Sparkles size={13} aria-hidden="true" />
            </p>

            <h1 className="hero-wordmark" aria-label="ITD AWARDS 2026">
              <span className="hero-wordmark__line hero-wordmark__line--itd" aria-hidden="true">
                ITD
              </span>
              <span
                className="hero-wordmark__line hero-wordmark__line--awards"
                aria-hidden="true"
              >
                AWARDS
              </span>
              <span className="hero-wordmark__line hero-wordmark__line--year" aria-hidden="true">
                2026
              </span>
            </h1>

            <p className="hero__lead">
              Голосуй за тех, кто сделал этот год <em>громче</em>.
            </p>

            <div className="hero__actions">
              <Link to="/nominations" className="button button--gold button--lg">
                {votedCount > 0 ? 'Продолжить голосование' : 'Отдать голос'}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/results" className="button button--ghost button--lg">
                Смотреть результаты
              </Link>
            </div>

            <div className="hero__deadline">
              <div className="hero__deadline-label">
                <Clock3 size={18} aria-hidden="true" />
                <span>
                  До закрытия голосования
                  <small>{EVENT.votingEndLabel}</small>
                </span>
              </div>
              <Countdown target={EVENT.votingEndsAt} />
            </div>
          </div>

          <div className="hero__bottom">
            <span>{categories.length} номинаций</span>
            <span className="hero__bottom-center">Церемония · {EVENT.ceremonyLabel}</span>
            <a href="#nominations">
              Выбрать победителей
              <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {tickerItems.map((categoryItem, index) => (
            <span className="ticker__item" key={`${categoryItem.id}-${index}`}>
              {categoryItem.title}
              <Sparkles className="ticker__star" size={11} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <section className="section intro">
        <div className="container intro__grid">
          <Reveal>
            <p className="eyebrow">О премии</p>
            <h2 className="display display--lg">
              Не просто премия.
              <br />
              <em>Точка сборки</em> сообщества.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="intro__copy">
              ITD AWARDS — первая премия сообщества. Здесь мы говорим «спасибо»
              тем, кто наполнял ленту, эфиры и чаты. Побеждают не по количеству
              подписчиков, а по тому, кого действительно помнит сообщество.
            </p>
            <div className="stat-strip">
              <div className="stat">
                <strong>{categories.length}</strong>
                <span>номинаций</span>
              </div>
              <div className="stat">
                <strong>{totalNominees}</strong>
                <span>{pluralize(totalNominees, 'номинант', 'номинанта', 'номинантов')}</span>
              </div>
              <div className="stat">
                <strong>01</strong>
                <span>голос в каждой номинации</span>
              </div>
            </div>
            <Link to="/about" className="link-inline">
              Как устроена премия
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--categories" id="nominations">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Голосование 2026</p>
              <h2 className="display">Выбери своих</h2>
            </div>
            <div className="section-head__side">
              {votedCount > 0 && (
                <span className="progress-note">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {votedCount} из {categories.length} уже выбрано
                </span>
              )}
              <Link to="/nominations" className="link-inline">
                Все {categories.length} номинаций
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <Reveal>
            <div className="category-list">
              {featuredCategories.map((categoryItem) => (
                <CategoryRow category={categoryItem} key={categoryItem.id} />
              ))}
            </div>
          </Reveal>

          <div className="categories-footer">
            <p>
              {votesRemainingMessage(votedCount, categories.length)}
            </p>
            <Link to="/nominations" className="button button--cream">
              Открыть все номинации
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section how">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Всё просто</p>
              <h2 className="display">Три шага до золота</h2>
            </div>
            <p className="section-head__note">
              Без регистрации и сложных форм. Голос сохраняется в вашем браузере.
            </p>
          </div>
          <div className="steps">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={index * 90}>
                  <article className="step">
                    <span className="step__number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="step__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.7} />
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    <span className="step__tag">{step.tag}</span>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--stage">
        <div className="container">
          <Reveal>
            <div className="stage-banner">
              <div className="stage-banner__copy">
                <p className="eyebrow eyebrow--dark">Этап II · Голосование</p>
                <h2>
                  Номинанты собраны. <em>Слово за вами.</em>
                </h2>
                <p>
                  Первый этап завершился 13 ноября: сообщество предложило номинантов и
                  номинации. Теперь в каждой из 17 категорий — один голос за того, кто
                  запомнился больше всех.
                </p>
                <div className="stage-banner__pills">
                  <span className="stage-banner__pill">Приём заявок завершён</span>
                  <span className="stage-banner__pill">Голосование до 20 декабря</span>
                  <span className="stage-banner__pill">Один голос в номинации</span>
                </div>
                <Link to="/nominations" className="button button--dark">
                  Выбрать победителей
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
              <div className="stage-banner__badge" aria-hidden="true">
                <span>01</span>
                <small>голос</small>
                <em>в каждой номинации</em>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section final-section">
        <div className="container">
          <div className="final-cta">
            <Sparkles className="final-cta__spark" size={26} aria-hidden="true" />
            <p className="eyebrow eyebrow--dark">Осталось только выбрать</p>
            <h2>
              Твой голос — это <em>громко</em>.
            </h2>
            <p className="final-cta__copy">
              Голосование открыто до {EVENT.votingEndLabel}. Выбери победителей в
              каждой номинации и забери с собой немного общего праздника.
            </p>
            <div className="final-cta__actions">
              <Link to="/nominations" className="button button--dark button--lg">
                {votedCount > 0 ? 'Продолжить голосование' : 'Отдать голос'}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/about" className="final-cta__link">
                Правила голосования
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <span className="final-cta__ghost" aria-hidden="true">
              2026
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

function votesRemainingMessage(votedCount: number, total: number): string {
  if (votedCount === 0) return 'Начните с любой номинации — прогресс сохранится автоматически.'
  if (votedCount === total) return 'Все голоса собраны. Теперь остаётся дождаться церемонии.'
  return `Вы уже прошли ${votedCount} из ${total}. Продолжите, когда будет минутка.`
}
