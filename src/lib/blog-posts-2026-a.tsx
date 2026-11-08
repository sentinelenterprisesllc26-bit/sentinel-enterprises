import { Link } from '@tanstack/react-router'
import { SquadEpisode, YouTubeEmbed } from './video-embeds'
import type { BlogPost } from './blog-posts-2026'

export function Disclaimer() {
  return (
    <p className="text-sm text-slate-500 italic mt-10">
      Educational only. Sentinel Enterprises LLC is not a law firm, CPA firm, financial advisor, or fiduciary, and this
      post is not legal, tax, or investment advice. Rules vary by state and by situation, so confirm the details with a
      licensed professional before you act.
    </p>
  )
}

export function CryptoChecklistCta({ lead }: { lead: string }) {
  return (
    <div className="cta-box">
      <p>{lead}</p>
      <Link to="/crypto-inheritance-checklist">Get the Free Crypto Inheritance Checklist →</Link>
    </div>
  )
}

export function WillChecklistCta({ lead }: { lead: string }) {
  return (
    <div className="cta-box">
      <p>{lead}</p>
      <Link to="/will">Get the Free Will &amp; Legacy Checklist →</Link>
    </div>
  )
}

export function CaregiverCta({ lead }: { lead: string }) {
  return (
    <div className="cta-box">
      <p>{lead}</p>
      <a href="/#email-signup">Get the Free Caregiver Tax Checklist →</a>
    </div>
  )
}

