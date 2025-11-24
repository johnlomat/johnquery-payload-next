import Image from 'next/image'
import { Tooltip, Flowbite } from 'flowbite-react'
import TooltipTheme from '@/components/themes/flowbite-react/TooltipTheme'
import { TechnologyProps } from '@/types/TechnologyProps'

const TechStack = ({ technology }: TechnologyProps) => {
  // Handle case where technology is a number (not populated) or null
  if (typeof technology !== 'object' || !technology) {
    return null
  }

  const { title, image_details } = technology

  // Handle case where image_details is a number (not populated)
  if (typeof image_details !== 'object' || !image_details) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center bg-gray-200 text-xs text-gray-500">
          {title}
        </div>
      </div>
    )
  }

  const { alt, url, width, height } = image_details

  return (
    <div className="relative flex items-center justify-center">
      {url ? (
        <Flowbite theme={{ theme: TooltipTheme }}>
          <Tooltip content={title}>
            <Image src={url} alt={alt} width={width ?? 48} height={height ?? 48} />
          </Tooltip>
        </Flowbite>
      ) : (
        <div className="flex h-12 w-12 items-center justify-center bg-gray-200 text-xs text-gray-500">
          {title}
        </div>
      )}
    </div>
  )
}

export default TechStack
