import { getPayloadClient } from '@/lib/payload'

class SkillsService {
  async getAllSkills() {
    try {
      const payload = await getPayloadClient()
      return await payload.find({
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
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
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
