import { payloadClient } from '@/lib/clients/payload'

class UsersService {
  async getUserByEmail(email: string) {
    try {
      const { docs } = await payloadClient.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
        limit: 1,
      })

      return docs[0] || null
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }
}

export const usersService = new UsersService()
