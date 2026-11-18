import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Ticket = {
  number: string
  issuedAt: string
}

type TicketContextValue = {
  ticket: Ticket | null
  activateTicket: (number: string) => Ticket
}

const STORAGE_KEY = 'itd-awards-2026:ticket'
const TicketContext = createContext<TicketContextValue | null>(null)

function loadTicket(): Ticket | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null

    const number = (parsed as { number?: unknown }).number
    const issuedAt = (parsed as { issuedAt?: unknown }).issuedAt

    if (typeof number !== 'string' || number.trim().length < 3) return null

    return {
      number,
      issuedAt: typeof issuedAt === 'string' ? issuedAt : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function TicketProvider({ children }: { children: ReactNode }) {
  const [ticket, setTicket] = useState<Ticket | null>(loadTicket)

  useEffect(() => {
    try {
      if (ticket) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ticket))
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      return
    }
  }, [ticket])

  const activateTicket = useCallback((number: string) => {
    const next: Ticket = {
      number: number.trim().toUpperCase(),
      issuedAt: new Date().toISOString(),
    }
    setTicket(next)
    return next
  }, [])

  const value = useMemo(() => ({ ticket, activateTicket }), [ticket, activateTicket])

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export function useTicket(): TicketContextValue {
  const context = useContext(TicketContext)
  if (!context) throw new Error('useTicket must be used inside TicketProvider')
  return context
}
