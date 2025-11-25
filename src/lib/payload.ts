import { getPayload, Payload } from 'payload'
import config from '@payload-config'

let cached: Payload | null = null

export const getPayloadClient = async (): Promise<Payload> => {
  if (cached) {
    return cached
  }

  cached = await getPayload({ config })
  return cached
}
