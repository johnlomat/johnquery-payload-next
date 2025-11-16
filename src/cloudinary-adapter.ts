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
  // Return the Adapter function
  return ({ collection, prefix }) => {
    const handleUpload: HandleUpload = async ({
      file,
      collection,
      data,
      req,
      clientUploadContext,
    }) => {
      try {
        // Upload the file to Cloudinary using upload_stream
        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'auto', // auto-detect file type (image, video, etc.)
              public_id: `${folder}/${file.filename.replace(/\.[^/.]+$/, '')}`, // Set custom file name without extension
              overwrite: false, // Do not overwrite if a file with the same name exists
              use_filename: true, // Use original filename
            },
            (error, result) => {
              if (error) return reject(error)
              if (!result) return reject(new Error('No result returned from Cloudinary'))
              resolve(result)
            },
          )
          uploadStream.end(file.buffer) // Send the entire file buffer to Cloudinary
        })

        // Update file properties with Cloudinary response
        file.filename = uploadResult.public_id // Use Cloudinary's public_id as the file's unique name
        file.mimeType = `${uploadResult.format}` // Set MIME type based on Cloudinary's format
        file.filesize = uploadResult.bytes // Set the actual file size in bytes
      } catch (err) {
        console.error('Upload Error', err)
        throw err
      }
    }

    const handleDelete: HandleDelete = async ({ collection, doc, filename, req }) => {
      try {
        // Remove the file from Cloudinary using the public_id
        await cloudinary.uploader.destroy(`${folder}/${filename.replace(/\.[^/.]+$/, '')}`)
      } catch (error) {
        console.error('Cloudinary Delete Error:', error)
      }
    }

    const staticHandler: StaticHandler = async (req, { params }) => {
      // For Cloudinary, we don't need to serve files directly
      // Files are served from Cloudinary URLs
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
