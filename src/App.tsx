import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@components/Header'
import { Home } from '@pages/Home'
import { NotFound } from '@pages/NotFound'
import { useAuth } from '@hooks/useAuth'

// 遅延ロード対象
const Leagues = lazy(() => import('@pages/Leagues').then((m) => ({ default: m.Leagues })))
const Profile = lazy(() => import('@pages/Profile').then((m) => ({ default: m.Profile })))

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-2xl text-gray-600">読み込み中...</div>
  </div>
)

export const App: React.FC = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingFallback />
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leagues" element={<Leagues />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}
