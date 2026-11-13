import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { categories, getCategory } from '../data/categories'

export type SavedVote = {
  picks: string[]
  savedAt: string
}

type VoteMap = Record<string, SavedVote>

type VotesContextValue = {
  votes: VoteMap
  votedCount: number
  saveVote: (categoryId: string, picks: string[]) => void
  resetVotes: () => void
}

const STORAGE_KEY = 'itd-awards-2026:votes'
const VotesContext = createContext<VotesContextValue | null>(null)

function loadVotes(): VoteMap {
  if (typeof window === 'undefined') return {}

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}

    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}

    const result: VoteMap = {}
    for (const categoryItem of categories) {
      const storedCategory = (parsed as Record<string, unknown>)[categoryItem.id]
      if (!storedCategory || typeof storedCategory !== 'object') continue

      const storedPicks = (storedCategory as { picks?: unknown }).picks
      if (!Array.isArray(storedPicks)) continue

      const validPicks = Array.from(
        new Set(
          storedPicks.filter(
            (pick): pick is string =>
              typeof pick === 'string' &&
              categoryItem.nominees.some((nomineeItem) => nomineeItem.id === pick),
          ),
        ),
      ).slice(0, 1)

      if (validPicks.length === 0) continue

      const storedDate = (storedCategory as { savedAt?: unknown }).savedAt
      result[categoryItem.id] = {
        picks: validPicks,
        savedAt: typeof storedDate === 'string' ? storedDate : new Date().toISOString(),
      }
    }

    return result
  } catch {
    return {}
  }
}

export function VotesProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<VoteMap>(loadVotes)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(votes))
    } catch {
      return
    }
  }, [votes])

  const saveVote = useCallback((categoryId: string, picks: string[]) => {
    const categoryItem = getCategory(categoryId)
    if (!categoryItem) return

    const validPicks = Array.from(
      new Set(
        picks.filter((pick) =>
          categoryItem.nominees.some((nomineeItem) => nomineeItem.id === pick),
        ),
      ),
    ).slice(0, 1)

    if (validPicks.length === 0) return

    setVotes((current) => ({
      ...current,
      [categoryId]: { picks: validPicks, savedAt: new Date().toISOString() },
    }))
  }, [])

  const resetVotes = useCallback(() => {
    setVotes({})
  }, [])

  const value = useMemo(
    () => ({
      votes,
      votedCount: Object.keys(votes).length,
      saveVote,
      resetVotes,
    }),
    [votes, saveVote, resetVotes],
  )

  return <VotesContext.Provider value={value}>{children}</VotesContext.Provider>
}

export function useVotes(): VotesContextValue {
  const context = useContext(VotesContext)
  if (!context) throw new Error('useVotes must be used inside VotesProvider')
  return context
}
