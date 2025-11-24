import { payloadClient } from '@/lib/clients/payload'

class PagesService {
  async getPageBySlug(slug: string) {
    try {
      const { docs } = await payloadClient.find({
        collection: 'pages',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })

      return docs[0] || null
    } catch (error) {
      console.error('Error fetching page:', error)
      return null
    }
  }

  async getAllPages() {
    try {
      return await payloadClient.find({
        collection: 'pages',
      })
    } catch (error) {
      console.error('Error fetching pages:', error)
      return { docs: [] }
    }
  }
}

export const pagesService = new PagesService()
