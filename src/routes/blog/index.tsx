import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

const posts = [
  {
    id: 'crypto-trust',
    title: 'Do I Need a Trust If I Own Crypto?',
    slug: 'crypto-trust',
    date: 'June 2025',
    readTime: '6 min read',
    category: 'Crypto Planning',
    excerpt:
      'Your crypto dies with you unless you plan for it. Here\'s what a trust actually does — and why crypto needs special trust language.',
  },
  {
    id: 'caregiver-tax-deductions',
    title: '3 Caregiver Tax Deductions Most Families Miss',
    slug: 'caregiver-tax-deductions',
    date: 'May 2025',
    readTime: '5 min read',
    category: 'Caregiver Tax',
    excerpt:
      'If you\'re caring for a parent or disabled family member, the IRS might owe you money. Most caregivers miss at least one of these deductions.',
  },
  {
    id: 'cold-storage',
    title: 'Cold Storage for Beginners: Tangem vs. Ledger vs. Exchange',
    slug: 'cold-storage',
    date: 'April 2025',
    readTime: '7 min read',
    category: 'Crypto Security',
    excerpt:
      '"Not your keys, not your crypto" — here\'s what that actually means and which cold storage solution fits your situation.',
  },
  {
    id: 'trust-cost',
    title: 'How Much Does a Trust Actually Cost? (Real Numbers for Real Families)',
    slug: 'trust-cost',
    date: 'March 2025',
    readTime: '5 min read',
    category: 'Asset Protection',
    excerpt:
      'A trust doesn\'t cost as much as you think — and not having one costs more. Real numbers, real trade-offs.',
  },
]

function BlogPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Resources</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Plain-English guides on asset protection, crypto planning, and caregiver taxes.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all group"
              >
                <span className="inline-block px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20 mb-3">
                  {post.category}
                </span>
                <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
