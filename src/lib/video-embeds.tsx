import { useState } from 'react'

/*
 *  Shared video players for blog posts and pages.
 *  - YouTubeEmbed: shows the thumbnail with a play button; the YouTube player
 *    only loads when tapped (keeps pages fast on phones).
 *  - SquadEpisode: a self-hosted Sentinel Squad episode with its poster.
 */

export const SQUAD_EPISODES = {
  ep01: {
    number: 'Episode 1',
    title: 'The Old Bank Trick',
    src: '/videos/sentinel-squad/ep01-old-bank-trick.mp4',
    poster: '/images/sentinel-squad/ep01-old-bank-trick-poster.jpg',
    duration: '2:15',
  },
  ep02: {
    number: 'Episode 2',
    title: 'The Vault Without a Key',
    src: '/videos/sentinel-squad/ep02-vault-without-a-key.mp4',
    poster: '/images/sentinel-squad/ep02-vault-without-a-key-poster.jpg',
    duration: '1:44',
  },
  ep03: {
    number: 'Episode 3',
    title: 'The Missing Deductions',
    src: '/videos/sentinel-squad/ep03-missing-deductions.mp4',
    poster: '/images/sentinel-squad/ep03-missing-deductions-poster.jpg',
    duration: '1:39',
  },
  ep04: {
    number: 'Episode 4',
    title: 'Building the Shield',
    src: '/videos/sentinel-squad/ep04-building-the-shield.mp4',
    poster: '/images/sentinel-squad/ep04-building-the-shield-poster.jpg',
    duration: '1:56',
  },
} as const

export type SquadEpisodeKey = keyof typeof SQUAD_EPISODES

function PlayBadge() {
  return (
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-amber-500 group-hover:bg-amber-400 shadow-xl shadow-black/40 ring-4 ring-white/80 transition-all group-hover:scale-105">
      <svg viewBox="0 0 24 24" className="w-7 h-7 ml-1 fill-slate-900" aria-hidden="true">
        <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.76-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
      </svg>
    </span>
  )
}

function Frame({ label, caption, children }: { label: string; caption?: string; children: React.ReactNode }) {
  return (
    <figure className="my-8 not-prose">
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900" style={{ aspectRatio: '16 / 9' }}>
        {children}
      </div>
      <figcaption className="mt-2 text-sm text-slate-400">
        <span className="font-semibold text-amber-400">{label}</span>
        {caption ? <> · {caption}</> : null}
      </figcaption>
    </figure>
  )
}

export function YouTubeEmbed({ id, title, caption }: { id: string; title: string; caption?: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <Frame label={`Watch: ${title}`} caption={caption}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full cursor-pointer" aria-label={`Play video: ${title}`}>
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/25 transition-colors" />
          <PlayBadge />
        </button>
      )}
    </Frame>
  )
}

export function SquadEpisode({ episode, caption }: { episode: SquadEpisodeKey; caption?: string }) {
  const ep = SQUAD_EPISODES[episode]
  const [playing, setPlaying] = useState(false)
  return (
    <Frame label={`Sentinel Squad, ${ep.number}: ${ep.title} (${ep.duration})`} caption={caption}>
      {playing ? (
        <video className="absolute inset-0 w-full h-full bg-slate-950" src={ep.src} poster={ep.poster} controls autoPlay playsInline aria-label={`${ep.number}: ${ep.title}`} />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full cursor-pointer" aria-label={`Play ${ep.number}: ${ep.title} (${ep.duration})`}>
          <picture>
            <source srcSet={ep.poster.replace(/\.jpg$/, '.webp')} type="image/webp" />
            <img src={ep.poster} alt="" width={1280} height={720} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </picture>
          <span className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors" />
          <PlayBadge />
        </button>
      )}
    </Frame>
  )
}
