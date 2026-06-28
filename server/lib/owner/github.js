const SINGLE_RE = /Scrape \+ deploy (.+) in (.+)/i
const PARALLEL_RE = /Parallel scrape \((\d+) max\) in (.+)/i
const PENDING_RE = /^Deploy pending leads$/i

export const DEPLOY_WORKFLOW_FILE = 'deploy.yml'

export function getGithubRepo() {
  return process.env.OWNER_GITHUB_REPO || process.env.GITHUB_REPO || 'rikinptl/web-auto'
}

export function getGithubToken() {
  return process.env.OWNER_GITHUB_TOKEN || process.env.GITHUB_TOKEN || ''
}

export function githubHeaders(token = getGithubToken()) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

export async function githubRequest(path, { method = 'GET', body } = {}) {
  const token = getGithubToken()
  if (!token) throw new Error('GITHUB_TOKEN is not set')

  const repo = getGithubRepo()
  const url = path.startsWith('http')
    ? path
    : `https://api.github.com/repos/${repo}${path.startsWith('/') ? path : `/${path}`}`

  const res = await fetch(url, {
    method,
    headers: {
      ...githubHeaders(token),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub API ${res.status}: ${text.slice(0, 300)}`)
  }

  if (res.status === 204) return null
  return res.json()
}

function parseRunName(name) {
  if (PENDING_RE.test(name)) {
    return { niche: null, city: null, runMode: 'pending', maxResults: null }
  }
  const parallel = name.match(PARALLEL_RE)
  if (parallel) {
    return {
      niche: 'all niches',
      city: parallel[2].replace(/_/g, ' '),
      runMode: 'all_niches',
      maxResults: Number.parseInt(parallel[1], 10) || null,
    }
  }
  const single = name.match(SINGLE_RE)
  if (single) {
    return {
      niche: single[1].replace(/_/g, ' '),
      city: single[2].replace(/_/g, ' '),
      runMode: 'single',
      maxResults: null,
    }
  }
  return { niche: null, city: null, runMode: 'unknown', maxResults: null }
}

function durationSec(start, end) {
  if (!end) return null
  return Math.max(0, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 1000))
}

export async function fetchWorkflowRuns(limit = 40) {
  const data = await githubRequest(`/actions/workflows/${DEPLOY_WORKFLOW_FILE}/runs?per_page=${limit}`)
  return (data.workflow_runs ?? []).map((run) => ({
    id: run.id,
    name: run.name,
    status: run.status,
    conclusion: run.conclusion,
    createdAt: run.created_at,
    updatedAt: run.updated_at,
    durationSec: durationSec(run.created_at, run.updated_at),
    htmlUrl: run.html_url,
    ...parseRunName(run.name),
  }))
}
