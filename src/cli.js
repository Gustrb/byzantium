/**
 * Made by: Gustrb, 06/09/2023
 *
 * If no argument is provided (through argv) we should look
 * at the file at current directory, called byzantium.json or
 * and parse it accordingly.
 * Today, there is only support for .json files
 *
 */
const { readFile } = require('node:fs/promises')
const path = require('node:path')

const FALLBACK_FILES = [ 'byzantium.json' ]

class InvalidUsageException extends Error {}

function getArgument() {
  return process.argv[2]
}

/**
 * Returns the content of the file to be parsed, if no argument is passed.
 * An argument is passed when the user calls the CLI with a file to be parsed.
 * If no argument is passed, we should look at current directory for a file
 * called byzantium.json or byzantium.js
 * @returns {Promise<{ filepath: string, content: string }>} the content of the file to be parsed
 */
function getConfigFileContent() {
  if (!getArgument()) {
    return getFileToLoadConfigs()
  }

  const filepath = path.join(process.cwd(), getArgument())
  return getFileToLoadConfigs(filepath)
}

/**
 * This function is responsible for loading the file to be parsed, a file to be parsed is:
 * - a file passed as argument to the CLI
 * - a file called byzantium.json or byzantium.js at current directory
 *
 * @throws {InvalidUsageException} if no file is found
 * @param {string|undefined} argument is the first argument passed to the CLI (undefined if no argument is passed) 
 * @returns {Promise<{ filepath: string, content: string }>} the content of the file to be parsed
 */
async function getFileToLoadConfigs(argument) {
  // if argument is undefined, we should look at current directory
  if (!argument) {
    return loadContentFromFallbackFiles()
  }

  const content = await readFile(argument, { encoding: 'utf-8' })
  return { filepath: argument, content }
}

async function loadContentFromFallbackFiles() {
  const readFilePromises = FALLBACK_FILES.map(filename => {
    const filepath = path.join(process.cwd(), filename)
    return readFile(filepath, { encoding: 'utf-8' })
  });

  const fileContentPromises = await Promise.allSettled(readFilePromises)

  // get the first file that is fulfilled
  const fileContent = fileContentPromises.find(promise => promise.status === 'fulfilled')

  if (!fileContent) {
    throw new InvalidUsageException()
  }

  return {
    filepath: path.join(process.cwd(), FALLBACK_FILES[fileContentPromises.indexOf(fileContent)]),
    content: fileContent.value
  }
}

module.exports = {
  getConfigFileContent,
  InvalidUsageException
}
