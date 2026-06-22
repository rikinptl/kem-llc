import { google } from 'googleapis'

const READONLY_SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly'
const READWRITE_SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

function getAuth(write = false) {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')
  const credentials = JSON.parse(raw)
  return new google.auth.GoogleAuth({
    credentials,
    scopes: [write ? READWRITE_SCOPE : READONLY_SCOPE],
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

function columnLetter(index) {
  let n = index + 1
  let s = ''
  while (n > 0) {
    const rem = (n - 1) % 26
    s = String.fromCharCode(65 + rem) + s
    n = Math.floor((n - 1) / 26)
  }
  return s
}

export function leadKey(name, phone) {
  return `${String(name || '').trim()}::${String(phone || '').trim()}`
}

function rowToLead(row, col, rowIndex) {
  const name = cell(row, col, 'Business Name')
  if (!name.trim()) return null
  return {
    rowIndex,
    name,
    niche: cell(row, col, 'Niche'),
    phone: cell(row, col, 'Phone'),
    city: cell(row, col, 'City'),
    address: cell(row, col, 'Address'),
    scrapedStatus: cell(row, col, 'Scraped Status'),
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

  const auth = getAuth(false)
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A1:O1000',
  })

  const rows = res.data.values ?? []
  if (rows.length <= 1) return []

  const col = headerIndex(rows[0])
  return rows
    .slice(1)
    .map((row, i) => rowToLead(row, col, i + 2))
    .filter(Boolean)
}

const SALES_EDITABLE = {
  Comments: 'comments',
  'Reached Out': 'reachedOut',
  Decline: 'decline',
  'Follow up': 'followUp',
}

export async function updateLeadOutreach(rowIndex, fields) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  if (!spreadsheetId) throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not set')
  if (!rowIndex || rowIndex < 2) throw new Error('Invalid row index')

  const auth = getAuth(true)
  const sheets = google.sheets({ version: 'v4', auth })

  const headerRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!1:1',
  })
  const headerRow = headerRes.data.values?.[0] ?? []
  const col = headerIndex(headerRow)

  const data = []

  if (fields.comments !== undefined && col.has('Comments')) {
    data.push({
      range: `Sheet1!${columnLetter(col.get('Comments'))}${rowIndex}`,
      values: [[String(fields.comments).slice(0, 2000)]],
    })
  }
  if (fields.reachedOut !== undefined && col.has('Reached Out')) {
    data.push({
      range: `Sheet1!${columnLetter(col.get('Reached Out'))}${rowIndex}`,
      values: [[String(fields.reachedOut).slice(0, 200)]],
    })
  }
  if (fields.followUp !== undefined && col.has('Follow up')) {
    data.push({
      range: `Sheet1!${columnLetter(col.get('Follow up'))}${rowIndex}`,
      values: [[String(fields.followUp).slice(0, 200)]],
    })
  }
  if (fields.decline !== undefined && col.has('Decline')) {
    data.push({
      range: `Sheet1!${columnLetter(col.get('Decline'))}${rowIndex}`,
      values: [[fields.decline ? 'Y' : '']],
    })
  }

  if (data.length === 0) {
    throw new Error('No editable columns found in sheet header row')
  }

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data,
    },
  })

  return { updated: data.length }
}

export { SALES_EDITABLE }
