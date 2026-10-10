import { fetchCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'motto', label: 'Motto' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return (
    <CollectionPage
      columns={columns}
      endpoint="/api/teams/"
      fetch={fetchCollection}
      title="Teams"
    />
  )
}
