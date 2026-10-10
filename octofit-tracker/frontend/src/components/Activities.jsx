import { fetchCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'activityType', label: 'Activity' },
  { key: 'user', label: 'Member' },
  { key: 'team', label: 'Team' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'caloriesBurned', label: 'Calories' },
  { key: 'completedAt', label: 'Completed' },
]

export default function Activities() {
  return (
    <CollectionPage
      columns={columns}
      endpoint="/api/activities/"
      fetch={fetchCollection}
      title="Activities"
    />
  )
}
