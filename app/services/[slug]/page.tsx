import { notFound } from 'next/navigation'
import { getCategory, CATEGORIES, type Category } from '@/lib/categories'
import CategoryDetail from '@/components/CategoryDetail'
import GraphicDesignPage from '@/components/GraphicDesignPage'
import SMMPage from '@/components/SMMPage'
import StaffAugmentationPage from '@/components/StaffAugmentationPage'
import SalesMarketingPage from '@/components/SalesMarketingPage'

// Categories with a bespoke, content-driven page (doesn't fit the generic
// CategoryDetail template) — everything else falls through to CategoryDetail.
const BESPOKE_PAGES: Record<string, (props: { category: Category }) => React.JSX.Element> = {
  'graphic-design': GraphicDesignPage,
  'smm': SMMPage,
  'staff-augmentation': StaffAugmentationPage,
  'sales-marketing': SalesMarketingPage,
}

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  return {
    title: `${category.name} | FilmFX Studio`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()
  const BespokePage = BESPOKE_PAGES[slug]
  if (BespokePage) return <BespokePage category={category} />
  return <CategoryDetail category={category} />
}
