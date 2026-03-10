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
  // Uses image from /public/companion.png
  imageUrl: '/companion.png',
}))

export default function HomePage({ search, setPage, user }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [likedMap, setLikedMap] = useState({})
  const [sortBy, setSortBy] = useState('likes_desc')
  const [filterBy, setFilterBy] = useState('all')

  const filtered = useMemo(() => {
    const searched = COMPANIONS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

    const afterFilter = filterBy === 'liked'
      ? searched.filter((c) => Boolean(likedMap[c._id]))
      : searched

    const sorted = [...afterFilter].sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name)
      if (sortBy === 'likes_asc') return a.likes - b.likes
      return b.likes - a.likes
    })

    return sorted
  }, [search, filterBy, sortBy, likedMap])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  useEffect(() => {
    setCurrentPage(1)
  }, [search, sortBy, filterBy])

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

      <div style={{ display: 'flex', gap: 10, marginTop: 14, marginBottom: 6, flexWrap: 'wrap' }}>
        <label style={{ color: '#aaa', fontSize: 13 }}>
          Sort:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ marginLeft: 6, background: '#222', color: '#fff', border: '1px solid #444', borderRadius: 4, padding: '4px 6px' }}
          >
            <option value="likes_desc">Likes high to low</option>
            <option value="likes_asc">Likes low to high</option>
            <option value="name_asc">Name A to Z</option>
            <option value="name_desc">Name Z to A</option>
          </select>
        </label>

        <label style={{ color: '#aaa', fontSize: 13 }}>
          Filter:
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            style={{ marginLeft: 6, background: '#222', color: '#fff', border: '1px solid #444', borderRadius: 4, padding: '4px 6px' }}
          >
            <option value="all">All</option>
            <option value="liked">Liked only</option>
          </select>
        </label>
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
