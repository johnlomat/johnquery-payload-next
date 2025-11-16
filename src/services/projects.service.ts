import { getPayloadClient } from './payload'

class ProjectsService {
  async getAllProjects(limit = 999) {
    try {
      const payload = await getPayloadClient()

      const result = await payload.find({
        collection: 'projects',
        limit,
      })

      // Manually populate relationships
      const populatedProjects = await Promise.all(
        result.docs.map(async (project: any) => {
          // Populate featured_image
          if (typeof project.featured_image === 'number') {
            try {
              project.featured_image = await payload.findByID({
                collection: 'media',
                id: project.featured_image,
              })
            } catch (error) {
              console.error(
                `Failed to fetch featured_image ${project.featured_image} for project ${project.id}:`,
                error
              )
              project.featured_image = null
            }
          }

          // Populate tech_stacks -> technology -> image_details
          if (project.tech_stacks?.length) {
            project.tech_stacks = await Promise.all(
              project.tech_stacks.map(async (techStack: any) => {
                if (typeof techStack.technology === 'number') {
                  try {
                    const tech = await payload.findByID({
                      collection: 'technologies',
                      id: techStack.technology,
                    })

                    // Populate image_details inside technology
                    if (typeof tech.image_details === 'number') {
                      try {
                        tech.image_details = await payload.findByID({
                          collection: 'media',
                          id: tech.image_details,
                        })
                      } catch (error) {
                        console.error(
                          `Failed to fetch image_details ${tech.image_details} for technology ${tech.id}:`,
                          error
                        )
                        tech.image_details = null
                      }
                    }

                    techStack.technology = tech
                  } catch (error) {
                    console.error(
                      `Failed to fetch technology ${techStack.technology}:`,
                      error
                    )
                    techStack.technology = null
                  }
                }
                return techStack
              })
            )
          }

          return project
        })
      )

      return { ...result, docs: populatedProjects }
    } catch (error) {
      console.error('Error fetching projects:', error)
      return { docs: [] }
    }
  }

  async getProjectById(id: string) {
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
