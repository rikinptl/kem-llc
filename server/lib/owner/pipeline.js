import {
  DEPLOY_WORKFLOW_FILE,
  getGithubRepo,
  getGithubToken,
  githubRequest,
} from './github.js'

async function fetchRepoVariable(name, fallback) {
  try {
    const data = await githubRequest(`/actions/variables/${name}`)
    return data?.value?.trim() || fallback
  } catch {
    return fallback
  }
}

export async function getDeployWorkflow() {
  if (!getGithubToken()) {
    return { configured: false, enabled: null, workflowId: null, workflowUrl: null }
  }

  const repo = getGithubRepo()
  const data = await githubRequest(`/actions/workflows/${DEPLOY_WORKFLOW_FILE}`)
  return {
    configured: true,
    enabled: data.state === 'active',
    workflowId: data.id,
    workflowName: data.name,
    workflowUrl: data.html_url,
    repo,
  }
}

async function cancelInProgressRuns() {
  const data = await githubRequest(`/actions/workflows/${DEPLOY_WORKFLOW_FILE}/runs?status=in_progress&per_page=10`)
  const runs = data.workflow_runs ?? []
  await Promise.all(
    runs.map((run) => githubRequest(`/actions/runs/${run.id}/cancel`, { method: 'POST' }).catch(() => null))
  )
  return runs.length
}

async function buildDispatchInputs() {
  const city = process.env.PIPELINE_DEFAULT_CITY || (await fetchRepoVariable('DAILY_CITY', 'dallas'))
  const maxResults =
    process.env.PIPELINE_DEFAULT_MAX_RESULTS || (await fetchRepoVariable('DAILY_MAX_RESULTS', '20'))

  return {
    scrape_mode: 'all_niches',
    niche: 'plumber',
    city,
    max_results: String(maxResults),
    deploy_pending_only: false,
  }
}

export async function getPipelineStatus() {
  const workflow = await getDeployWorkflow()
  if (!workflow.configured) {
    return {
      configured: false,
      enabled: null,
      message: 'GitHub token not configured for pipeline control',
    }
  }

  return {
    configured: true,
    enabled: workflow.enabled,
    workflowUrl: workflow.workflowUrl,
    workflowName: workflow.workflowName,
    repo: workflow.repo,
  }
}

export async function setPipelineEnabled(enabled) {
  const workflow = await getDeployWorkflow()
  if (!workflow.configured) {
    throw new Error('Pipeline control is not configured (missing GITHUB_TOKEN)')
  }

  if (enabled) {
    await githubRequest(`/actions/workflows/${DEPLOY_WORKFLOW_FILE}/enable`, { method: 'PUT' })
    const inputs = await buildDispatchInputs()
    await githubRequest(`/actions/workflows/${DEPLOY_WORKFLOW_FILE}/dispatches`, {
      method: 'POST',
      body: { ref: 'main', inputs },
    })
    return {
      enabled: true,
      dispatched: true,
      inputs,
      message: `Pipeline enabled and started (all niches · ${inputs.city} · max ${inputs.max_results})`,
    }
  }

  const cancelled = await cancelInProgressRuns()
  await githubRequest(`/actions/workflows/${DEPLOY_WORKFLOW_FILE}/disable`, { method: 'PUT' })
  return {
    enabled: false,
    dispatched: false,
    cancelledRuns: cancelled,
    message:
      cancelled > 0
        ? `Pipeline paused (cancelled ${cancelled} in-progress run${cancelled === 1 ? '' : 's'})`
        : 'Pipeline paused — daily scrape and deploy are off',
  }
}
