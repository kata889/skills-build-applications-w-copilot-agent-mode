import { fetchCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    key: 'rank',
    label: 'Rank',
    render: (rank) => (rank ? `#${rank}` : '—'),
  },
  { key: 'user', label: 'Member' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
]

export default function Leaderboard() {
  return (
    <CollectionPage
      columns={columns}
      endpoint="/api/leaderboard/"
      fetch={fetchCollection}
      title="Leaderboard"
    />
  )
}
