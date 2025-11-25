import type {
  Adapter,
  HandleUpload,
  HandleDelete,
  StaticHandler,
} from '@payloadcms/plugin-cloud-storage/types'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

interface CloudinaryAdapterArgs {
  folder?: string
}

export const cloudinaryAdapter = ({
  folder = 'portfolio',
}: CloudinaryAdapterArgs): Adapter => {
  return () => {
    const handleUpload: HandleUpload = async ({ file }) => {
      try {
        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'auto',
              folder,
              public_id: file.filename.replace(/\.[^/.]+$/, ''),
              overwrite: false,
              unique_filename: true,
            },
            (error, result) => {
              if (error) return reject(error)
              if (!result) return reject(new Error('No result returned from Cloudinary'))
              resolve(result)
            },
          )
          uploadStream.end(file.buffer)
        })

        file.filename = `${uploadResult.public_id}.${uploadResult.format}`
        file.mimeType = `${uploadResult.resource_type}/${uploadResult.format}`
        file.filesize = uploadResult.bytes
      } catch (err) {
        console.error('Upload Error', err)
        throw err
      }
    }

    const handleDelete: HandleDelete = async ({ filename }) => {
      try {
        // filename is stored as "folder/name.ext", construct public_id
        const publicId = `${folder}/${filename.replace(/\.[^/.]+$/, '')}`
        await cloudinary.uploader.destroy(publicId)
      } catch (error) {
        console.error('Cloudinary Delete Error:', error)
      }
    }

    const staticHandler: StaticHandler = async () => {
      return new Response('Not implemented', { status: 501 })
    }

    return {
      name: 'cloudinary-adapter',
      handleUpload,
      handleDelete,
      staticHandler,
    }
  }
}
