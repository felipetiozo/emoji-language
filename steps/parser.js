const languageTokens = require('../utils/languageTokens')
const emojiUnicode = require('../utils/emojiUnicode')

// parsers
// variables
const stringParser = require('../parser/variables/string')
const integerParser = require('../parser/variables/integer')
const decimalParser = require('../parser/variables/decimal')

// conditions
const ifParser = require('../parser/conditions/if')
const elseParser = require('../parser/conditions/else')

// operations
const outputParser = require('../parser/operations/output')
const inputParser = require('../parser/operations/input')

// general
const cleanUp = require('../parser/general/cleanUp')

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const lines = linesWithSemiCollon.filter(line => line && line != "")
  
  let parsedLines = []
  lines.forEach(line => {
    const lineLanguageToken = emojiUnicode(line[0] + line[1])
    console.log(lineLanguageToken)
    switch (lineLanguageToken) {
      case languageTokens.output:
        parsedLines.push(outputParser(line))
        break
      case languageTokens.input:
        parsedLines.push(inputParser(line))
        break
      case languageTokens.if:
        parsedLines.push(ifParser(line))
        break
      case languageTokens.else:
        parsedLines.push(elseParser(line))
        break
      case languageTokens.string:
        parsedLines.push(stringParser(line))
        break
      case languageTokens.integer:
        parsedLines.push(integerParser(line))
        break
      case languageTokens.decimal:
        parsedLines.push(decimalParser(line))
        break
      default:
        parsedLines.push(cleanUp(line))
    }
  })

  console.log(parsedLines)

  return parsedLines
}
