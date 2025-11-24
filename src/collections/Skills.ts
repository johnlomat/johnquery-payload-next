import { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isLoggedIn'

const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt', 'createdAt'],
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
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
      name: 'technologies',
      label: 'Technologies',
      type: 'array',
      labels: {
        singular: 'Technology',
        plural: 'Technologies',
      },
      fields: [
        {
          name: 'technology',
          label: 'Technology',
          type: 'relationship',
          relationTo: 'technologies',
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/fields/RowLabel#RowLabel',
        },
      },
    },
  ],
}

export default Skills
