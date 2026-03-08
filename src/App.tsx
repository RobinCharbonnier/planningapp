import { useState } from 'react'
import BottomNav from './components/BottomNav'
import Login from './pages/Login'
import Accueil from './pages/Accueil'
import Planning from './pages/Planning'
import Demandes from './pages/Demandes'
import Compte from './pages/Compte'
import Admin from './pages/Admin'
import type { Employee } from './data/mockData'

export type Page = 'accueil' | 'planning' | 'demandes' | 'compte' | 'admin'

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<Employee | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>('accueil')

  function handleLogin(employee: Employee, admin: boolean) {
    setLoggedInUser(employee)
    setIsAdmin(admin)
    setCurrentPage('accueil')
  }

  function handleLogout() {
    setLoggedInUser(null)
    setIsAdmin(false)
    setCurrentPage('accueil')
  }

  if (!loggedInUser) {
    return <Login onLogin={handleLogin} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <Accueil onNavigate={setCurrentPage} currentUser={loggedInUser} />
      case 'planning':
        return <Planning currentUser={loggedInUser} />
      case 'demandes':
        return <Demandes />
      case 'compte':
        return <Compte currentUser={loggedInUser} onLogout={handleLogout} />
      case 'admin':
        return isAdmin ? <Admin /> : null
    }
  }

  return (
    <div className="relative">
      <main key={currentPage} className="page-enter">
        {renderPage()}
      </main>
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} isAdmin={isAdmin} />
    </div>
  )
}
