import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@components/Button'

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">ページが見つかりません</h2>
      <p className="text-gray-600 mb-8">
        申し訳ありませんが、アクセスしようとしたページが見つかりません。
      </p>
      <Link to="/">
        <Button>ホームに戻る</Button>
      </Link>
    </div>
  )
}
