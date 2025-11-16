import { getPayloadClient } from './payload'

class SkillsService {
  async getAllSkills() {
    try {
      const payload = await getPayloadClient()

      const result = await payload.find({
        collection: 'skills',
      })

      // Manually populate relationships
      const populatedSkills = await Promise.all(
        result.docs.map(async (skill: any) => {
          // Populate technologies -> technology -> image_details
          if (skill.technologies?.length) {
            skill.technologies = await Promise.all(
              skill.technologies.map(async (tech: any) => {
                if (typeof tech.technology === 'number') {
                  try {
                    const technology = await payload.findByID({
                      collection: 'technologies',
                      id: tech.technology,
                    })

                    // Populate image_details inside technology
                    if (typeof technology.image_details === 'number') {
                      try {
                        technology.image_details = await payload.findByID({
                          collection: 'media',
                          id: technology.image_details,
                        })
                      } catch (error) {
                        console.error(
                          `Failed to fetch image_details ${technology.image_details} for technology ${technology.id}:`,
                          error
                        )
                        technology.image_details = null
                      }
                    }

                    tech.technology = technology
                  } catch (error) {
                    console.error(`Failed to fetch technology ${tech.technology}:`, error)
                    tech.technology = null
                  }
                }
                return tech
              })
            )
          }

          return skill
        })
      )

      return { ...result, docs: populatedSkills }
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
