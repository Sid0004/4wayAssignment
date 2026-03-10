import { useState } from 'react'

const API = '/api/v1'

export default function AuthPage({ mode, onSuccess, setPage }) {
  const isLogin = mode === 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = async () => {
    try {
      const url = `${API}/auth/${isLogin ? 'login' : 'register'}`
      const body = isLogin ? { email, password } : { email, password, username, fullName }
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      localStorage.setItem('accessToken', data.data.accessToken)
      onSuccess({ token: data.data.accessToken, ...data.data.user })
    } catch (err) {
      setMsg(err.message)
    }
  }

  const inp = { display: 'block', width: '100%', padding: 8, marginBottom: 10, background: '#222', border: '1px solid #444', color: '#fff', borderRadius: 4 }

  return (
    <div style={{ maxWidth: 340, margin: '80px auto', padding: 24, border: '1px solid #333', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>{isLogin ? 'Login' : 'Register'}</h2>
      {!isLogin && <>
        <input style={inp} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input style={inp} placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
      </>}
      <input style={inp} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input style={inp} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit} style={{ background: '#9333ea', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, width: '100%' }}>
        {isLogin ? 'Login' : 'Register'}
      </button>
      {msg && <p style={{ color: 'red', marginTop: 8, fontSize: 13 }}>{msg}</p>}
      <p style={{ marginTop: 12, fontSize: 13, color: '#888' }}>
        {isLogin ? 'New here? ' : 'Have account? '}
        <span style={{ color: '#9333ea', cursor: 'pointer' }} onClick={() => setPage(isLogin ? 'register' : 'login')}>
          {isLogin ? 'Register' : 'Login'}
        </span>
      </p>
    </div>
  )
}
