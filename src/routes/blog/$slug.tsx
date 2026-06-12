import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
})

const posts: Record<string, { title: string; date: string; category: string; readTime: string; content: React.ReactNode }> = {
  'crypto-trust': {
    title: 'Do I Need a Trust If I Own Crypto?',
    date: 'June 2025',
    category: 'Crypto Planning',
    readTime: '6 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          Your crypto dies with you unless you plan for it. It's a hard truth — but it's one that every Bitcoin,
          Ethereum, and digital asset holder needs to hear before it's too late.
        </p>

        <h2>What a Trust Actually Does</h2>
        <p>
          A trust is a legal arrangement where you (the grantor) transfer ownership of assets to a trust entity, managed
          by a trustee, for the benefit of your beneficiaries. In plain English: your assets move into a legal "box"
          that has clear rules about what happens to them when you're gone.
        </p>
        <p>
          For traditional assets — your home, savings account, brokerage — a trust avoids probate (the public, often
          slow court process of distributing an estate), protects against creditors, and gives your heirs a clear
          roadmap.
        </p>

        <h2>Why Crypto Needs Special Trust Language</h2>
        <p>
          Here's where it gets complicated. Traditional trust language was written for traditional assets. Crypto is
          fundamentally different:
        </p>
        <ul>
          <li>It's held by private keys, not account numbers</li>
          <li>There's no customer service line to call if you lose access</li>
          <li>Exchanges can freeze accounts during estate proceedings</li>
          <li>Seed phrases can't be subpoenaed — if your heirs don't have them, the crypto is gone</li>
        </ul>
        <p>
          A trust that doesn't specifically address digital assets — including how trustees access them — leaves your
          heirs in the same bind as having no trust at all.
        </p>

        <h2>3 Options: What You're Really Choosing Between</h2>
        <h3>Option 1: No Trust, No Plan</h3>
        <p>
          Your crypto passes through probate (or doesn't pass at all, if no one can access it). Your family may spend
          months in court — and still end up with nothing.
        </p>

        <h3>Option 2: Basic Will</h3>
        <p>
          Better than nothing. But a will goes through probate, is public record, and doesn't give trustees the
          practical tools they need to access digital assets. It names who gets the crypto — but doesn't help them get
          it.
        </p>

        <h3>Option 3: Proper Digital Asset Trust</h3>
        <p>
          A properly drafted trust with digital asset language names a trustee, provides them a structured (and secure)
          path to access your holdings, and bypasses probate entirely. This is the goal.
        </p>

        <h2>How to Fund a Trust with Crypto (High-Level)</h2>
        <p>Funding a trust with crypto is not the same as funding it with a bank account. The general approach:</p>
        <ul>
          <li>Move assets into a hardware wallet (cold storage) held by or on behalf of the trust</li>
          <li>Document seed phrase access in a way that's secure now and accessible to your trustee later</li>
          <li>
            Work with an attorney experienced in digital assets — not just any estate planning attorney
          </li>
        </ul>

        <div className="cta-box">
          <p>
            Ready to understand your options? Download our free Crypto Inheritance Checklist — 5 essential steps every
            crypto holder should take.
          </p>
          <Link to="/crypto-inheritance-checklist">Download the Crypto Inheritance Checklist →</Link>
        </div>
      </div>
    ),
  },
  'caregiver-tax-deductions': {
    title: '3 Caregiver Tax Deductions Most Families Miss',
    date: 'May 2025',
    category: 'Caregiver Tax',
    readTime: '5 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          If you're caring for a parent or disabled family member, the IRS might owe you money. Most caregivers miss
          at least one of these three deductions — and some miss all three.
        </p>

        <h2>Deduction 1: Medical Expenses</h2>
        <p>
          You can deduct medical and dental expenses that exceed 7.5% of your adjusted gross income (AGI). The key is
          knowing what counts:
        </p>
        <ul>
          <li>Doctor, hospital, and specialist visits</li>
          <li>Prescription medications</li>
          <li>Medical equipment (wheelchairs, hearing aids, home modifications for disability)</li>
          <li>Home health aides and nursing home costs — if medically necessary</li>
          <li>Transportation to and from medical appointments</li>
        </ul>
        <p>
          Most caregivers don't track these throughout the year — and by tax time, the receipts are gone. Keep a
          running log.
        </p>

        <h2>Deduction 2: Dependent Care Credit</h2>
        <p>
          If the person you care for qualifies as your dependent and you paid for their care so you could work (or look
          for work), you may qualify for the Dependent Care Credit — worth up to 35% of $3,000 in qualifying expenses.
        </p>
        <p>
          The rules have nuances — income thresholds, qualifying person requirements — but many caregivers never even
          check eligibility.
        </p>

        <h2>Deduction 3: Filing Status Optimization</h2>
        <p>
          If you're unmarried and you paid more than half the cost of keeping up a home for a qualifying person, you
          may be able to file as Head of Household instead of Single. This difference can mean thousands of dollars:
        </p>
        <ul>
          <li>Higher standard deduction</li>
          <li>Lower tax bracket thresholds</li>
          <li>Better eligibility for certain credits</li>
        </ul>

        <h2>Common Mistakes</h2>
        <ul>
          <li>Not claiming a parent as a dependent when they qualify</li>
          <li>Missing the "multiple support agreement" option when multiple siblings share caregiving</li>
          <li>Failing to document expenses throughout the year</li>
          <li>Assuming you don't qualify without checking</li>
        </ul>

        <div className="cta-box">
          <p>
            Get our free Caregiver Tax Checklist — 7 deductions and credits most family caregivers miss, delivered
            instantly to your inbox.
          </p>
          <a href="/#email-signup">Get the Free Caregiver Tax Checklist →</a>
        </div>
      </div>
    ),
  },
  'cold-storage': {
    title: 'Cold Storage for Beginners: Tangem vs. Ledger vs. Exchange',
    date: 'April 2025',
    category: 'Crypto Security',
    readTime: '7 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          "Not your keys, not your crypto." It's the most important phrase in the crypto world — and most holders
          don't fully understand what it means until it's too late.
        </p>

        <h2>What Cold Storage Is (And Why Exchanges Aren't Enough)</h2>
        <p>
          When you hold crypto on an exchange (Coinbase, Kraken, Gemini), you don't actually hold it. You hold an IOU.
          The exchange holds the private keys — the actual proof of ownership. If the exchange is hacked, goes bankrupt,
          or freezes your account, you have very limited recourse.
        </p>
        <p>
          Cold storage means holding your private keys yourself, offline, on a hardware device. No internet connection,
          no third party, no counterparty risk.
        </p>

        <h2>Tangem: Best for Beginners</h2>
        <p>
          Tangem is a card-format hardware wallet — it looks like a credit card. You tap it to your phone to sign
          transactions.
        </p>
        <ul>
          <li><strong>Pros:</strong> Dead simple to use, no screen to navigate, comes with backup cards, no seed phrase to manage (controversial — see cons)</li>
          <li><strong>Cons:</strong> No seed phrase means inheritance and recovery is handled differently — you must plan for who gets the physical cards</li>
          <li><strong>Best for:</strong> Beginners who want cold storage without a steep learning curve</li>
        </ul>

        <h2>Ledger: Best for Advanced Users</h2>
        <p>
          Ledger is the most widely used hardware wallet. It has a screen, buttons, and generates a 24-word seed phrase
          that is the master key to all your holdings.
        </p>
        <ul>
          <li><strong>Pros:</strong> Widely supported, compatible with most crypto apps, seed phrase gives full recovery options</li>
          <li><strong>Cons:</strong> Seed phrase is a single point of failure — lose it or expose it and your crypto is gone or stolen</li>
          <li><strong>Best for:</strong> Users comfortable managing and securing a seed phrase</li>
        </ul>

        <h2>Exchange Custody: When It Makes Sense</h2>
        <p>Exchange custody (keeping crypto on Coinbase, etc.) makes sense when:</p>
        <ul>
          <li>You're actively trading frequently</li>
          <li>Holdings are small enough that counterparty risk is acceptable</li>
          <li>You're not yet comfortable with seed phrase management</li>
        </ul>
        <p>It does NOT make sense as your long-term storage for significant holdings — especially holdings you want your heirs to access.</p>

        <h2>Recommendation Framework</h2>
        <ul>
          <li><strong>New to crypto, small holdings:</strong> Start on a reputable exchange, move to Tangem when comfortable</li>
          <li><strong>Growing holdings, security-focused:</strong> Ledger with proper seed phrase storage</li>
          <li><strong>Estate planning focus:</strong> Either hardware wallet, but with a documented access plan for heirs</li>
        </ul>

        <div className="cta-box">
          <p>
            Not sure how to include your cold storage in an estate plan? Explore our Digital Asset Guidance services.
          </p>
          <Link to="/services">Explore Digital Asset Guidance Services →</Link>
        </div>
      </div>
    ),
  },
  'trust-cost': {
    title: 'How Much Does a Trust Actually Cost? (Real Numbers for Real Families)',
    date: 'March 2025',
    category: 'Asset Protection',
    readTime: '5 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          A trust doesn't cost as much as you think — and not having one costs more. Here are real numbers for real
          families.
        </p>

        <h2>The Real Cost Breakdown</h2>
        <h3>Attorney Fees</h3>
        <p>
          A revocable living trust drafted by an estate planning attorney typically costs $1,500–$3,500 for an
          individual and $2,500–$5,000 for a married couple. In high-cost-of-living areas or for complex estates,
          fees can run higher.
        </p>

        <h3>Filing Fees</h3>
        <p>
          Trusts themselves don't require court filing — that's one of their main advantages over wills. However, you
          will need to retitle assets (real estate deed transfers, account beneficiary updates), which may involve
          small recording fees ($25–$100 per deed, typically).
        </p>

        <h3>Ongoing Maintenance</h3>
        <p>
          A simple revocable trust needs minimal ongoing maintenance — update it when major life events occur (marriage,
          divorce, new assets, new beneficiaries). Some attorneys offer annual review packages for $200–$500/year;
          this is optional, not required.
        </p>

        <h2>What Drives Cost Up or Down</h2>
        <ul>
          <li><strong>Complexity:</strong> Multiple beneficiaries, special needs provisions, or business interests add cost</li>
          <li><strong>Geography:</strong> Attorney rates vary significantly by region</li>
          <li><strong>Attorney experience:</strong> Specialists cost more — but get the language right</li>
          <li><strong>Digital assets:</strong> Not all attorneys know how to handle crypto — find one who does</li>
        </ul>

        <h2>DIY vs. Attorney-Drafted: The Real Risk</h2>
        <p>
          Online DIY trust services (LegalZoom, etc.) run $200–$600. The risk is what you don't know you're missing:
          state-specific requirements, digital asset language, special asset handling, pour-over will coordination.
          A trust that's technically valid but poorly drafted may not protect you when you need it most.
        </p>

        <h2>When a Trust Is Worth It — and When It's Overkill</h2>
        <p><strong>Worth it if you have:</strong></p>
        <ul>
          <li>Real estate (especially in multiple states)</li>
          <li>Meaningful crypto or digital asset holdings</li>
          <li>Minor children or special needs beneficiaries</li>
          <li>A small business</li>
          <li>Concerns about family conflict or creditors</li>
        </ul>
        <p><strong>May be overkill if:</strong></p>
        <ul>
          <li>You have very few assets and no real property</li>
          <li>All your accounts already have named beneficiaries</li>
          <li>Your situation is extremely simple and unlikely to change</li>
        </ul>

        <div className="cta-box">
          <p>
            Not sure if a trust is right for your situation? Let's have a no-pressure conversation about your specific
            circumstances.
          </p>
          <Link to="/contact">Book a Free 15-Minute Asset Protection Conversation →</Link>
        </div>
      </div>
    ),
  },
}

function BlogPostPage() {
  const { slug } = Route.useParams()
  const post = posts[slug]

  if (!post) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-amber-400 hover:text-amber-300">
          ← Back to Resources
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm mb-6 transition-colors">
            ← Back to Resources
          </Link>
          <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20 mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-content">{post.content}</div>
        </div>
      </section>
    </>
  )
}
