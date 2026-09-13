import { notFound } from 'next/navigation'
import { getCategory, CATEGORIES } from '@/lib/categories'
import { getSubcategory, getSubcategoriesFor } from '@/lib/subcategories'
import SubcategoryDetail from '@/components/SubcategoryDetail'

export function generateStaticParams() {
  return CATEGORIES.flatMap(c =>
    getSubcategoriesFor(c.slug).map(s => ({ slug: c.slug, piece: s.slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; piece: string }> }) {
  const { slug, piece } = await params
  const sub = getSubcategory(slug, piece)
  if (!sub) return {}
  return {
    title: `${sub.name} | FilmFX Studio`,
    description: sub.bottomLine,
  }
}

export default async function SubcategoryPage({ params }: { params: Promise<{ slug: string; piece: string }> }) {
  const { slug, piece } = await params
  const category = getCategory(slug)
  const sub = getSubcategory(slug, piece)
  if (!category || !sub) notFound()
  return <SubcategoryDetail category={category} sub={sub} />
}
