import { getPayloadClient } from '@/lib/payload'

class ProjectsService {
  async getAllProjects(limit = 999) {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'projects',
        limit,
        depth: 2,
      })

      return result
    } catch (error) {
      console.error('Error fetching projects:', error)
      return { docs: [] }
    }
  }

  async getProjectById(id: number | string) {
    try {
      const payload = await getPayloadClient()
      return await payload.findByID({
        collection: 'projects',
        id,
        depth: 2,
      })
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  }
}

export const projectsService = new ProjectsService()
