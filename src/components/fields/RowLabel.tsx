'use client'

import { useRowLabel } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

type RowData = Record<string, unknown>

// Cache the Promise to prevent duplicate fetches for same ID
const fetchCache = new Map<string, Promise<string | null>>()

const fetchTechnologyTitle = (id: number): Promise<string | null> => {
  const cacheKey = `tech-${id}`

  if (!fetchCache.has(cacheKey)) {
    const promise = fetch(`/api/technologies/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((doc) => doc?.title || null)
      .catch(() => null)

    fetchCache.set(cacheKey, promise)
  }

  return fetchCache.get(cacheKey)!
}

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<RowData>()
  const fallback = `Item ${(rowNumber ?? 0) + 1}`
  const [label, setLabel] = useState(fallback)

  useEffect(() => {
    if (!data) return

    // Check direct fields first
    if (typeof data.name === 'string') {
      setLabel(data.name)
      return
    }
    if (typeof data.title === 'string') {
      setLabel(data.title)
      return
    }

    // Check for populated or ID-only relationships
    for (const [key, value] of Object.entries(data)) {
      if (key === 'id') continue

      // Already populated object
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const obj = value as Record<string, unknown>
        if (typeof obj.title === 'string') {
          setLabel(obj.title)
          return
        }
        if (typeof obj.name === 'string') {
          setLabel(obj.name)
          return
        }
      }

      // Just an ID - use cached fetch
      if (typeof value === 'number' && value) {
        fetchTechnologyTitle(value).then((title) => {
          if (title) setLabel(title)
        })
        return
      }
    }
  }, [data, fallback])

  return <span>{label}</span>
}
