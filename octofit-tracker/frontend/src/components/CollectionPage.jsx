import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.length ? value.map(displayValue).join(', ') : '—'
  }

  if (typeof value === 'object') {
    for (const key of ['displayName', 'username', 'name', 'title', '_id']) {
      if (value[key] !== undefined) {
        return displayValue(value[key])
      }
    }
    return '[Details unavailable]'
  }

  return String(value)
}

export default function CollectionPage({ columns, endpoint, title }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      try {
        setRecords(await fetchCollection(endpoint, controller.signal))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section aria-labelledby="collection-title">
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-4">
        <div>
          <p className="eyebrow mb-1">OctoFit Tracker</p>
          <h1 className="h2 mb-0" id="collection-title">
            {title}
          </h1>
        </div>
        {!loading && !error && (
          <span className="badge rounded-pill text-bg-light">
            {records.length} {records.length === 1 ? 'record' : 'records'}
          </span>
        )}
      </div>

      {loading && (
        <div
          className="d-flex align-items-center gap-2 text-secondary"
          role="status"
        >
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading {title.toLowerCase()}…
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Could not load {title.toLowerCase()}.</strong> {error}
        </div>
      )}

      {!loading && !error && records.length === 0 && (
        <div className="empty-state text-secondary">
          No {title.toLowerCase()} to show yet.
        </div>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="table-responsive data-table-wrap">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map(({ label }) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || record.id || `${endpoint}-${index}`}>
                  {columns.map(({ key, render }) => (
                    <td key={key}>
                      {render
                        ? render(record[key], record)
                        : displayValue(record[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
