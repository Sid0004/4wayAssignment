import { useEffect, useMemo, useState } from 'react'
import CompanionCard from '../components/CompanionCard'

const PAGE_SIZE = 8

const MOCK_NAMES = [
  'Scarlett Johansson',
  'Karen Miles',
  'Rachel Green',
  'Zara Quinn',
  'Maya Patel',
  'Sofia Roman',
  'Nina Blake',
  'Ava Hart',
  'Lina Cole',
  'Emily Knight',
  'Nora Bell',
  'Jia Moon',
  'Sana Cruz',
  'Iris Stone',
  'Rhea Paige',
  'Luna Frost',
]

const COMPANIONS = MOCK_NAMES.map((name, idx) => ({
  _id: String(idx + 1),
  name,
  description: 'Viking inspired character with custom traits and personality setup.',
  likes: 12000 + idx * 130,
  creatorHandle: '@ramprakash',
  // Put one image in /public, for example /public/companion.jpg
  imageUrl: '/companion.jpg',
}))

export default function HomePage({ search, setPage, user }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [likedMap, setLikedMap] = useState({})

  const filtered = useMemo(() =>
    COMPANIONS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())), [search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  const toggleLike = (id) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div>
      <div style={{ background: '#1a1a2e', padding: 24, borderRadius: 8, marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, marginBottom: 8 }}>Design Your Ideal Companion</h1>
        <p style={{ color: '#aaa', marginBottom: 12 }}>Tailor her look, traits, and past.</p>
        {!user && (
          <button onClick={() => setPage('login')} style={{ background: '#9333ea', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4 }}>
            Sign In
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
        {paginated.map((c) => {
          const isLiked = Boolean(likedMap[c._id])
          const computedLikes = isLiked ? c.likes + 1 : c.likes

          return (
            <CompanionCard
              key={c._id}
              companion={{ ...c, likes: computedLikes }}
              isLiked={isLiked}
              onToggleLike={toggleLike}
            />
          )
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 18 }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{
            border: '1px solid #3a3a3a',
            background: currentPage === 1 ? '#1b1b1b' : '#2a2a2a',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 6,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Prev
        </button>
        <span style={{ color: '#aaa', fontSize: 13 }}>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          style={{
            border: '1px solid #3a3a3a',
            background: currentPage === totalPages ? '#1b1b1b' : '#2a2a2a',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 6,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
