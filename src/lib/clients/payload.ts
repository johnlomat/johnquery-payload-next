import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '@/payload-types'

const baseURL =
  typeof window === 'undefined'
    ? `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api`
    : '/api'

export const payloadClient = new PayloadSDK<Config>({
  baseURL,
  baseInit: {
    credentials: 'include',
  },
})
