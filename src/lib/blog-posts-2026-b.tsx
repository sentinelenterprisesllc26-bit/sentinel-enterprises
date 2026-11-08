import { CaregiverCta, CryptoChecklistCta, Disclaimer, WillChecklistCta } from './blog-posts-2026-a'
import { SquadEpisode, YouTubeEmbed } from './video-embeds'
import type { BlogPost } from './blog-posts-2026'

export const postsB: BlogPost[] = [
  {
    slug: 'crypto-doesnt-do-anything-receipts',
    title: `So Crypto "Doesn't Do Anything"? Here's the Receipt`,
    description:
      'Beyond price charts, crypto networks move real money: cross-border payments, stablecoin settlement, and self-custody savings. A plain look at actual uses.',
    excerpt: 'Skip the price chart. Here is what crypto networks are actually used for, with the limits stated plainly.',
    isoDate: '2026-09-30',
    date: 'September 30, 2026',
    category: 'Crypto Planning',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          "Crypto doesn't do anything" is a fair challenge, because a lot of crypto talk is only about price. So let's
          set the chart aside and look at what these networks are actually used for.
        </p>

        <h2>Receipt #1: moving money across borders</h2>
        <p>
          Families who send money home to another country have long paid high fees and waited days. Blockchain networks
          can settle a transfer in seconds to minutes, around the clock, including weekends. Some payment companies now
          use these networks behind the scenes, so the person sending money may never see the crypto part at all.
        </p>

        <SquadEpisode episode="ep01" caption="A $500 transfer, $47 in fees, and why the old route is so slow." />

        <h2>Receipt #2: stablecoins as digital dollars</h2>
        <p>
          Stablecoins are tokens designed to hold a steady value, usually one U.S. dollar each, backed by reserves.
          Businesses use them to pay suppliers and settle trades quickly. In 2025 the U.S. passed its first federal law
          setting rules for payment stablecoins, which tells you regulators see real use worth regulating.
        </p>

        <h2>Receipt #3: holding value without a middleman</h2>
        <p>
          Self-custody lets a person hold an asset directly, with no bank or broker required. For people in countries
          with unstable currencies or limited banking, that can matter a great deal. It also comes with full
          responsibility: lose the keys and there is no one to call.
        </p>

        <h2>The honest limits</h2>
        <ul>
          <li>Prices are volatile, and many tokens have little or no real use.</li>
          <li>Scams are common, especially ones that promise guaranteed returns.</li>
          <li>Taxes apply. Selling, swapping, or spending crypto is generally a taxable event in the U.S.</li>
        </ul>
        <p>Real use and real risk can both be true at the same time. The goal is to see both clearly.</p>

        <CryptoChecklistCta lead="If you hold any crypto, the most useful next step is a plan your family can follow." />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'banking-upgrade-cant-freeze-your-money',
    title: "No, the Banking Upgrade Can't Freeze Your Money",
    description:
      'ISO 20022 is a new messaging format for payments, not a tool for freezing accounts. Here is what changed, what did not, and what can actually freeze an account.',
    excerpt: 'ISO 20022 changed how banks format payment messages. It did not give anyone a new power to freeze your account.',
    isoDate: '2026-10-07',
    date: 'October 7, 2026',
    category: 'Asset Protection',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          A claim keeps circulating that the global banking "upgrade" lets banks freeze everyone's money. It's
          understandable why that sounds scary. It just isn't what the upgrade is.
        </p>

        <h2>What actually changed</h2>
        <p>
          ISO 20022 is a standard for how payment messages are written: the digital "envelope" that carries details like
          who is paying, who is receiving, and why. The old formats had little room for detail. The new one carries
          richer, more structured information.
        </p>
        <p>
          In the U.S., the Federal Reserve moved its Fedwire Funds Service to ISO 20022 on July 14, 2025. The global
          SWIFT network ended its period of running old and new formats side by side in November 2025. Your account
          balance, your rights, and your bank's rules didn't change because of either switch.
        </p>

        <YouTubeEmbed id="hc4XJktTf68" title="The Global Financial System Is Shifting. Are You Ready?" />

        <h2>What can freeze an account (and always could)</h2>
        <ul>
          <li><strong>Court orders,</strong> such as a garnishment or levy tied to a judgment or tax debt.</li>
          <li><strong>Suspected fraud,</strong> when a bank pauses activity to investigate.</li>
          <li><strong>Legal compliance reviews,</strong> such as anti-money-laundering checks.</li>
          <li><strong>A death,</strong> when a sole-owner account may be locked until the estate is sorted out.</li>
        </ul>
        <p>None of these are new, and none of them come from a messaging format.</p>

        <h2>Where planning actually helps</h2>
        <p>
          The freeze most families face isn't dramatic. It's the account that locks when its only owner passes away. A
          payable-on-death designation, joint ownership chosen with care, or a trust can keep money reachable for the
          people who need it. That is the real protection.
        </p>

        <WillChecklistCta lead="Make sure your family won't be locked out of accounts when they need them most." />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'exchange-is-not-self-custody',
    title: "Keeping Your Crypto on an Exchange Isn't Self-Custody",
    description:
      'Crypto held on an exchange is an IOU from that company. Here is the difference between exchange custody and self-custody, and how to choose.',
    excerpt: '"Not your keys, not your crypto" explained in plain English, and when each option makes sense.',
    isoDate: '2026-10-14',
    date: 'October 14, 2026',
    category: 'Crypto Security',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          When you buy crypto on an exchange app, the balance on your screen looks like yours. Legally and practically,
          it is closer to a promise from that company to give it to you when you ask.
        </p>

        <h2>Two ways to hold crypto</h2>
        <ul>
          <li><strong>Exchange custody:</strong> the company holds the keys. You log in with a password, and they can reset it. Convenient, but you depend on the company staying solvent, honest, and open.</li>
          <li><strong>Self-custody:</strong> you hold the keys, usually with a hardware wallet and a written recovery phrase. No one can freeze or lose it for you, and no one can recover it for you either.</li>
        </ul>

        <h2>Why it matters</h2>
        <p>
          When exchanges have failed in the past, customers often waited months or years to get back part of their money
          through bankruptcy court. Exchanges can also pause withdrawals during heavy trading or legal trouble. Coins in
          your own wallet aren't exposed to any of that.
        </p>

        <YouTubeEmbed id="WNlgRXtUtK4" title="No Battery. No App Login. Here's How the Tangem Wallet Works" caption="A beginner-friendly look at a card-style hardware wallet." />

        <h2>So which is right?</h2>
        <p>
          Many people use both. An exchange works as an on-ramp for buying and selling. Long-term holdings then move to
          a hardware wallet they control. Before moving, send a small test amount first and double-check the address.
        </p>
        <p>
          Self-custody adds one extra job: making sure someone you trust can recover the wallet if you can't. Without
          that plan, a self-custody wallet can become a locked vault for your family.
        </p>

        <CryptoChecklistCta lead="Moving to self-custody? Pair it with a recovery plan your family can actually use." />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'digital-dollar-self-custody',
    title: 'A U.S. Digital Dollar Is Banned for Now. Why Self-Custody Still Matters',
    description:
      'A 2026 law bars the Federal Reserve from issuing a central bank digital currency through 2030. Here is what that means, and why self-custody still matters.',
    excerpt: 'Congress blocked a Fed-issued digital dollar through 2030. Most of your money is already digital, though, and that is the part to plan for.',
    isoDate: '2026-10-21',
    date: 'October 21, 2026',
    category: 'Asset Protection',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          For years, people asked whether the U.S. would launch a "digital dollar" issued by the Federal Reserve. For
          now, the answer is no, by law. But most of your money is already digital, and that's worth understanding.
        </p>

        <h2>Where things stand</h2>
        <p>
          A central bank digital currency, or CBDC, is digital money issued directly by a country's central bank. A
          January 2025 executive order directed federal agencies not to pursue one. Then in July 2026, Congress passed a
          law that prohibits the Federal Reserve from creating a CBDC, with the ban set to expire at the end of 2030
          unless it is extended. Other countries are still testing their own versions.
        </p>

        <h2>Your money is already digital</h2>
        <p>
          Your bank balance is a digital record held by a bank. Payment apps and stablecoins are digital dollars held or
          issued by private companies. In each case, someone else keeps the record, and that company can pause or block
          access under its rules and the law.
        </p>

        <YouTubeEmbed id="gruxCAPQWgw" title="Why Self-Custody Matters Before the System Changes Again" />

        <h2>Why self-custody still matters</h2>
        <p>
          Self-custody isn't about distrusting every institution. It's about not keeping all your eggs in one basket. A
          balanced setup might include insured bank accounts for everyday money, plus a portion of long-term savings in
          assets you hold yourself, if that fits your goals and risk tolerance.
        </p>
        <p>
          Whatever the policy headlines say next, the fundamentals stay the same: know who holds your money, know what
          rules apply, and have a plan your family can follow.
        </p>

        <CryptoChecklistCta lead="If part of your savings is in self-custody, make sure it doesn't disappear with you." />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'what-backs-the-dollar-and-crypto',
    title: 'What Actually Backs the Dollar? (And What Actually Backs Crypto?)',
    description:
      'The dollar is not backed by gold. Crypto is not backed by a government. Here is what gives each one value, explained without hype.',
    excerpt: "The dollar hasn't been backed by gold since 1971. So what is behind it, and what is behind crypto?",
    isoDate: '2026-10-28',
    date: 'October 28, 2026',
    category: 'Asset Protection',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          Ask ten people what backs the U.S. dollar and several will say gold. That hasn't been true since 1971. So
          what is behind the money in your wallet, and how does crypto compare?
        </p>

        <h2>What backs the dollar</h2>
        <p>
          The dollar is "fiat" money. Its value rests on a few things working together: the government requires taxes
          to be paid in dollars, the law makes it legal tender for debts, the U.S. economy is large and productive, and
          people around the world trust it and use it for trade. The Federal Reserve manages the supply to try to keep
          prices stable.
        </p>
        <p>
          The weak spot is inflation. When prices rise faster than your savings grow, each dollar buys less over time.
        </p>

        <h2>What backs crypto</h2>
        <p>
          Most crypto has no government or legal tender status behind it. Its value comes from other places: a limited or
          predictable supply, a network people actually use, and the demand of people who want to hold it. That makes
          its value more dependent on adoption and sentiment, which is why prices can swing so sharply.
        </p>
        <p>
          Stablecoins are the exception. They're designed to track a currency like the dollar, backed by reserves the
          issuer holds.
        </p>

        <h2>The takeaway</h2>
        <ul>
          <li>Neither one is "backed by nothing." Each is backed by different things, with different risks.</li>
          <li>The dollar's main risk is slow loss of buying power. Crypto's main risks are volatility and loss of access.</li>
          <li>Understanding both helps you decide how much of each fits your plan.</li>
        </ul>

        <WillChecklistCta lead="Whatever you save in, a written plan protects your family from the bigger risk: confusion." />
        <Disclaimer />
      </div>
    ),
  },
  {
    slug: 'paid-to-care-for-a-parent-tax-break',
    title: "Getting Paid to Care for a Parent? Here's the Tax Break the IRS Doesn't Advertise",
    description:
      'Under IRS Notice 2014-7, some caregivers paid through Medicaid waiver programs can exclude that income from federal tax. Here is who may qualify.',
    excerpt: 'If a state program pays you to care for a family member who lives with you, some or all of that pay may be tax-free.',
    isoDate: '2026-11-04',
    date: 'November 4, 2026',
    category: 'Caregiver Tax',
    readTime: '4 min read',
    content: (
      <div className="prose-content">
        <p className="lead">
          Thousands of family caregivers are paid through state Medicaid programs to care for a parent, spouse, or adult
          child. Many of them pay federal income tax on that pay when they may not have to.
        </p>

        <h2>The rule in plain English</h2>
        <p>
          In 2014 the IRS issued Notice 2014-7. It says certain payments made under a state Medicaid waiver program for
          caring for someone who lives in your home can be treated as "difficulty of care" payments, which are generally
          excluded from federal income tax.
        </p>

        <SquadEpisode episode="ep03" caption="Maria cares for her mom through a state program. Here's what she almost missed." />

        <h2>Who may qualify</h2>
        <ul>
          <li>You are paid through a state Medicaid home- and community-based services waiver program, or a similar Medicaid program.</li>
          <li>The person you care for lives with you in your home.</li>
          <li>You are caring for that person under the program's plan of care.</li>
        </ul>
        <p>
          It generally doesn't matter whether you are related to the person. What matters is the program and that you
          share a home. Pay for caring for someone who lives elsewhere doesn't qualify under this notice.
        </p>

        <h2>Two things to know</h2>
        <ul>
          <li><strong>Your W-2 may still show the income.</strong> Many employers and agencies report it anyway. A tax professional can show it correctly on your return so it isn't taxed.</li>
          <li><strong>It can affect tax credits.</strong> Under IRS guidance and Tax Court rulings, you can generally choose to count this income for the Earned Income Tax Credit and Child Tax Credit, which can sometimes increase your refund. Ask your preparer to run it both ways.</li>
        </ul>
        <p>
          If you've paid tax on qualifying payments in past years, you may be able to file amended returns, generally
          within three years of the original filing.
        </p>

        <CaregiverCta lead="Our free caregiver checklist lists what to bring to your tax preparer so nothing gets missed." />
        <Disclaimer />
      </div>
    ),
  },
]
