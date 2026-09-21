import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/three')({
  head: () => ({
    meta: [
      { title: 'Three Wellness & Opportunity - Sentinel Enterprises' },
      {
        name: 'description',
        content: 'Discover the full THREE International product line — Vitalité, Collagène, Éternel, Imúne, Purifí, Revíve, GLP THREE, Visage skin care, and Kynetik — and explore the opportunity to build your own business.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Three Wellness & Opportunity - Sentinel Enterprises' },
      {
        property: 'og:description',
        content: 'Discover the full THREE International product line — Vitalité, Collagène, Éternel, Imúne, Purifí, Revíve, GLP THREE, Visage skin care, and Kynetik — and explore the opportunity to build your own business.',
      },
      { property: 'og:url', content: 'https://sentinelenterprisesllc.com/three' },
    ],
    links: [
      { rel: 'canonical', href: 'https://sentinelenterprisesllc.com/three' },
    ],
  }),
  component: ThreePage,
})

function ThreePage() {
  return (
    <>
      <ThreeHero />
      <ThreeTrustBand />
      <ThreeProducts />
      <ThreeScience />
      <ThreeOpportunity />
      <ThreeFAQ />
      <ThreeDisclosure />
    </>
  )
}

function ThreeHero() {
  return (
    <section className="relative pt-32 pb-24 flex items-center overflow-hidden bg-slate-900 border-b border-slate-800">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
          INDEPENDENT BRAND AMBASSADOR
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
          Wellness for the Long Term
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto">
          Explore daily supplements, skin care, and caffeinated drink mixes, or learn about building a product-sharing business with Jenae as a Brand Ambassador.
        </p>
        
        <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-6">
          Jenae is an independent Three Brand Ambassador and may earn commissions from qualifying purchases and team sales. Earnings are not guaranteed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://jenae.threeinternational.com/en/purchase-products"
            target="_blank"
            rel="sponsored noopener noreferrer external commercial"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Shop Products
          </a>
          <a
            href="https://jenae.threeinternational.com/en/opportunity"
            target="_blank"
            rel="sponsored noopener noreferrer external commercial"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl border-2 border-white/30 hover:border-cyan-400/50 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Learn About the Opportunity →
          </a>
        </div>

        <img
          src="/images/three/full-catalog.webp"
          alt="The full THREE International product line"
          loading="lazy"
          className="mt-14 max-w-4xl w-full mx-auto"
        />
      </div>
    </section>
  )
}

