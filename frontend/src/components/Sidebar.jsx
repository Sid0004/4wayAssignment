import { useState } from 'react'

export default function Sidebar({ page, setPage, user, onLogout }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const btn = (label, target) => (
    <button onClick={() => setPage(target)}
      title={label}
      style={{
        display: 'block',
        width: '100%',
        textAlign: isCollapsed ? 'center' : 'left',
        padding: '8px 10px',
        background: page === target ? '#2a2a2a' : 'none',
        border: 'none',
        color: '#ccc',
        borderRadius: 4,
        marginBottom: 2,
        cursor: 'pointer'
      }}>
      {isCollapsed ? label[0] : label}
    </button>
  )

  return (
    <aside style={{ width: isCollapsed ? 64 : 170, background: '#1a1a1a', padding: 12, borderRight: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column', flexShrink: 0, transition: 'width 0.2s ease' }}>
      <button
        onClick={() => setIsCollapsed((v) => !v)}
        style={{ background: '#252525', border: '1px solid #333', color: '#ddd', borderRadius: 4, padding: '6px 8px', marginBottom: 12, cursor: 'pointer' }}
      >
        {isCollapsed ? '>' : '<'}
      </button>
      {!isCollapsed && <div style={{ fontWeight: 'bold', color: '#9333ea', marginBottom: 16 }}>FamousGPT.ai</div>}
      {btn('Home', 'home')}
      {btn('All Chats', 'chats')}
      {btn('My Creations', 'creations')}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #333', paddingTop: 10 }}>
        {user
          ? <button onClick={onLogout} title="Logout" style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: 13, width: '100%', textAlign: isCollapsed ? 'center' : 'left' }}>{isCollapsed ? 'L' : 'Logout'}</button>
          : btn('Sign In', 'login')
        }
      </div>
    </aside>
  )
}
