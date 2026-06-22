import { google } from 'googleapis'

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')
  const credentials = JSON.parse(raw)
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
}

function headerIndex(headerRow) {
  const map = new Map()
  headerRow.forEach((name, index) => {
    const key = name.trim()
    if (key) map.set(key, index)
  })
  return map
}

function cell(row, col, name) {
  const index = col.get(name)
  if (index === undefined) return ''
  return row[index] ?? ''
}

function parseRating(raw) {
  if (!raw?.trim()) return null
  const n = Number.parseFloat(raw.trim())
  return Number.isFinite(n) && n > 0 ? n : null
}

function rowToLead(row, col) {
  const name = cell(row, col, 'Business Name')
  if (!name.trim()) return null
  return {
    name,
    niche: cell(row, col, 'Niche'),
    phone: cell(row, col, 'Phone'),
    city: cell(row, col, 'City'),
    address: cell(row, col, 'Address'),
    scrapedStatus: cell(row, col, 'Scraped Status'),
    copyStatus: cell(row, col, 'DeepSeek Copy Status'),
    liveUrl: cell(row, col, 'Live URL'),
    mapsUrl: cell(row, col, 'Google Maps URL'),
    siteCreatedAt: cell(row, col, 'Site Created').trim() || null,
    rating: parseRating(cell(row, col, 'Rating')),
    comments: cell(row, col, 'Comments'),
    reachedOut: cell(row, col, 'Reached Out'),
    followUp: cell(row, col, 'Follow up'),
    decline: cell(row, col, 'Decline').trim().toUpperCase() === 'Y',
  }
}

export async function fetchLeadsFromSheet() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  if (!spreadsheetId) throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not set')

  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A1:O1000',
  })

  const rows = res.data.values ?? []
  if (rows.length <= 1) return []

  const col = headerIndex(rows[0])
  return rows.slice(1).map((row) => rowToLead(row, col)).filter(Boolean)
}
