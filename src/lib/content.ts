import fs from 'fs'
import path from 'path'
import type { Tour, Expedition, Accommodation, Guide } from './types'

const contentDir = path.join(process.cwd(), 'content')

function parseJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

function getAllFromDir<T extends { slug: string }>(subdir: string): T[] {
  const dir = path.join(contentDir, subdir)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
  return files
    .map((file) => parseJsonFile<T>(path.join(dir, file)))
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

function getBySlug<T extends { slug: string }>(subdir: string, slug: string): T | null {
  const dir = path.join(contentDir, subdir)
  const filePath = path.join(dir, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  return parseJsonFile<T>(filePath)
}

// Tours
export function getAllTours(): Tour[] {
  return getAllFromDir<Tour>('tours')
}

export function getTourBySlug(slug: string): Tour | null {
  return getBySlug<Tour>('tours', slug)
}

export function getFeaturedTours(): Tour[] {
  return getAllTours().filter((t) => t.featured)
}

// Expeditions
export function getAllExpeditions(): Expedition[] {
  return getAllFromDir<Expedition>('expeditions')
}

export function getExpeditionBySlug(slug: string): Expedition | null {
  return getBySlug<Expedition>('expeditions', slug)
}

export function getFeaturedExpeditions(): Expedition[] {
  return getAllExpeditions().filter((e) => e.featured)
}

// Accommodation
export function getAllAccommodation(): Accommodation[] {
  return getAllFromDir<Accommodation>('accommodation')
}

export function getAccommodationBySlug(slug: string): Accommodation | null {
  return getBySlug<Accommodation>('accommodation', slug)
}

export function getFeaturedAccommodation(): Accommodation[] {
  return getAllAccommodation().filter((a) => a.featured)
}

// Guides
export function getAllGuides(): Guide[] {
  const guides = getAllFromDir<Guide>('guides')
  return guides.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getGuideBySlug(slug: string): Guide | null {
  return getBySlug<Guide>('guides', slug)
}

export function getGuidesByCategory(category: string): Guide[] {
  return getAllGuides().filter((g) => g.category === category)
}

// Helpers for listings
export function getAllListingItems() {
  return {
    tours: getAllTours().map((t) => ({ label: t.title, value: t.slug, type: 'tour' as const })),
    expeditions: getAllExpeditions().map((e) => ({ label: e.title, value: e.slug, type: 'expedition' as const })),
    accommodation: getAllAccommodation().map((a) => ({ label: a.title, value: a.slug, type: 'accommodation' as const })),
  }
}
