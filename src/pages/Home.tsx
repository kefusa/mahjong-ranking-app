import React from 'react'
import { Card } from '@components/Card'
import { Button } from '@components/Button'

export const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">麻雀順位表アプリ</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-2xl font-bold mb-4">📊 リーグ管理</h2>
          <p className="text-gray-600 mb-4">複数のリーグを簡単に管理</p>
          <Button fullWidth>リーグを作成</Button>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-4">👥 プレイヤー管理</h2>
          <p className="text-gray-600 mb-4">プレイヤーの成績を記録</p>
          <Button fullWidth>プレイヤーを追加</Button>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">🎯 最近のリーグ</h2>
        <p className="text-gray-600">リーグを選択して順位表を表示</p>
      </Card>
    </div>
  )
}
