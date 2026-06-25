import { create } from 'zustand'
import type { League, Event, LeagueStanding } from '@types/index'

interface LeagueStore {
  leagues: League[]
  currentLeague: League | null
  standings: LeagueStanding[]
  events: Event[]

  setLeagues: (leagues: League[]) => void
  setCurrentLeague: (league: League | null) => void
  setStandings: (standings: LeagueStanding[]) => void
  setEvents: (events: Event[]) => void
  addLeague: (league: League) => void
  addEvent: (event: Event) => void
}

export const useLeagueStore = create<LeagueStore>((set) => (({
  leagues: [],
  currentLeague: null,
  standings: [],
  events: [],

  setLeagues: (leagues) => set({ leagues }),
  setCurrentLeague: (currentLeague) => set({ currentLeague }),
  setStandings: (standings) => set({ standings }),
  setEvents: (events) => set({ events }),
  addLeague: (league) =>
    set((state) => (({
      leagues: [...state.leagues, league],
    }))),
  addEvent: (event) =>
    set((state) => (({
      events: [...state.events, event],
    }))),
})))
