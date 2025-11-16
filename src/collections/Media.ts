import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isLoggedIn'

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['filename', 'width', 'height', 'filesize', 'updatedAt', 'createdAt'],
  },
  upload: true,
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
    },
  ],
}

export default Media
