import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'displayName', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

export default function Users() {
  return (
    <CollectionPage columns={columns} endpoint="/api/users/" title="Members" />
  )
}
