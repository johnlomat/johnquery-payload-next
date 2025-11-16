import { getPayloadClient } from './payload'

class UsersService {
  async getUserByEmail(email: string) {
    try {
      const payload = await getPayloadClient()

      const { docs } = await payload.find({
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
