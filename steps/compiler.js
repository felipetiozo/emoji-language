const throwAndExit = require('../utils/throwAndExit')
const languageTokens = require('../utils/languageTokens')

// validators
const stringValidator = require('../validators/string')
const numberValidator = require('../validators/number')

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const allLinesAreCorreclty = linesWithSemiCollon.filter(line => line && line != "").every(line => line[line.length - 1] == ";")
  if (!allLinesAreCorreclty) {
    throwAndExit('All lines must finish with ";"')
  }

  const lines = linesWithSemiCollon.filter(line => line && line != "").map(line => line.slice(0, -1))

  lines.forEach(line => {
    const lineLanguageToken = line.charCodeAt(0)

    const novasLinhas = []

    switch (lineLanguageToken) {
      case languageTokens.textVar:
        const alreadyConvertedLine = textVarCompiler(line)
        alreadyConvertedLine.push(novasLinhas)
        break
      case languageTokens.numberVar:
        numberValidator(line)
        break
      default:
        throwAndExit(`Line was not recognized: "${line}"`)
    }
  })

  return novasLinhas
}
