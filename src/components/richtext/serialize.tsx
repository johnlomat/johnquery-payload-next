import React from 'react'
import { JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'

interface SerializeProps {
  nodes: any
  customClassNames?: any
}

// Custom JSX converters for Lexical rich text
const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  // You can customize individual converters here if needed
})

const Serialize: React.FC<SerializeProps> = ({ nodes, customClassNames }) => {
  if (!nodes) {
    return null
  }

  return (
    <RichText
      converters={jsxConverters}
      data={nodes}
      disableIndent={false}
      disableTextAlign={false}
    />
  )
}

export default Serialize
