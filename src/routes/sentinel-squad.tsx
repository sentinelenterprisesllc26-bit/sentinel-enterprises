import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/sentinel-squad')({
  component: SentinelSquadPage,
})

const CHANNEL_URL = 'https://www.youtube.com/@JenaeSentinel'

/*
 * ============================================================================
 *  THE SENTINEL SQUAD — ANIMATED SERIES (this file)
 * ============================================================================
 *  An upcoming animated series that turns Sentinel's lessons — asset
 *  protection, crypto self-custody, and caregiver tax savings — into
 *  family-friendly stories.
 *
 *  This page is a "coming soon" launch hub. To go live with episodes:
 *    - 🔵 In EPISODES below, fill in each episode's `youtubeId` with the real
 *      YouTube video ID. Any episode left without an id renders as a
 *      "Coming Soon" placeholder card automatically.
 *    - 🔵 Edit CHARACTERS to match the final cast of the series.
 *  The "Notify me at launch" form writes to the `sentinel-squad-notify`
 *  Netlify form (registered in public/__forms.html).
 * ============================================================================
 */

type Character = {
  emoji: string
  name: string
  role: string
  bio: string
}

// 🔵 Update to match the final cast as the series develops.
const CHARACTERS: Character[] = [
  {
    emoji: '🛡️',
    name: 'Captain Sentinel',
    role: 'The Protector',
    bio: 'The team leader who shows families how to shield what they’ve built — no eight-figure budget required.',
  },
  {
    emoji: '🔑',
    name: 'Coldkey',
    role: 'The Crypto Guardian',
    bio: 'A self-custody expert who keeps seed phrases safe and makes sure heirs can actually inherit digital assets.',
  },
  {
    emoji: '🧾',
    name: 'Ledger',
    role: 'The Tax Whisperer',
    bio: 'A sharp-eyed numbers hero who helps caregivers spot the deductions and credits they’ve been missing.',
  },
  {
    emoji: '⚖️',
    name: 'Trust',
    role: 'The Planner',
    bio: 'The calm strategist who turns confusing legal jargon into a plan a whole family can follow.',
  },
]

type Episode = {
  number: string
  title: string
  description: string
  // 🔵 Add the YouTube video ID once the episode is published. Leave empty for "Coming Soon".
  youtubeId?: string
}

const EPISODES: Episode[] = [
  {
    number: 'Ep. 01',
    title: 'The Vault Without a Key',
    description:
      'When a family can’t reach their crypto, the Squad shows why self-custody and an inheritance plan matter before it’s too late.',
  },
  {
    number: 'Ep. 02',
    title: 'The Missing Deductions',
    description:
      'Ledger helps a busy caregiver discover the tax savings hiding in plain sight — and keep more of what they’ve earned.',
  },
  {
    number: 'Ep. 03',
    title: 'Building the Shield',
    description:
      'Trust and Captain Sentinel walk a working family through protecting their home and savings without a fortune.',
  },
]

function SentinelSquadPage() {
  return (
    <>
      <HeroSection />
      <PremiseSection />
      <CharactersSection />
      <EpisodesSection />
      <NotifySection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          New Animated Series · Coming Soon
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
          Meet the <span className="text-amber-400">Sentinel Squad</span>
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          A family-friendly animated series that turns asset protection, crypto self-custody, and caregiver tax savings
          into stories everyone can understand — and enjoy.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#notify"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
          >
            Get Notified at Launch
          </a>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl border border-white/20 transition-all"
          >
            Watch our YouTube channel →
          </a>
        </div>
      </div>
    </section>
  )
}

function PremiseSection() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">The Premise</span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white mb-6">Big Ideas, Made Simple</h2>
        <p className="text-lg text-slate-400 leading-relaxed">
          Protecting your family’s future shouldn’t require a law degree. The Sentinel Squad takes the same practical
          lessons we teach working families and crypto holders — and brings them to life through animated stories the
          whole household can watch together. Each episode follows the Squad as they help everyday families guard what
          they’ve built, pass on their digital assets, and stop overpaying on taxes.
        </p>
      </div>
    </section>
  )
}

function CharactersSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Meet the Squad</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Your Guides to a Protected Future</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHARACTERS.map((c) => (
            <div
              key={c.name}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-7 text-center flex flex-col items-center hover:border-amber-500/50 transition-colors"
            >
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                <span aria-hidden="true">{c.emoji}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{c.name}</h3>
              <p className="text-amber-400 text-sm font-medium mb-3">{c.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{c.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EpisodesSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Episodes</h2>
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Season One</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EPISODES.map((ep) => (
            <EpisodeCard key={ep.number} {...ep} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EpisodeCard({ number, title, description, youtubeId }: Episode) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col hover:border-amber-500/50 transition-colors">
      <div className="relative w-full bg-slate-900" style={{ aspectRatio: '16 / 9' }}>
        {youtubeId ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
            <span className="text-3xl" aria-hidden="true">
              🎬
            </span>
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Coming Soon</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">{number}</span>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function NotifySection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const formData = new FormData(e.currentTarget)
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="notify" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            Be First in Line
          </span>
          <h2 className="text-3xl font-bold text-white mb-3">Get Notified When the Squad Drops</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Leave your email and we’ll let you know the moment the first episodes of the Sentinel Squad go live. No spam.
            Unsubscribe anytime.
          </p>

          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-green-400">
              <p className="font-semibold text-lg mb-1">You’re on the list!</p>
              <p className="text-sm">We’ll email you as soon as the Sentinel Squad premieres.</p>
              <Link
                to="/videos"
                className="inline-flex items-center gap-1 mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                Explore our video library →
              </Link>
            </div>
          ) : (
            <form
              name="sentinel-squad-notify"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input type="hidden" name="form-name" value="sentinel-squad-notify" />
              <p className="hidden">
                <label>
                  Don't fill this: <input name="bot-field" />
                </label>
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'submitting' ? 'Adding you…' : 'Notify Me at Launch'}
              </button>
            </form>
          )}

          {status === 'error' && <p className="mt-3 text-red-400 text-sm">Something went wrong. Please try again.</p>}

          <p className="mt-4 text-slate-500 text-xs leading-relaxed">
            The Sentinel Squad is created for educational and entertainment purposes only. Sentinel Enterprises LLC is
            not an attorney, financial advisor, tax professional, or fiduciary, and nothing in the series constitutes
            legal, tax, or financial advice.
          </p>
        </div>
      </div>
    </section>
  )
}
