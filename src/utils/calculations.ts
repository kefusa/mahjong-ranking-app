/**
 * ポイント計算ユーティリティ
 */

export interface CalculationParams {
  rank: number
  startingPoints: number
  returnPoints: number
  uma: [number, number]
  oka?: number
}

/**
 * 順位からポイントを計算（B方式）
 */
export const calculatePointsFromRank = ({
  rank,
  startingPoints,
  returnPoints,
  uma,
  oka = 0,
}: CalculationParams): number => {
  const pointDifference = startingPoints - returnPoints
  let rankPoints = 0

  switch (rank) {
    case 1:
      rankPoints = uma[0]
      break
    case 2:
      rankPoints = uma[1]
      break
    case 3:
      rankPoints = -uma[1]
      break
    case 4:
      rankPoints = -uma[0]
      break
  }

  return pointDifference + rankPoints + oka
}

/**
 * 複数のプレイヤーのポイント合計
 */
export const calculateTotalPoints = (points: number[]): number => {
  return points.reduce((sum, p) => sum + p, 0)
}

/**
 * 順位を決定（ポイントが高い順）
 */
export const determineRanking = (
  playerPoints: { playerId: string; points: number }[]
): Array<{ playerId: string; points: number; rank: number }> => {
  return playerPoints
    .sort((a, b) => b.points - a.points)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }))
}
