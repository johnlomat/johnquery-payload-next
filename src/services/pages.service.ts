import { getPayloadClient } from '@/lib/payload'

class PagesService {
  async getPageBySlug(slug: string) {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: slug,
          },
          _status: {
            equals: 'published',
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
      const payload = await getPayloadClient()
      return await payload.find({
        collection: 'pages',
        where: {
          _status: {
            equals: 'published',
          },
        },
      })
    } catch (error) {
      console.error('Error fetching pages:', error)
      return { docs: [] }
    }
  }
}

export const pagesService = new PagesService()