const PRODUCTS = [
  {
    id: 'vitalite',
    name: 'Vitalité',
    category: 'Superfood Blend + Multivitamin Complex',
    description: 'A comprehensive daily formula featuring vitamins, minerals, and nutrients to support your foundational nutritional needs.',
    image: '/images/three/card-vitalite.jpg',
    benefits: ['Vitamins & Minerals', 'Daily Nutrition', 'Wellness Support']
  },
  {
    id: 'collagene',
    name: 'Collagène',
    category: 'Marine Sourced Collagen',
    description: 'A delicious blend of collagen and other powerful ingredients that nourishes cells to keep skin, hair, and nails vibrant and healthy.',
    image: '/images/three/collagene-box.webp',
    benefits: ['Skin, Hair & Nails', 'Marine Sourced', '10-Packet Supply']
  },
  {
    id: 'eternel',
    name: 'Éternel',
    category: 'Antioxidant Super-Blend',
    description: 'An advanced blend of liposomal antioxidants and polyphenols that helps protect your body’s cells from the damage caused by free radicals.',
    image: '/images/three/eternel-box.webp',
    benefits: ['Cellular Protection', 'Polyphenol Blend', 'Age-Defying']
  },
  {
    id: 'imune',
    name: 'Imúne',
    category: 'Total Body Immune Support',
    description: 'Specially designed to work at the cellular level, Imúne’s unique blend of vitamins, minerals, and phytochemicals supports your body’s natural immune response.',
    image: '/images/three/imune-jar.webp',
    benefits: ['Immune Support', 'Vitamins & Minerals', 'Cellular Level']
  },
  {
    id: 'purifi',
    name: 'Purifí',
    category: 'Daily Whole-Body Detox',
    description: 'An advanced blend of cleansing herbs and fulvic acid that works at the cellular level to support the body’s elimination organs.',
    image: '/images/three/purifi-jar.webp',
    benefits: ['Cellular Cleansing', 'Fulvic Acid', 'Daily Detox']
  },
  {
    id: 'revive',
    name: 'Revíve',
    category: 'Renewal & Recovery',
    description: 'A unique formula designed to work at the cellular level to support healthy joints and offer enhanced flexibility, mobility, and range of motion.',
    image: '/images/three/revive-jar.webp',
    benefits: ['Joint Support', 'Mobility & Flexibility', 'Cellular Renewal']
  },
  {
    id: 'glp-three',
    name: 'GLP THREE',
    category: 'Dietary Supplement',
    description: 'A daily dropper formula that supports your body’s own natural GLP-1 production, taken before meals or as desired.',
    image: '/images/three/glp-three.png',
    benefits: ['Natural GLP-1 Support', 'Simple Dropper Dose', 'Take Before Meals']
  },
  {
    id: 'visage-pure-cleanse',
    name: 'Visage Pure Cleanse',
    category: 'Skin Care',
    description: 'Refresh your skin and renew your spirit with a gentle daily cleanse designed for a versatile skin-care routine.',
    image: '/images/three/card-visage-pure-cleanse.jpg',
    benefits: ['Daily Cleanse', 'Skin Care', 'Topical Application']
  },
  {
    id: 'visage-radiant-toner',
    name: 'Visage Radiant Toner',
    category: 'Skin Care',
    description: 'Balance within, beauty without — a radiance-boosting toner that rounds out the Visage skin-care line.',
    image: '/images/three/card-visage-radiant-toner.jpg',
    benefits: ['Radiance Boost', 'Skin Care', 'Topical Application']
  },
  {
    id: 'visage-super-serum',
    name: 'Visage Super Serum',
    category: 'Skin Care',
    description: 'A serum that’s good for your skin and good for your soul — a dedicated formula designed to be a versatile addition to your daily beauty routine.',
    image: '/images/three/card-visage-super-serum.jpg',
    benefits: ['Skin Care', 'Daily Routine', 'Topical Application']
  },
  {
    id: 'kynetik',
    name: 'Kynetik',
    category: 'Clean Caffeine Drink Mix',
    description: 'A caffeinated drink mix offering a flavorful Cherry Rush taste for your active days and routines.',
    image: '/images/three/kynetik-cherry-rush.jpg',
    benefits: ['Clean Caffeine', 'Cherry Rush Flavor', 'Mix with Water']
  }
]

function ThreeTrustBand() {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
        <img
          src="/images/three/lifestyle-group.jpg"
          alt="Sharing THREE International products"
          loading="lazy"
          className="w-full md:w-1/2 rounded-3xl object-cover max-h-96"
        />
        <div className="md:w-1/2 text-center md:text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Trusted & Referenced
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Formulated Products, Real Community</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            THREE International's cellular absorption technology and select formulas are referenced in the Prescribers' Digital
            Reference (PDR) &mdash; the same directory clinicians use to look up supplement and drug information.
          </p>
          <img
            src="/images/three/pdr-listing.jpg"
            alt="THREE products listed in the Prescribers' Digital Reference (PDR)"
            loading="lazy"
            className="rounded-2xl border border-slate-800 max-w-xs mx-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  )
}

