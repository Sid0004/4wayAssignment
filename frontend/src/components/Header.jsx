export default function Header({ search, setSearch }) {
  return (
    <div style={{ padding: '10px 16px', background: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search companions..."
        style={{ width: '100%', padding: 8, background: '#222', border: '1px solid #444', color: '#fff', borderRadius: 4 }}
      />
    </div>
  )
}
