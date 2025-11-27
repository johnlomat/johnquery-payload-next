import { CollectionConfig } from 'payload'
import { isLoggedIn } from '../../access/isLoggedIn'

const ContactFormSubmissions: CollectionConfig = {
  slug: 'contact-form-submissions',
  labels: {
    singular: 'Contact Form Submission',
    plural: 'Contact Form Submissions',
  },
  admin: {
    group: 'Forms',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    read: isLoggedIn,
    create: () => true, // Allow public submissions
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
  ],
}

export default ContactFormSubmissions
