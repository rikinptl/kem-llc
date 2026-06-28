import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { fetchWorkflowRuns } from './github.js'
import { buildAiCostStats } from './deepseek.js'
import { fetchLeadsFromSheet } from './sheets.js'
import { getPipelineStatus } from './pipeline.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const markets = JSON.parse(readFileSync(join(__dirname, '../../data/markets.json'), 'utf8'))

function isDone(value) {
  return value.trim().toLowerCase() === 'done'
}

function hasLiveUrl(url) {
  return Boolean(url?.trim() && url.startsWith('http'))
}

function computeStats(leads) {
  const scraped = leads.filter((l) => isDone(l.scrapedStatus)).length
  const liveSites = leads.filter((l) => hasLiveUrl(l.liveUrl)).length
  return {
    total: leads.length,
    scraped,
    scrapedPending: leads.length - scraped,
    liveSites,
    readyToDeploy: leads.filter((l) => isDone(l.scrapedStatus) && !hasLiveUrl(l.liveUrl)).length,
  }
}

function countBy(items, pick) {
  const map = new Map()
  for (const item of items) {
    const key = pick(item)
    if (!key) continue
    map.set(key, (map.get(key) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
}

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function buildCoverage(leads, runs) {
  const rows = []
  for (const niche of markets.niches) {
    for (const city of markets.cities) {
      const nicheNorm = normalize(niche.label)
      const cityNorm = normalize(city.label)

      const matchingLeads = leads.filter((l) => {
        const ln = normalize(l.niche)
        const lc = normalize(l.city)
        return (
          (ln.includes(normalize(niche.search_term)) || ln.includes(nicheNorm)) &&
          (lc.includes(normalize(city.search_term)) || lc.includes(cityNorm))
        )
      })

      const matchingRuns = runs.filter((r) => {
        if (r.runMode === 'all_niches') {
          return (
            normalize(r.city ?? '').includes(normalize(city.search_term)) ||
            normalize(r.city ?? '').includes(normalize(city.label))
          )
        }
        if (!r.niche || !r.city) return false
        return (
          (normalize(r.niche).includes(normalize(niche.id.replace(/_/g, ' '))) ||
            normalize(r.niche).includes(normalize(niche.label))) &&
          (normalize(r.city).includes(normalize(city.id.replace(/_/g, ' '))) ||
            normalize(r.city).includes(normalize(city.label)))
        )
      })

      const lastRun = matchingRuns[0] ?? null
      rows.push({
        nicheId: niche.id,
        nicheLabel: niche.label,
        cityId: city.id,
        cityLabel: city.label,
        phase: city.phase,
        leadCount: matchingLeads.length,
        liveCount: matchingLeads.filter((l) => hasLiveUrl(l.liveUrl)).length,
        lastRunAt: lastRun?.createdAt ?? null,
        lastRunStatus: lastRun?.conclusion ?? lastRun?.status ?? null,
      })
    }
  }
  return rows
}

export async function getDashboardData() {
  const errors = []
  let leads = []
  let runs = []

  try {
    leads = await fetchLeadsFromSheet()
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'Failed to load Google Sheet')
  }

  try {
    runs = await fetchWorkflowRuns(40)
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'Failed to load GitHub Actions runs')
  }

  const stats = computeStats(leads)
  const byNiche = countBy(leads, (l) => l.niche).map(({ key, count }) => ({ niche: key, count }))
  const byCity = countBy(leads, (l) => l.city).map(({ key, count }) => ({ city: key, count }))

  const completed = runs.filter((r) => r.status === 'completed')
  const success = completed.filter((r) => r.conclusion === 'success')
  const failure = completed.filter((r) => r.conclusion === 'failure')

  const repo = process.env.OWNER_GITHUB_REPO || process.env.GITHUB_REPO || 'rikinptl/web-auto'
  const deployOrg = process.env.DEPLOY_ORG || 'kem-llc'
  const aiCost = await buildAiCostStats(stats.liveSites)

  let pipeline = { configured: false, enabled: null }
  try {
    pipeline = await getPipelineStatus()
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'Failed to load pipeline status')
  }

  const reached = (l) => Boolean(l.reachedOut?.trim()) && l.reachedOut.trim().toUpperCase() !== 'N'
  const outreach = {
    reached: leads.filter(reached).length,
    declined: leads.filter((l) => l.decline).length,
    needsFollowUp: leads.filter((l) => l.followUp?.trim()).length,
    pendingOutreach: leads.filter(
      (l) => hasLiveUrl(l.liveUrl) && !l.decline && !reached(l)
    ).length,
  }

  const marketsTotal = markets.niches.length * markets.cities.length

  return {
    fetchedAt: new Date().toISOString(),
    stats,
    leads,
    byNiche,
    byCity,
    runs,
    runSummary: {
      total: runs.length,
      success: success.length,
      failure: failure.length,
      lastSuccessAt: success[0]?.createdAt ?? null,
      lastFailureAt: failure[0]?.createdAt ?? null,
      successRate: completed.length ? Math.round((success.length / completed.length) * 100) : 0,
    },
    markets,
    coverage: buildCoverage(leads, runs),
    aiCost,
    outreach,
    marketsTotal,
    pipeline,
    links: {
      sheets: process.env.GOOGLE_SHEETS_URL ?? null,
      actions:
        process.env.GITHUB_ACTIONS_URL ??
        `https://github.com/${repo}/actions/workflows/deploy.yml`,
      demo: `https://github.com/${repo}/actions/workflows/demo.yml`,
      repo: `https://github.com/${repo}`,
      kemOrg: `https://github.com/${deployOrg}`,
      monitorRepo: 'https://github.com/rikinptl/web-auto/tree/monitor',
    },
    errors,
  }
}
