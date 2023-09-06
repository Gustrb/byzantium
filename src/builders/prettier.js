/**
 * Made by: Gustrb, 06/09/2023
 */
const { writeFileSync } = require('node:fs')

const OUTPUT_FILE = '.prettierrc'

function build(val) {
  const stringfiedFile = JSON.stringify(val, null, 2)

  writeFileSync(OUTPUT_FILE, stringfiedFile)
}

module.exports = { build }
