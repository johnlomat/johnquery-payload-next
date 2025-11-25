import Image from 'next/image'
import { Project } from '@/payload-types'

type SkillItemProps = NonNullable<Project['tech_stacks']>[number]

const SkillItem = ({ technology }: SkillItemProps) => {
  // Handle case where technology is a number (not populated) or null
  if (typeof technology !== 'object' || !technology) {
    return null
  }

  const { title, image_details } = technology

  // Handle case where image_details is a number (not populated)
  if (typeof image_details !== 'object' || !image_details) {
    return (
      <div className="flex w-1/2 flex-col items-center p-[0.9375rem] sm:p-0 md:w-1/3 lg:w-1/4">
        <div className="mb-4 flex h-[6.25rem] w-[6.25rem] items-center justify-center">
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-center text-sm text-gray-500">
            No Image
          </div>
        </div>
        <span className="text-center uppercase text-[#212121]">{title}</span>
      </div>
    )
  }

  const { alt, url, width, height } = image_details

  return (
    <div className="flex w-1/2 flex-col items-center p-[0.9375rem] sm:p-0 md:w-1/3 lg:w-1/4">
      <div className="mb-4 flex h-[6.25rem] w-[6.25rem] items-center justify-center">
        {url ? (
          <Image src={url} alt={alt} width={width ?? 100} height={height ?? 100} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-center text-sm text-gray-500">
            No Image
          </div>
        )}
      </div>
      <span className="text-center uppercase text-[#212121]">{title}</span>
    </div>
  )
}

export default SkillItem
