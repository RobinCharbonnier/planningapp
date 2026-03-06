import { useState } from 'react'
import BottomNav from './components/BottomNav'
import Accueil from './pages/Accueil'
import Planning from './pages/Planning'
import Demandes from './pages/Demandes'
import Compte from './pages/Compte'

export type Page = 'accueil' | 'planning' | 'demandes' | 'compte'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil')

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <Accueil onNavigate={setCurrentPage} />
      case 'planning':
        return <Planning />
      case 'demandes':
        return <Demandes />
      case 'compte':
        return <Compte />
    }
  }

  return (
    <div className="relative">
      <main key={currentPage} className="page-enter">
        {renderPage()}
      </main>
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  )
}
