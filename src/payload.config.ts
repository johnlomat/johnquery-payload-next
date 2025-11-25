import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { v2 as cloudinary } from 'cloudinary'

import Users from './collections/Users'
import Media from './collections/Media'
import Pages from './collections/Pages'
import Projects from './collections/Projects'
import Skills from './collections/Skills'
import Technologies from './collections/Technologies'
import { cloudinaryAdapter } from './cloudinary-adapter'
import KeywordsField from './fields/payload-seo-plugin/keywords-field'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Configure Cloudinary globally
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Projects, Skills, Technologies],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      max: 3,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: any }) =>
        `${doc?.title?.value || doc?.title || 'Page'} - John Lomat`,
      fields: ({ defaultFields }) => [...defaultFields, KeywordsField],
    }),
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter({
            folder: process.env.CLOUDINARY_FOLDER || 'portfolio',
          }),
          disableLocalStorage: true,
          generateFileURL: ({ filename }) => {
            const folder = process.env.CLOUDINARY_FOLDER || 'portfolio'
            // Remove extension and prepend folder
            const publicId = `${folder}/${filename.replace(/\.[^/.]+$/, '')}`
            return cloudinary.url(publicId, { secure: true })
          },
        },
      },
    }),
  ],
})
