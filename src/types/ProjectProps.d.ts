import { Media, Technology } from '@/payload-types'

export interface ProjectProps {
  title: string
  featured_image?: number | Media
  project_overview?: {
    root: {
      type: string
      children: {
        type: unknown
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  website_type?: string | null
  key_features?: {
    root: {
      type: string
      children: {
        type: unknown
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  tech_stacks?:
    | {
        technology?: (number | null) | Technology
        id?: string | null
      }[]
    | null
  demo_link?: string | null
  screenshot_link?: string | null
  isOpen?: boolean
  onClose?: () => void
}
