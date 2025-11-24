import { payloadClient } from '@/lib/clients/payload'

class SkillsService {
  async getAllSkills() {
    try {
      return await payloadClient.find({
        collection: 'skills',
        depth: 2,
      })
    } catch (error) {
      console.error('Error fetching skills:', error)
      return { docs: [] }
    }
  }

  async getSkillByTitle(title: string) {
    try {
      const { docs } = await payloadClient.find({
        collection: 'skills',
        where: {
          title: {
            equals: title,
          },
        },
        limit: 1,
        depth: 2,
      })

      return docs[0] || null
    } catch (error) {
      console.error('Error fetching skill:', error)
      return null
    }
  }
}

export const skillsService = new SkillsService()
