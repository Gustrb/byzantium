/**
 * Made by: Gustrb, 06/09/2023
 */

const { writeFileSync } = require('node:fs')

const OUTPUT_FILE = '.eslintrc.json'

/**
 * Function responsible for building the file config
 * based on the configuration file passed to the CLI
 * 
 * @param {{ [key: string]: any }} val is the parsed file
 */
function build(val) {
  const stringfiedFile = JSON.stringify(val, null, 2)

  writeFileSync(OUTPUT_FILE, stringfiedFile)
}

module.exports = { build }
