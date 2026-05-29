const path = require('path')
const fs = require('fs').promises

async function readPlatformData(platform) {
  const p = path.join(__dirname, '..', 'data', `${platform}.json`)
  const raw = await fs.readFile(p, 'utf8')
  return JSON.parse(raw)
}

module.exports = { readPlatformData }
