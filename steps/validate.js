const throwAndExit = require('../utils/throwAndExit')
const languageTokens = require('../utils/languageTokens')
const emojiUnicode = require('../utils/emojiUnicode')

// validators

// variables
const textValidator = require('../validators/string')
const numberValidator = require('../validators/number')
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

      case languageTokens.textVar:
        textValidator(line)
        break
      case languageTokens.numberVar:
        numberValidator(line)
        break
      case languageTokens.decimalVar:
        decimalValidator(line)
          break
      default:
        throwAndExit(`Line was not recognized: "${line}"`)
    }
  })
}
