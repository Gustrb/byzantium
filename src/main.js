/**
 * Made by: Gustrb, 06/09/2023
 * 
 * This file is the entrypoint of the application, it should be responsible for:
 * - parsing the file passed as argument to the CLI
 * - calling the appropriate functions to generate the files
 * - calling the appropriate functions to write the files
 */

const { getConfigFileContent } = require('./cli.js')
const { generateConfigFiles } = require('./generator.js')

async function main() {
  const fileContent = await getConfigFileContent()
  generateConfigFiles(fileContent)
}

main()
