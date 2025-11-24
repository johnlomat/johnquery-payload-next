'use client'

import { useRowLabel } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { payloadClient } from '@/lib/clients/payload'

type RowData = Record<string, unknown>

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<RowData>()
  const [label, setLabel] = useState<string>(`Item ${(rowNumber ?? 0) + 1}`)

  useEffect(() => {
    const fetchLabel = async () => {
      const result = await getLabel(data)
      if (result) {
        setLabel(result)
      } else {
        setLabel(`Item ${(rowNumber ?? 0) + 1}`)
      }
    }
    fetchLabel()
  }, [data, rowNumber])

  return <span>{label}</span>
}

async function getLabel(data: RowData | undefined): Promise<string | null> {
  if (!data) return null

  // Check for direct name/title fields
  if (typeof data.name === 'string') return data.name
  if (typeof data.title === 'string') return data.title

  // Check for relationship fields
  for (const [key, value] of Object.entries(data)) {
    if (key === 'id') continue

    // If it's a populated object with name/title
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const obj = value as Record<string, unknown>
      if (typeof obj.name === 'string') return obj.name
      if (typeof obj.title === 'string') return obj.title
    }

    // If it's just an ID (number or string), try to fetch the relationship
    if ((typeof value === 'number' || typeof value === 'string') && value) {
      try {
        const { docs } = await payloadClient.find({
          collection: 'technologies',
          where: { id: { equals: value } },
          limit: 1,
        })
        if (docs[0]?.title) return docs[0].title
      } catch {
        // Try media collection if technologies fails
        try {
          const { docs } = await payloadClient.find({
            collection: 'media',
            where: { id: { equals: value } },
            limit: 1,
          })
          if (docs[0]?.filename) return docs[0].filename
        } catch {
          // Ignore fetch errors
        }
      }
    }
  }

  return null
}