export const postsA: BlogPost[] = [
  {
    slug: 'seed-phrase-is-not-a-password',
    title: "Your Seed Phrase Isn't a Password",
    description:
      'A seed phrase is not a password you can reset. It is the wallet itself. Here is what that means, how people lose crypto, and how to store it safely.',
    excerpt: "A password protects an account. A seed phrase IS the account. Treat it like a password and you can lose everything.",
    isoDate: '2026-08-19',
    date: 'August 19, 2026',
    category: 'Crypto Security',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          A password protects an account. A seed phrase is the account. That one difference is behind a huge share of
          lost and stolen crypto.
        </p>

        <h2>What a seed phrase actually is</h2>
        <p>
          When you set up a self-custody wallet, it gives you 12 or 24 words in a specific order. Those words are a
          human-readable version of the master key that controls every coin in that wallet. Anyone who has them can
          rebuild your wallet on any device, anywhere, and move everything out. No email confirmation. No "was this
          you?" text. No customer service line to call.
        </p>
        <p>
          A password works differently. If someone steals your bank password, the bank can lock the account, reverse
          charges, and let you reset it. A seed phrase can't be reset, and a crypto transaction can't be reversed.
        </p>

        <YouTubeEmbed id="2CFabC1XVj4" title="Never Write Your Seed Phrase Like This" caption="The most common storage mistakes, in under a minute." />

        <h2>The mistakes we see most</h2>
        <ul>
          <li><strong>Typing it into a phone or computer.</strong> Notes apps, photos, email drafts, and cloud documents can all be synced, backed up, or hacked.</li>
          <li><strong>Entering it on a website.</strong> No real wallet company, exchange, or "support agent" will ever ask for it. Anyone who does is a scammer.</li>
          <li><strong>Keeping one copy in one place.</strong> A house fire or flood can take your only backup with it.</li>
          <li><strong>Telling no one it exists.</strong> If you pass away and nobody knows the phrase is there, the crypto is effectively gone for good.</li>
        </ul>

        <h2>A safer setup</h2>
        <p>
          Write the words by hand, in order, on paper or a metal backup plate made for this purpose. Keep at least two
          copies in two secure locations, such as a home safe and a safe-deposit box. Never photograph them.
        </p>
        <p>
          Then handle the part most people skip: a plan for who can find the phrase if something happens to you, and
          how. That doesn't mean handing it over today. It means written instructions, kept with your estate documents,
          that explain where the backup lives and who should be trusted to access it.
        </p>

        <h2>The one rule to remember</h2>
        <p>
          If a person, a website, or an app asks for your seed phrase, the answer is no. Every time. A legitimate service
          will never need it.
        </p>

        <CryptoChecklistCta lead="Want a simple way to make sure your family can recover your crypto, without exposing your keys today?" />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'inherited-the-house-tax-bill',
    title: 'Inherited the House, But the Tax Bill Inherited Them Too',
    description:
      'Inheriting a family home can come with property tax, capital gains, and deed surprises. Here is what families should know before and after a parent passes.',
    excerpt: 'Inheriting the family home feels like a gift until the tax bills arrive. Here is what catches families off guard, and how planning ahead helps.',
    isoDate: '2026-08-26',
    date: 'August 26, 2026',
    category: 'Caregiver Tax',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          Many caregivers spend years looking after a parent, and the family home is often the biggest thing left
          behind. Inheriting it can feel like a gift. Then the tax bills start arriving.
        </p>

        <h2>Surprise #1: the step-up that saves you, or doesn't</h2>
        <p>
          When you inherit a home, federal tax rules generally reset its value for capital gains purposes to what it was
          worth on the date of death. This is called a "stepped-up basis." If Mom bought the house for $60,000 and it was
          worth $220,000 when she passed, you generally start at $220,000. Sell soon after for about that price, and
          there may be little or no capital gains tax.
        </p>
        <p>
          Here is the catch. If a parent added a child to the deed while still living, that share is usually treated
          as a gift, not an inheritance. Gifts keep the original, lower basis. A well-meant shortcut to "avoid probate"
          can quietly create a much bigger tax bill later.
        </p>

        <h2>Surprise #2: property taxes can jump</h2>
        <p>
          Many states and counties give older homeowners exemptions or freezes on property tax. Those usually end when
          the owner passes. Some areas also reassess the home's value when ownership changes. The new owner may face a
          noticeably higher yearly bill, and missed payments can lead to penalties or a tax lien.
        </p>

        <h2>Surprise #3: the house may be stuck in probate</h2>
        <p>
          If the home was titled only in the parent's name with no plan in place, it may have to go through probate
          before anyone can sell or refinance it. Meanwhile, someone still has to pay the taxes, insurance, and
          utilities, and that is often the caregiver who lived there.
        </p>

        <h2>What helps</h2>
        <ul>
          <li><strong>Talk before it's urgent.</strong> Ask how the home is titled and whether there is a will, trust, or transfer-on-death deed (if your state allows one).</li>
          <li><strong>Don't add names to a deed without advice.</strong> Ask a tax professional about the basis consequences first.</li>
          <li><strong>Keep records.</strong> A date-of-death appraisal and receipts for improvements matter when it's time to sell.</li>
          <li><strong>Call the county assessor early.</strong> Ask what exemptions end, when, and what the new bill may look like.</li>
        </ul>

        <CaregiverCta lead="Caring for a parent now? Our free checklist covers the tax questions caregivers should raise early." />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'beneficiary-designation-outlives-person',
    title: 'A Beneficiary Designation Can Outlive the Person It Names',
    description:
      'Beneficiary forms on life insurance and retirement accounts usually override your will. Outdated forms are one of the most common estate planning mistakes.',
    excerpt: 'Your will says one thing. A form you filled out 15 years ago says another. Guess which one usually wins.',
    isoDate: '2026-09-02',
    date: 'September 2, 2026',
    category: 'Asset Protection',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          Your will says one thing. A form you filled out 15 years ago says another. For life insurance, retirement
          accounts, and many bank accounts, that old form usually wins.
        </p>

        <h2>Why the form beats the will</h2>
        <p>
          Life insurance, 401(k)s, IRAs, annuities, and accounts marked "payable on death" pass by contract. The company
          pays whoever is named on its beneficiary form. Your will generally doesn't control those accounts at all. That
          is great when the form is current. It is a problem when it isn't.
        </p>

        <h2>How a form goes stale</h2>
        <ul>
          <li><strong>Divorce.</strong> An ex-spouse may still be listed. Some state laws revoke an ex-spouse automatically, but those laws don't apply to every type of account, including many employer plans.</li>
          <li><strong>A beneficiary dies first.</strong> If no backup is named, the money may fall to your estate and go through probate.</li>
          <li><strong>A minor is named.</strong> Insurance companies generally can't pay a child directly, so a court may need to appoint someone to manage the money.</li>
          <li><strong>New family members.</strong> A child or grandchild born after you filled out the form isn't on it.</li>
        </ul>

        <SquadEpisode episode="ep04" caption="The Squad builds a family's protection one layer at a time, including the paperwork." />

        <h2>A 20-minute fix</h2>
        <ol>
          <li>List every account that has a beneficiary: life insurance, work retirement plans, IRAs, annuities, bank and brokerage accounts.</li>
          <li>Log in or call each company and ask who is named, both primary and contingent.</li>
          <li>Update anything outdated, and always name a backup.</li>
          <li>If a minor or someone receiving disability benefits would inherit, ask an attorney whether a trust should be named instead.</li>
          <li>Save confirmation copies with your estate documents.</li>
        </ol>
        <p>Then put a reminder on your calendar to repeat the check after any marriage, divorce, birth, or death in the family.</p>

        <WillChecklistCta lead="Our free checklist walks through the documents and forms to update after major life changes." />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'sentinel-squad-is-back',
    title: "The Sentinel Squad Is Back, and They're Explaining Your Money",
    description:
      'Sentinel Squad is an animated series that explains payments, crypto self-custody, caregiver taxes, and asset protection in plain English. Season One is streaming now.',
    excerpt: 'Cartoons about wire fees, recovery phrases, and caregiver taxes? Yes. Season One of Sentinel Squad is streaming now.',
    isoDate: '2026-09-09',
    date: 'September 9, 2026',
    category: 'Crypto Planning',
    readTime: '3 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          Money topics are hard to explain and easy to tune out. So we made them a cartoon. Sentinel Squad is our
          animated series that turns real money problems into short, plain-English stories.
        </p>

        <h2>Why a cartoon?</h2>
        <p>
          Because the people who most need this information rarely sit through a 40-minute lecture. A two-minute story
          about a family paying $47 to send $500 sticks in a way a chart never will. Every episode follows the same
          pattern: a real-life problem, a clear explanation, and one thing you can do about it.
        </p>

        <SquadEpisode episode="ep01" caption="Follow a $500 wire through the old banking maze." />

        <h2>What Season One covers</h2>
        <ul>
          <li><strong>Episode 1, The Old Bank Trick:</strong> why international transfers are slow and expensive, and what ISO 20022 really is (a messaging standard, not a coin).</li>
          <li><strong>Episode 2, The Vault Without a Key:</strong> why the recovery phrase is the real key to crypto, and the three parts of an inheritance plan.</li>
          <li><strong>Episode 3, The Missing Deductions:</strong> how some family caregivers paid through state programs may be able to exclude that income under IRS Notice 2014-7.</li>
          <li><strong>Episode 4, Building the Shield:</strong> asset protection for regular families, not just millionaires.</li>
        </ul>

        <h2>The ground rules</h2>
        <p>
          The Squad teaches. It doesn't sell coins, predict prices, or promise outcomes. When a topic gets technical, we
          say what is known, what isn't, and where to check the facts yourself.
        </p>

        <div className="cta-box">
          <p>All four Season One episodes are free to watch, no sign-up needed.</p>
          <Link to="/sentinel-squad">Watch Sentinel Squad Season One →</Link>
        </div>
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'xrp-isnt-dead',
    title: "XRP Isn't Dead. Here's the Actual Job It Does",
    description:
      'XRP was built to settle payments quickly between currencies. Here is what that job is, how bridge assets work, and why price talk misses the point.',
    excerpt: '"XRP is dead" has been said for years. Here is the job it was actually built to do, explained without the hype.',
    isoDate: '2026-09-16',
    date: 'September 16, 2026',
    category: 'Crypto Planning',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          "XRP is dead" gets said every time the price goes sideways. But price and purpose are two different
          questions. This post is about purpose: what XRP was built to do, in plain English.
        </p>

        <h2>The problem: moving money between currencies</h2>
        <p>
          Sending money across borders traditionally runs through a chain of banks. To make that work, banks often keep
          money parked in accounts in other countries, ready to pay out locally. That parked money is expensive to
          maintain, and the chain of handoffs adds fees and days of delay.
        </p>

        <h2>The job: a bridge between currencies</h2>
        <p>
          XRP was designed to act as a "bridge asset." Instead of keeping pre-funded accounts everywhere, a payment
          provider can convert dollars to XRP, send it over the XRP Ledger in a few seconds, and convert it to pesos or
          another currency on the other end. The XRP is only held for moments. Its job is to carry value from one side
          to the other, quickly and cheaply.
        </p>

        <YouTubeEmbed id="BH8TsbOeM1E" title="How XRP Could Power the Next Era of Global Payments" />

        <h2>What that doesn't mean</h2>
        <ul>
          <li><strong>It doesn't mean every bank uses XRP.</strong> Many payment partnerships use other parts of Ripple's software without touching XRP at all.</li>
          <li><strong>It doesn't guarantee a price.</strong> Real-world use is one input among many. Anyone promising a specific number is guessing.</li>
          <li><strong>It isn't the only option.</strong> Stablecoins and other networks compete for the same payment job.</li>
        </ul>

        <h2>How to think about it</h2>
        <p>
          If you hold XRP, know why you hold it, and keep the amount within what you can afford to lose. Then focus on
          what you control: secure storage, a written plan for your family, and records for tax time.
        </p>

        <CryptoChecklistCta lead="Holding XRP for the long term? Make sure your family can actually reach it." />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'xrp-vs-ripple',
    title: "XRP vs. Ripple: Why These Aren't the Same Thing",
    description:
      'XRP is a digital asset on an open ledger. Ripple is a company. Mixing them up leads to bad headlines and bad decisions. Here is the difference.',
    excerpt: 'One is a digital asset. One is a company. Mixing them up is behind a lot of confusing headlines.',
    isoDate: '2026-09-23',
    date: 'September 23, 2026',
    category: 'Crypto Planning',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          "Ripple" and "XRP" get used as if they mean the same thing. They don't, and knowing the difference helps you
          read the news without getting misled.
        </p>

        <h2>Three separate things</h2>
        <ul>
          <li><strong>The XRP Ledger</strong> is an open, public blockchain. It runs on independent computers around the world, and anyone can build on it.</li>
          <li><strong>XRP</strong> is the digital asset native to that ledger. It pays tiny network fees and can act as a bridge between currencies.</li>
          <li><strong>Ripple</strong> is a private company. It builds payment software for banks and businesses, holds a large amount of XRP, and contributes to the ledger, but it doesn't own or control the network.</li>
        </ul>

        <h2>Why it matters</h2>
        <p>
          A headline that says "Ripple signs deal with Bank X" is about the company's software. It doesn't automatically
          mean that bank is buying or using XRP. Some Ripple products use XRP; others don't. Read the details before you
          assume.
        </p>
        <p>
          The same goes the other way. News about the company (lawsuits, leadership, funding) affects Ripple directly.
          How it affects XRP is a separate, and often less certain, question.
        </p>

        <YouTubeEmbed id="f0NAbB9YjMQ" title="Is XRP Becoming the Global Standard for Value Transfer?" />

        <h2>A simple test for any headline</h2>
        <ol>
          <li>Is this about the company, the ledger, or the asset?</li>
          <li>Does the source say XRP is actually being used, or only Ripple's software?</li>
          <li>Is there a primary source, such as a company announcement or official filing?</li>
        </ol>
        <p>Three questions, and most of the confusion goes away.</p>

        <CryptoChecklistCta lead="Whatever you hold, the most important step is making sure it's protected and passable to your family." />
        <Disclaimer />
      </div>
    ),
  },
]
