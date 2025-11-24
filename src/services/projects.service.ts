import { payloadClient } from '@/lib/clients/payload'

class ProjectsService {
  async getAllProjects(limit = 999) {
    try {
      const result = await payloadClient.find({
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
      return await payloadClient.findByID({
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
