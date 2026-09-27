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
 *  An upcoming animated series — a Saturday-morning cartoon for grown-ups —
 *  that turns Sentinel's lessons (how money moves, crypto self-custody,
 *  asset protection) into funny, plain-English stories.
 *
 *  This page is a "coming soon" launch hub. To go live with episodes:
 *    - 🔵 In EPISODES below, fill in each episode's `youtubeId` with the real
 *      YouTube video ID. Any episode left without an id renders as a
 *      "Coming Soon" placeholder card automatically.
 *    - Cast art lives in public/images/sentinel-squad/ (webp, 480x480).
 *  The "Notify me at launch" form writes to the `sentinel-squad-notify`
 *  Netlify form (registered in public/__forms.html).
 * ============================================================================
 */

type Character = {
  image: string
  name: string
  role: string
  bio: string
}

// Cast of Season One. Art lives in public/images/sentinel-squad/.
const CHARACTERS: Character[] = [
  {
    image: '/images/sentinel-squad/jenae.webp',
    name: 'Jenae',
    role: 'The Lead',
    bio: 'Calm, sharp, and fiercely protective of her family’s money. She reads the fine print so you don’t have to — and explains it in plain English.',
  },
  {
    image: '/images/sentinel-squad/jarrod.webp',
    name: 'Jarrod',
    role: 'The Friendly Skeptic',
    bio: 'Jenae’s easygoing friend who isn’t sold on crypto. He asks what you’re thinking — “Why not just use the bank?” — and makes the Squad earn every answer.',
  },
  {
    image: '/images/sentinel-squad/marcus.webp',
    name: 'Marcus',
    role: 'The Skeptic',
    bio: 'Jenae’s longtime friend who still trusts the old bank way. He asks the question everyone’s thinking — and admits it when the answer surprises him.',
  },
  {
    image: '/images/sentinel-squad/coin.webp',
    name: 'Coin',
    role: 'The AI Sidekick',
    bio: 'A friendly glowing orb that explains the tech. Gold when thinking, red for bad news, green for good news — and always honest about what nobody can promise.',
  },
  {
    image: '/images/sentinel-squad/darius.webp',
    name: 'Darius Dimes',
    role: 'The Middleman',
    bio: 'A smooth banker in a pinstripe suit with a rubber stamp that says FEE. Charming, a little ridiculous, and somehow at every window.',
  },
]

type Episode = {
  number: string
  title: string
  description: string
  // 🔵 Add the YouTube video ID once the episode is published. Leave empty for "Coming Soon".
  youtubeId?: string
  // Optional badge shown on the placeholder card instead of "Coming Soon".
  status?: string
}

const EPISODES: Episode[] = [
  {
    number: 'Ep. 01',
    title: 'The Old Bank Trick',
    description:
      'A $500 wire, $47 in fees, and “3–5 business days.” The Squad follows the money through the SWIFT maze, learns what ISO 20022 really is (a messaging standard, not a coin), and looks at how some payment providers use XRP as a bridge.',
    status: 'Premiering Soon',
  },
  {
    number: 'Ep. 02',
    title: 'The Vault Without a Key',
    description:
      'When a family can’t reach their crypto, the Squad shows why self-custody and an inheritance plan matter before it’s too late.',
  },
  {
    number: 'Ep. 03',
    title: 'The Missing Deductions',
    description:
      'A busy caregiver discovers the tax savings hiding in plain sight — and keeps more of what they’ve earned.',
  },
  {
    number: 'Ep. 04',
    title: 'Building the Shield',
    description:
      'The Squad walks a working family through protecting their home and savings without a fortune.',
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
          A Saturday-morning cartoon for grown-ups that turns money moves, crypto self-custody, and asset protection
          into funny, plain-English stories you’ll actually remember.
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
          lessons we teach working families and crypto holders — and turns them into a cartoon for grown-ups: bold,
          funny, and honest. Each episode follows Jenae, Jarrod, Marcus, Coin, and one very smooth middleman as they figure out
          how money really moves, how to guard what you’ve built, and how to pass on your digital assets.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CHARACTERS.map((c) => (
            <div
              key={c.name}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-7 text-center flex flex-col items-center hover:border-amber-500/50 transition-colors"
            >
              <img
                src={c.image}
                alt={`${c.name}, ${c.role} — Sentinel Squad character`}
                width={480}
                height={480}
                loading="lazy"
                className="w-40 h-40 object-contain mb-5 rounded-2xl bg-slate-900/60 border border-slate-700/50"
              />
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

function EpisodeCard({ number, title, description, youtubeId, status }: Episode) {
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
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">{status ?? 'Coming Soon'}</span>
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
