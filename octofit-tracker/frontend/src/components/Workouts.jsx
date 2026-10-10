import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'description', label: 'Description' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'target', label: 'Target' },
  { key: 'exercises', label: 'Exercises' },
]

export default function Workouts() {
  return (
    <CollectionPage
      columns={columns}
      endpoint="/api/workouts/"
      title="Workouts"
    />
  )
}
