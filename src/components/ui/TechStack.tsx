import Image from 'next/image'
import { Tooltip, Flowbite } from 'flowbite-react'
import TooltipTheme from '@/components/themes/flowbite-react/TooltipTheme'
import { TechnologyProps } from '@/types/TechnologyProps'

const TechStack = ({
  technology: {
    title,
    image_details: { alt, url, width, height },
  },
}: TechnologyProps) => (
  <div className="relative flex items-center justify-center">
    {url ? (
      <Flowbite theme={{ theme: TooltipTheme }}>
        <Tooltip content={title}>
          <Image src={url} alt={alt} width={width} height={height} />
        </Tooltip>
      </Flowbite>
    ) : (
      <div className="flex h-12 w-12 items-center justify-center bg-gray-200 text-xs text-gray-500">
        {title}
      </div>
    )}
  </div>
)

export default TechStack
