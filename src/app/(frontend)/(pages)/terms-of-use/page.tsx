export const revalidate = 60 // Revalidate every 60 seconds (ISR)

import { notFound } from 'next/navigation'
import Serialize from '@/components/richtext/serialize'
import { pagesService } from '@/services'

export async function generateMetadata() {
  const page = await pagesService.getPageBySlug('terms-of-use')
  const meta = page?.meta as
    | {
        title?: string | null
        description?: string | null
        keywords?: string[] | null
        image?: { url?: string } | number | null
      }
    | undefined

  return {
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords?.join(', ') || undefined,
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      images: typeof meta?.image === 'object' ? meta?.image?.url : undefined,
    },
  }
}

export default async function TermsPage() {
  const pageData = await pagesService.getPageBySlug('terms-of-use')

  if (!pageData) {
    notFound()
  }

  return (
    <div className="page-content">
      <section className="relative bg-[radial-gradient(ellipse_at_center,_#FFFFFF_5%,#D7D7D7_70%)] py-24 md:pt-40">
        <div className="container flex flex-wrap space-y-6">
          <div className="flex w-full flex-col items-center space-y-20">
            <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_p:last-child]:mb-0 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
              <h1>{pageData.title}</h1>
              <Serialize nodes={pageData.content} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
