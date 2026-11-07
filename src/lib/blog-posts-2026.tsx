import { postsA } from './blog-posts-2026-a'
import { postsB } from './blog-posts-2026-b'

export type BlogPost = {
  slug: string
  title: string
  /** Search-result description (meta description). */
  description: string
  /** Short teaser for the blog listing. */
  excerpt: string
  isoDate: string
  date: string
  category: string
  readTime: string
  content: React.ReactNode
}

/** 2026 posts, newest first. */
export const POSTS_2026: BlogPost[] = [...postsA, ...postsB].sort((a, b) => b.isoDate.localeCompare(a.isoDate))

export const POSTS_2026_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(POSTS_2026.map((p) => [p.slug, p]))
