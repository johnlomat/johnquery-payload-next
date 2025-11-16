import { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { isLoggedIn } from '../access/isLoggedIn'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt', 'createdAt'],
  },
  access: {
    read: () => true,
    update: isLoggedIn,
    create: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        className: 'label-font-large',
      },
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      editor: lexicalEditor(),
      admin: {
        className: 'label-font-large',
      },
    },
    slugField(),
  ],
}

export default Pages
