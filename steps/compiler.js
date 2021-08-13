const languageTokens = require('../utils/languageTokens')

// validators
const stringParser = require('../parser/variables/string')
const integerParser = require('../parser/variables/integer')

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const lines = linesWithSemiCollon.filter(line => line && line != "").map(line => line.slice(0, -1))

  lines.forEach(line => {
    const parsedLines = []

    switch (lineLanguageToken) {
      case languageTokens.string:
        parsedLines.push(stringParser(line))
        break
      case languageTokens.number:
        parsedLines.push(integerParser(line))
        break
      default:
        parsedLines.push("")
    }
  })

  return novasLinhas
}
