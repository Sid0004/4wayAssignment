export default function Sidebar({ page, setPage, user, onLogout }) {
  const btn = (label, target) => (
    <button onClick={() => setPage(target)}
      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px', background: page === target ? '#2a2a2a' : 'none', border: 'none', color: '#ccc', borderRadius: 4, marginBottom: 2, cursor: 'pointer' }}>
      {label}
    </button>
  )
  return (
    <aside style={{ width: 170, background: '#1a1a1a', padding: 12, borderRight: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ fontWeight: 'bold', color: '#9333ea', marginBottom: 16 }}>FamousGPT.ai</div>
      {btn('Home', 'home')}
      {btn('All Chats', 'chats')}
      {btn('My Creations', 'creations')}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #333', paddingTop: 10 }}>
        {user
          ? <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: 13 }}>Logout</button>
          : btn('Sign In', 'login')
        }
      </div>
    </aside>
  )
}
