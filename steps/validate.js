const throwAndExit = require('../utils/throwAndExit')
const languageTokens = require('../utils/languageTokens')
const emojiUnicode = require('../utils/emojiUnicode')

// validators

// variables
const stringValidator = require('../validators/string')
const integerValidator = require('../validators/integer')
const decimalValidator = require('../validators/variables/decimal')

// conditions
const ifElseValidator = require('../validators/variables/ifElse')
const ifCondition = require('../validators/variables/if')

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const lines = linesWithSemiCollon.filter(line => line && line != "").map(line => line.slice(0, -1))

  lines.forEach((line) => {
    const lineLanguageToken = emojiUnicode(line[0] + line[1])

    switch (lineLanguageToken) {
      case languageTokens.if:
        ifCondition(line)
        break
      case languageTokens.ifElse:
        ifElseValidator(line)
        break

      case languageTokens.stringVar:
        stringValidator(line)
        break
      case languageTokens.integerVar:
        integerValidator(line)
        break
      case languageTokens.decimalVar:
        decimalValidator(line)
          break
      default:
        throwAndExit(`Line was not recognized: "${line}"`)
    }
  })
}
