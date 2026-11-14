import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Category } from '../data/categories'
import { groupLabels } from '../data/categories'
import { useVotes } from '../context/VotesContext'
import { CategoryIcon } from './CategoryIcon'

export function CategoryRow({ category }: { category: Category }) {
  const { votes } = useVotes()
  const picks = votes[category.id]?.picks ?? []
  const selectedNominee = category.nominees.find((nomineeItem) =>
    picks.includes(nomineeItem.id),
  )
  const isVoted = Boolean(selectedNominee)

  return (
    <Link
      to={`/nominations/${category.id}`}
      className={`category-row ${isVoted ? 'is-voted' : ''}`}
      aria-label={`${category.title}. ${groupLabels[category.group]}. ${
        selectedNominee ? `Ваш выбор: ${selectedNominee.name}.` : 'Голос пока не отдан.'
      }`}
    >
      <span className="category-row__icon" aria-hidden="true">
        <CategoryIcon id={category.id} size={26} />
      </span>
      <span className="category-row__body">
        <span className="category-row__title">{category.title}</span>
        <span className="category-row__meta">
          <span>{groupLabels[category.group]}</span>
          <span className="category-row__dot" aria-hidden="true" />
          {selectedNominee ? (
            <span className="category-row__pick">Ваш выбор: {selectedNominee.name}</span>
          ) : (
            <span>Один голос</span>
          )}
        </span>
      </span>
      <span className="category-row__status" aria-hidden="true">
        {isVoted ? (
          <span className="category-row__check">
            <Check size={19} strokeWidth={3} />
          </span>
        ) : (
          <span className="category-row__action">
            <ArrowUpRight size={18} strokeWidth={2} />
          </span>
        )}
      </span>
    </Link>
  )
}
