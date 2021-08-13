const throwAndExit = require('../utils/throwAndExit')
const languageTokens = require('../utils/languageTokens')

// validators
const textVarValidator = require('../validators/textVarValidator')
const numberVarValidator = require('../validators/numberVarValidator')

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const allLinesAreCorreclty = linesWithSemiCollon.filter(line => line && line != "").every(line => line[line.length - 1] == ";")
  if (!allLinesAreCorreclty) {
    throwAndExit('All lines must finish with ";"')
  }

  const lines = linesWithSemiCollon.filter(line => line && line != "").map(line => line.slice(0, -1))

  lines.forEach(line => {
    const lineLanguageToken = line.charCodeAt(0)

    switch (lineLanguageToken) {
      case languageTokens.textVar:
        textVarValidator(line)
        break
      case languageTokens.numberVar:
        numberVarValidator(line)
        break
      default:
        throwAndExit(`Line was not recognized: "${line}"`)
    }
  })
}
