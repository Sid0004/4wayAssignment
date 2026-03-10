export default function CompanionCard({ companion, isLiked, onToggleLike }) {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, overflow: 'hidden' }}>
      <img src={companion.imageUrl} alt={companion.name} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
      <div style={{ padding: 8 }}>
        <div style={{ fontWeight: 'bold', fontSize: 13 }}>{companion.name}</div>
        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{companion.description}</div>
        <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{companion.likes} likes · {companion.creatorHandle}</div>
        <button
          onClick={() => onToggleLike(companion._id)}
          style={{
            marginTop: 8,
            width: '100%',
            border: '1px solid #3a3a3a',
            background: isLiked ? '#9333ea' : '#242424',
            color: '#fff',
            borderRadius: 6,
            padding: '6px 8px',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          {isLiked ? 'Liked' : 'Like'}
        </button>
      </div>
    </div>
  )
}