function ThreeScience() {
  const topics = [
    { name: 'Molecular Shuttles', image: '/images/three/science-molecular-shuttles.png' },
    { name: 'Micelles', image: '/images/three/science-micelles.png' },
    { name: 'Fulvic Acid', image: '/images/three/science-fulvic-acid.png' },
    { name: 'Hydrolysis', image: '/images/three/science-hydrolysis.png' },
  ]

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Cellular Absorption Technologies</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white mb-4">The Science Behind the Formulas</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Every THREE formula is built to get nutrients where they actually work &mdash; inside the cell.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((t) => (
            <img
              key={t.name}
              src={t.image}
              alt={`${t.name} — THREE cellular absorption technology`}
              loading="lazy"
              className="w-full rounded-2xl border border-slate-800 bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ThreeProducts() {
  const products = PRODUCTS

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Full Product Line</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Daily supplements, skin care, and clean-caffeine drink mixes &mdash; carefully crafted to support your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-amber-500/30 transition-colors">
              <div className="aspect-[4/3] bg-slate-800 p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                <img src={p.image} alt={p.name} loading="lazy" className="relative z-20 max-w-full max-h-full object-contain drop-shadow-2xl" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-cyan-400 font-semibold text-sm mb-2">{p.category}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{p.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{p.description}</p>
                
                <ul className="mb-8 space-y-2">
                  {p.benefits.map((b, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-300">
                      <svg className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://jenae.threeinternational.com/en/purchase-products"
                  target="_blank"
                  rel="sponsored noopener noreferrer external commercial"
                  className="w-full inline-flex justify-center items-center px-4 py-3 bg-slate-800 hover:bg-amber-500 text-white hover:text-slate-900 font-semibold rounded-xl transition-colors"
                >
                  Purchase {p.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ThreeOpportunity() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-cyan-900/20 to-amber-900/10 border border-slate-700/50 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
              Become a Brand Ambassador
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Build With Us</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Three International provides a structured opportunity for individuals interested in sharing wellness products and building an independent business. Whether you are looking for supplemental income or a new venture, you can join as an independent Brand Ambassador.
            </p>
            <p className="text-base text-slate-400 mb-10">
              Enrollment takes place on the official Three website. Check that Jenae is listed as your sponsor before completing registration, and review the current costs and terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://jenae.threeinternational.com/en/enrollment/enrollmentconfigurationba"
                target="_blank"
                rel="sponsored noopener noreferrer external commercial"
                className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              >
                Join My Team
              </a>
              <a
                href="https://jenae.threeinternational.com/en/opportunity"
                target="_blank"
                rel="sponsored noopener noreferrer external commercial"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-slate-800 text-white font-semibold text-lg rounded-xl border border-slate-600 hover:border-slate-500 transition-colors"
              >
                Read Compensation Plan
              </a>
            </div>
          </div>
          
          <div className="md:w-1/3 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-sm text-slate-400 space-y-4">
            <h3 className="font-semibold text-white">Income Disclosure</h3>
            <p>
              As with any independent business, success as a Three Brand Ambassador requires time, dedication, and hard work. Income is not guaranteed.
            </p>
            <p>
              Before joining, please review the full compensation plan and current terms regarding costs and rewards to ensure it is the right fit for your circumstances.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ThreeFAQ() {
  const faqs = [
    {
      q: 'Do I have to become a Brand Ambassador to buy products?',
      a: 'No. You can simply purchase products as a retail customer at any time. There is no requirement to join the business side to enjoy the products.'
    },
    {
      q: 'What is a Brand Ambassador?',
      a: 'A Brand Ambassador is an independent representative who earns commissions by sharing and selling Three products. It is a business opportunity with its own terms, rewards, and structure.'
    },
    {
      q: 'Will Jenae be my sponsor if I join?',
      a: 'These links lead to Jenae’s Three ambassador site. Confirm that Jenae is listed as your sponsor before you complete registration. If anything looks incorrect, pause enrollment and contact Three support.'
    },
    {
      q: 'Are there any medical claims for these products?',
      a: 'No. The products are designed for general wellness support. They are not intended to diagnose, treat, cure, or prevent any disease. Always consult your physician before starting any new supplement or wellness routine.'
    }
  ]

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-white hover:text-amber-400 transition-colors">
                {faq.q}
                <span className="ml-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-slate-700/50 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function ThreeDisclosure() {
  return (
    <section className="py-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 leading-relaxed space-y-4">
        <p>
          <strong className="text-slate-400">Independent Ambassador Disclosure:</strong> Jenae is an independent Brand Ambassador for Three International and may earn commissions from qualifying purchases and team sales. This is not Three International's corporate website.
        </p>
        <p>
          <strong className="text-slate-400">Income Disclaimer:</strong> Earnings are not guaranteed. Results vary and expenses can exceed earnings. Review current enrollment and ongoing costs, the official rewards plan, and any applicable income disclosure before deciding to join. This page does not promise any level of income.
        </p>
        <p>
          <strong className="text-slate-400">Medical Suitability Guidance:</strong> The statements regarding these products have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Always consult your healthcare professional before beginning any new diet, supplement, or exercise program, especially if you are pregnant, nursing, or have a medical condition.
        </p>
      </div>
    </section>
  )
}
