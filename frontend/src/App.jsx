import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken')
    return token ? { token } : null
  })

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setPage('home')
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { Authorization: `Bearer ${user?.token}` }
      })
    } catch (_) { }
    localStorage.removeItem('accessToken')
    setUser(null)
    setPage('home')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar page={page} setPage={setPage} user={user} onLogout={handleLogout} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header search={search} setSearch={setSearch} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {page === 'home' && <HomePage search={search} setPage={setPage} user={user} />}
          {page === 'login' && <AuthPage mode="login" onSuccess={handleAuthSuccess} setPage={setPage} />}
          {page === 'register' && <AuthPage mode="register" onSuccess={handleAuthSuccess} setPage={setPage} />}
          {page === 'chats' && <p style={{ color: '#888' }}>No chats yet.</p>}
          {page === 'creations' && <p style={{ color: '#888' }}>No creations yet.</p>}
        </div>
      </div>
    </div>
  )
}