/**
 * Case studies — anonymized client work. Images: Unsplash (free to use).
 * Replace copy and slugs with real engagements when ready.
 */
export const CASE_STUDIES = [
  {
    slug: 'retail-inventory-rate-limit',
    title: 'Beating an ERP rate limit during peak season',
    excerpt:
      'Twelve stores, one legacy ERP, and a 60-requests/minute cap during Black Friday. Caching alone wasn\'t enough—we invented a write-behind ledger that kept shelves honest.',
    industry: 'Retail',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Retail store interior',
    stack: ['redis', 'nodedotjs', 'postgresql'],
    challenge:
      'Real-time inventory displays froze when the ERP throttled API calls. Overselling online became a daily fire drill.',
    workaround:
      'We treated Redis as the store-of-record during peak windows, with a deterministic merge job that reconciled to ERP in five-minute batches when the limit reset.',
    innovation:
      'Per-SKU conflict resolution rules (online vs in-store priority) encoded in version vectors—staff could override from a tablet without touching the ERP UI.',
    outcome: [
      'Oversell incidents near zero during peak week',
      'ERP API usage stayed under 70% of cap',
      'POS and web stock matched within 4 minutes avg.',
    ],
    quote: 'Peak season felt boring—in a good way.',
    role: 'Head of Digital, multi-location retailer',
  },
  {
    slug: 'finance-weekend-migration',
    title: 'Mainframe cutover with no weekend outage',
    excerpt:
      'A credit union needed off the mainframe before license renewal—but regulators wouldn\'t sign off on a big-bang migration. We shipped traffic in slices, one product at a time.',
    industry: 'Finance',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Financial data visualization',
    stack: ['terraform', 'kubernetes', 'googlecloud', 'postgresql'],
    challenge:
      'Prior vendor quoted a 36-hour maintenance window. Members and auditors both said no.',
    workaround:
      'Dual-write shadow mode for 30 days: new cloud stack processed copies while mainframe stayed authoritative until checksum parity hit 99.99% for each product line.',
    innovation:
      'Terraform modules per product boundary let us roll forward or roll back independently—mortgage could migrate while cards stayed on legacy for another sprint.',
    outcome: [
      'No member-facing downtime during cutover',
      'Regulator sign-off on first submission',
      'Infra spend down ~35% post-migration',
    ],
    quote: 'The board asked if we could migrate the rest of the stack too.',
    role: 'CTO, regional credit union',
  },
  {
    slug: 'logistics-offline-drivers',
    title: 'Offline-first when cell towers couldn\'t keep up',
    excerpt:
      'Fleet drivers lost signal in rural corridors; dispatch had stale ETAs. We built a sync engine that treated disconnects as normal—not exceptions.',
    industry: 'Logistics',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Warehouse and logistics operations',
    stack: ['react', 'nodedotjs', 'mongodb'],
    challenge:
      'Mobile web app failed offline; drivers called dispatch on personal phones, breaking compliance and SLA tracking.',
    workaround:
      'Progressive web app with IndexedDB outbox—scans and status updates queued locally, flushed with exponential backoff when signal returned.',
    innovation:
      'Conflict-free replicated data types (CRDTs) for stop order so two drivers updating the same route didn\'t corrupt dispatch state.',
    outcome: [
      'On-time delivery metric up 18% in rural lanes',
      'Dispatch call volume down sharply',
      'Compliance logs captured every scan, online or not',
    ],
    quote: 'Drivers stopped saying the app doesn\'t work out here.',
    role: 'VP Operations, regional logistics firm',
  },
  {
    slug: 'saas-deploy-eight-minutes',
    title: 'From 45-minute deploys to eight—with guardrails',
    excerpt:
      'A B2B SaaS team shipped once a week because their pipeline was brittle. We didn\'t buy a new platform—we rewired the path from merge to prod.',
    industry: 'SaaS',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Engineering team at monitors',
    stack: ['github', 'docker', 'kubernetes', 'prometheus', 'grafana'],
    challenge:
      'Single monolithic Jenkins job; flaky tests; no one knew which commit was in prod after a hotfix.',
    workaround:
      'Split pipeline into parallelized unit, contract, and smoke stages with artifact promotion—only green builds tagged for deploy.',
    innovation:
      'Ephemeral preview namespaces per PR with seeded data let QA sign off before merge; prod deploy became a promote button, not a rebuild.',
    outcome: [
      'Median deploy time 8 minutes',
      'Deploy frequency 3× per week',
      'Rollback under 90 seconds with one command',
    ],
    quote: 'We finally trust our own pipeline.',
    role: 'Engineering lead, B2B SaaS company',
  },
  {
    slug: 'support-ai-triage',
    title: 'AI triage that knows when to shut up',
    excerpt:
      'Support queues grew faster than hiring. We added an AI front door that resolves tier-1 noise and escalates with full context—never without a human path.',
    industry: 'Technology',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Abstract AI and technology visualization',
    stack: ['python', 'react', 'postgresql', 'redis'],
    challenge:
      'Tier-1 tickets duplicated answers from the docs; engineers pulled into password resets and status checks.',
    workaround:
      'RAG over internal runbooks with confidence thresholds—below 0.82 confidence, the bot hands off with transcript and suggested tags, no guessing.',
    innovation:
      'Feedback loop: one-click wrong answer retrains the retrieval index weekly; escalations tagged by root cause for product fixes.',
    outcome: [
      '~40% of tier-1 closed without human touch',
      'Mean time to first human response down 55%',
      'Engineer interrupt rate cut in half',
    ],
    quote: 'Customers get faster answers; engineers get their focus back.',
    role: 'Head of Customer Success, enterprise software vendor',
  },
]

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
