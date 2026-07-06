import { Routes, Route, Navigate } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { Home } from './screens/Home'
import { DailyFlow } from './screens/DailyFlow'
import { History } from './screens/History'
import { Dashboard } from './screens/Dashboard'
import { Grace } from './screens/Grace'
import { Resources } from './screens/Resources'

export default function App() {
  return (
    <div className="mx-auto min-h-dvh max-w-[480px] bg-paper">
      <main className="px-5 pb-28 pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flujo" element={<DailyFlow />} />
          <Route path="/historia" element={<History />} />
          <Route path="/progreso" element={<Dashboard />} />
          <Route path="/gracia" element={<Grace />} />
          <Route path="/ayuda" element={<Resources />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
