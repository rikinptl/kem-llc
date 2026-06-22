function hasLiveUrl(url) {
  return Boolean(url?.trim().startsWith('http'))
}

function isReached(lead) {
  return Boolean(lead.reachedOut?.trim()) && lead.reachedOut.trim().toUpperCase() !== 'N'
}

export function buildSalesQueue(leads, filter = 'to_call') {
  const withDemo = leads.filter((l) => hasLiveUrl(l.liveUrl) && l.phone?.trim())

  switch (filter) {
    case 'all':
      return withDemo.sort((a, b) => a.name.localeCompare(b.name))
    case 'follow_up':
      return withDemo
        .filter((l) => l.followUp?.trim())
        .sort((a, b) => a.name.localeCompare(b.name))
    case 'declined':
      return withDemo.filter((l) => l.decline).sort((a, b) => a.name.localeCompare(b.name))
    case 'reached':
      return withDemo.filter(isReached).sort((a, b) => a.name.localeCompare(b.name))
    case 'to_call':
    default:
      return withDemo
        .filter((l) => !l.decline && !isReached(l))
        .sort((a, b) => a.name.localeCompare(b.name))
  }
}

export function salesQueueStats(leads) {
  const withDemo = leads.filter((l) => hasLiveUrl(l.liveUrl) && l.phone?.trim())
  return {
    total: withDemo.length,
    toCall: buildSalesQueue(leads, 'to_call').length,
    followUp: buildSalesQueue(leads, 'follow_up').length,
    reached: withDemo.filter(isReached).length,
    declined: withDemo.filter((l) => l.decline).length,
  }
}
