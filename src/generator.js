/**
 * Made by: Gustrb, 06/09/2023
 * 
 * This file is responsible for generating the files based on the configuration
 * file passed to the CLI.
 * Here we will:
 * - parse the file passed to the CLI
 * - call the appropriate functions to generate the files (based on the object keys from the parsed file)
 */

/**
 * This is the list of supported file extensions
 */
const SUPPORTED_EXTENSIONS = [ 'json' ]
const SUPPORTED_KEY = [ 'eslint', 'prettier' ];

/**
 * This is the exception thrown when the file extension is not supported
 * 
 */
class UnsuportedFileExtensionException extends Error {
  /**
   * 
   * @param {string} extension is the file extension that is not supported
   */
  constructor(extension) {
    super(`The file extension "${extension}" is not supported. Supported extensions are: ${SUPPORTED_EXTENSIONS.join(', ')}`)
  }
}

class UnsuportedKeyException extends Error {
  /**
   * 
   * @param {string} key is the key that is not supported
   */
  constructor(key) {
    super(`The key "${key}" is not supported. Supported keys are: ${SUPPORTED_KEY.join(', ')}`)
  }
}

/**
 * Parses the file passed to the CLI,
 * 
 * @param {{ filepath: string, content: string }} fileMetadata is the file metadata, it contains the filepath and the content of the file
 * @returns {{ [key: string]: any }} the parsed file
 */
function parseFileContent(fileMetadata) {
  const extension = fileMetadata.filepath.split('.').pop()
  if (!SUPPORTED_EXTENSIONS.includes(extension)) {
    throw new UnsuportedFileExtensionException(extension)
  }
  
  return JSON.parse(fileMetadata.content)
}

/**
 * 
 * @param {{ filepath: string, content: string }} fileMetadata is the file metadata, it contains the filepath and the content of the file 
 */
function generateConfigFiles(fileMetadata) {
  const parsedFile = parseFileContent(fileMetadata)

  Object.keys(parsedFile).forEach(key => {
    const value = parsedFile[key]

    if (!SUPPORTED_KEY.includes(key)) {
      throw new UnsuportedKeyException(key)
    }

    const builder = require(`./builders/${key}.js`)
    builder.build(value)
  });
}

module.exports = {
  generateConfigFiles,
  UnsuportedFileExtensionException,
  UnsuportedKeyException
}
