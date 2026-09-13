import { notFound } from 'next/navigation'
import { getCategory, CATEGORIES } from '@/lib/categories'
import CategoryDetail from '@/components/CategoryDetail'

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
  return <CategoryDetail category={category} />
}
