function parser(line){
  const lineLanguageToken = emojiUnicode(line[0] + line[1])

  switch (lineLanguageToken) {
    case languageTokens.while:
      return whileParser(line)
      break
    case languageTokens.output:
      return outputParser(line)
      break
    case languageTokens.input:
      return inputParser(line)
      break
    case languageTokens.if:
      return ifElseParser(line)
      break
    case languageTokens.string:
      return stringParser(line)
      break
    case languageTokens.integer:
      return integerParser(line)
      break
    case languageTokens.decimal:
      return decimalParser(line)
      break
    default:
      return cleanUp(line)
  }
}
module.exports.parser = parser

const languageTokens = require('../utils/languageTokens')
const emojiUnicode = require('../utils/emojiUnicode')

// parsers
// variables
const stringParser = require('../parser/variables/string')
const integerParser = require('../parser/variables/integer')
const decimalParser = require('../parser/variables/decimal')

// conditions
const ifElseParser = require('../parser/conditions/ifElse')

// operations
const outputParser = require('../parser/operations/output')
const inputParser = require('../parser/operations/input')

// loops
const whileParser = require('../parser/loops/while')

// general
const cleanUp = require('../parser/general/cleanUp')

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const lines = linesWithSemiCollon.filter(line => line && line != "")

  let parsedLines = []
  lines.forEach(line => parsedLines.push(parser(line)))

  console.log(parsedLines)
  return parsedLines
}
