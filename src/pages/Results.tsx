import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Info, Pencil, Trophy } from 'lucide-react'
import type { Category, CategoryGroup, Nominee } from '../data/categories'
import { categories, groupLabels, totalNominees } from '../data/categories'
import { PageHero } from '../components/PageHero'
import { CategoryIcon } from '../components/CategoryIcon'
import { useVotes } from '../context/VotesContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { formatNumber, pluralize } from '../lib/format'

type GroupFilter = 'all' | CategoryGroup

const filterOrder: GroupFilter[] = ['all', 'people', 'content', 'community']

export function Results() {
  usePageTitle('Результаты')
  const { votes } = useVotes()
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('all')

  const totalVotes = useMemo(
    () =>
      categories.reduce(
        (categoryTotal, categoryItem) =>
          categoryTotal +
          categoryItem.nominees.reduce((sum, nomineeItem) => sum + nomineeItem.votes, 0),
        0,
      ),
    [],
  )

  const counts = useMemo(
    () => ({
      all: categories.length,
      people: categories.filter((categoryItem) => categoryItem.group === 'people').length,
      content: categories.filter((categoryItem) => categoryItem.group === 'content').length,
      community: categories.filter((categoryItem) => categoryItem.group === 'community').length,
    }),
    [],
  )

  const filteredCategories =
    groupFilter === 'all'
      ? categories
      : categories.filter((categoryItem) => categoryItem.group === groupFilter)

  return (
    <div className="results-page">
      <PageHero
        eyebrow="Демо-табло · 2026"
        title={
          <>
            Промежуточные
            <br />
            <em>результаты.</em>
          </>
        }
        description="Топ-3 в каждой номинации по версии демонстрационной выборки. Ваш сохранённый голос отмечен золотой галочкой — его можно изменить в любой момент."
        ghost="2026"
        aside={
          <div className="live-card">
            <span className="live-card__status">
              <span className="status-dot" aria-hidden="true" />
              Демо-табло
            </span>
            <strong>{formatNumber(totalVotes)}</strong>
            <span className="live-card__label">
              {pluralize(totalVotes, 'голос', 'голоса', 'голосов')} в выборке
            </span>
            <div className="live-card__line">
              <span>Участников</span>
              <strong>{totalNominees}</strong>
            </div>
            <div className="live-card__line">
              <span>Номинаций</span>
              <strong>{categories.length}</strong>
            </div>
          </div>
        }
      />

      <section className="section results-section">
        <div className="container">
          <div className="demo-note">
            <Info size={17} aria-hidden="true" />
            <p>
              <strong>Это фронтенд-прототип.</strong> Цифры и номинанты вымышлены для
              демонстрации интерфейса. Ваши голоса хранятся локально и не отправляются на
              сервер.
            </p>
          </div>

          <div className="results-toolbar">
            <div className="filter-group" role="group" aria-label="Фильтр по группам номинаций">
              {filterOrder.map((filterKey) => (
                <button
                  type="button"
                  key={filterKey}
                  className={`chip ${groupFilter === filterKey ? 'is-active' : ''}`}
                  aria-pressed={groupFilter === filterKey}
                  onClick={() => setGroupFilter(filterKey)}
                >
                  {filterKey === 'all' ? 'Все' : groupLabels[filterKey]}
                  <span className="chip__count">{counts[filterKey]}</span>
                </button>
              ))}
            </div>
            <span className="results-toolbar__meta">
              <Trophy size={15} aria-hidden="true" />
              Показано {filteredCategories.length} из {categories.length} номинаций
            </span>
          </div>

          <div className="results-grid">
            {filteredCategories.map((categoryItem) => (
              <CategoryResult
                key={categoryItem.id}
                category={categoryItem}
                picks={votes[categoryItem.id]?.picks ?? []}
              />
            ))}
          </div>

          <div className="results-cta">
            <div>
              <p className="eyebrow">Ещё не поздно</p>
              <h2>Ваш голос может всё изменить.</h2>
              <p>
                До церемонии ещё есть время. Выберите своих в оставшихся номинациях или
                пересмотрите уже сохранённые голоса.
              </p>
            </div>
            <div className="results-cta__actions">
              <Link to="/nominations" className="button button--gold">
                Голосовать
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/my-votes" className="button button--ghost">
                Мой голос
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CategoryResult({ category, picks }: { category: Category; picks: string[] }) {
  const sortedNominees = useMemo(
    () => [...category.nominees].sort((first, second) => second.votes - first.votes),
    [category.nominees],
  )
  const totalVotes = sortedNominees.reduce((sum, nomineeItem) => sum + nomineeItem.votes, 0)
  const topNominees = sortedNominees.slice(0, 3)
  const selectedOutsideTop = sortedNominees
    .slice(3)
    .filter((nomineeItem) => picks.includes(nomineeItem.id))
  const hasVote = picks.length > 0

  return (
    <article className="result-card">
      <div className="result-card__head">
        <span className="result-card__icon" aria-hidden="true">
          <CategoryIcon id={category.id} size={22} />
        </span>
        <div className="result-card__title-wrap">
          <h2>
            <Link to={`/nominations/${category.id}`}>{category.title}</Link>
          </h2>
          <p>
            {formatNumber(totalVotes)} {pluralize(totalVotes, 'голос', 'голоса', 'голосов')} · один голос
          </p>
        </div>
        <Link
          to={`/nominations/${category.id}`}
          className="result-card__edit"
          aria-label={`Перейти к номинации ${category.title}`}
        >
          {hasVote ? <Pencil size={14} aria-hidden="true" /> : <ArrowUpRight size={15} aria-hidden="true" />}
          <span>{hasVote ? 'Изменить' : 'Голосовать'}</span>
        </Link>
      </div>

      <ol className="result-list">
        {topNominees.map((nomineeItem, index) => (
          <ResultRow
            key={nomineeItem.id}
            nominee={nomineeItem}
            rank={index + 1}
            totalVotes={totalVotes}
            picked={picks.includes(nomineeItem.id)}
          />
        ))}
        {selectedOutsideTop.map((nomineeItem) => (
          <ResultRow
            key={nomineeItem.id}
            nominee={nomineeItem}
            rank={sortedNominees.findIndex((item) => item.id === nomineeItem.id) + 1}
            totalVotes={totalVotes}
            picked
            extra
          />
        ))}
      </ol>

      <div className="result-card__foot">
        {hasVote ? (
          <span className="result-card__voted">
            <Check size={13} strokeWidth={3} aria-hidden="true" />
            Ваш голос учтён
          </span>
        ) : (
          <span className="result-card__not-voted">Голос пока не отдан</span>
        )}
        <span>{pluralize(category.nominees.length, 'номинант', 'номинанта', 'номинантов')}</span>
      </div>
    </article>
  )
}

type ResultRowProps = {
  nominee: Nominee
  rank: number
  totalVotes: number
  picked: boolean
  extra?: boolean
}

function ResultRow({ nominee, rank, totalVotes, picked, extra = false }: ResultRowProps) {
  const percent = Math.round((nominee.votes / Math.max(totalVotes, 1)) * 100)

  return (
    <li className={`result-row ${picked ? 'is-picked' : ''} ${extra ? 'is-extra' : ''}`}>
      <span className={`result-row__rank result-row__rank--${rank}`} aria-hidden="true">
        {rank}
      </span>
      <div className="result-row__main">
        <div className="result-row__label">
          <span className="result-row__name">
            {nominee.name}
            {picked && (
              <span className="result-row__pick">
                <Check size={11} strokeWidth={3} aria-hidden="true" />
                ваш голос
              </span>
            )}
          </span>
          <span className="result-row__percent">{percent}%</span>
        </div>
        <div
          className="result-bar"
          role="progressbar"
          aria-label={`${nominee.name}: ${percent}%`}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${Math.max(percent, 3)}%` }} />
        </div>
      </div>
    </li>
  )
}
