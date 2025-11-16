import { getPayload } from 'payload'
import config from '@/payload.config'

// Singleton pattern for Payload instance
let cachedPayload: any = null

export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({ config })
  return cachedPayload
}
