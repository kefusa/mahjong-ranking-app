import { supabase } from './supabaseClient'
import type { League, Event, LeagueStanding } from '@types/index'

/**
 * ユーザーのすべてのリーグを取得
 */
export const getUserLeagues = async (userId: string): Promise<League[]> => {
  const { data, error } = await supabase
    .from('leagues')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * リーグを作成
 */
export const createLeague = async (
  userId: string,
  name: string,
  description?: string
): Promise<League> => {
  const { data, error } = await supabase
    .from('leagues')
    .insert([
      {
        user_id: userId,
        name,
        description,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * リーグの順位表を取得
 */
export const getLeagueStandings = async (
  leagueId: string
): Promise<LeagueStanding[]> => {
  // TODO: SQLクエリでポイント集計
  console.log(`リーグ${leagueId}の順位表を取得`)
  return []
}

/**
 * リーグのイベント一覧を取得
 */
export const getLeagueEvents = async (leagueId: string): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('league_id', leagueId)
    .order('event_date', { ascending: false })

  if (error) throw error
  return data || []
}
