import React from 'react'
import { JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'

import { Project } from '@/payload-types'
import { cn } from '@/lib/utils'

interface SerializeProps {
  nodes: Project['project_overview']
  className?: string
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
})

const Serialize: React.FC<SerializeProps> = ({ nodes, className }) => {
  if (!nodes) {
    return null
  }

  return (
    <RichText
      converters={jsxConverters}
      data={nodes as React.ComponentProps<typeof RichText>['data']}
      disableIndent={false}
      disableTextAlign={false}
      className={cn(
        '[&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_p:last-child]:mb-0 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5',
        className,
      )}
    />
  )
}

export default Serialize
