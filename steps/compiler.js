const throwAndExit = require('../utils/throwAndExit')
const languageTokens = require('../utils/languageTokens')

// validators
const stringValidator = require('../validators/string')
const numberValidator = require('../validators/number')

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const lines = linesWithSemiCollon.filter(line => line && line != "").map(line => line.slice(0, -1))

  lines.forEach(line => {
    const lineLanguageToken = emojiUnicode(line[0] + line[1])

    const novasLinhas = []

    switch (lineLanguageToken) {
      case languageTokens.string:
        const alreadyConvertedLine = textVarCompiler(line)
        alreadyConvertedLine.push(novasLinhas)
        break
      case languageTokens.number:
        numberValidator(line)
        break
      default:
        throwAndExit(`Line was not recognized: "${line}"`)
    }
  })

  return novasLinhas
}
