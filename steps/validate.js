const throwAndExit = require('../utils/throwAndExit')
const languageTokens = require('../utils/languageTokens')
const emojiUnicode = require('../utils/emojiUnicode')

// validators

// variables
const stringValidator = require('../validators/variables/string')
const integerValidator = require('../validators/variables/integer')
const decimalValidator = require('../validators/variables/decimal')

// conditions
const ifCondition = require('../validators/conditions/if')
const printCommand = require('../validators/commands/print')

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const lines = linesWithSemiCollon.filter(line => line && line != "").map(line => line.trim())

  lines.forEach((line) => {
    const lineLanguageToken = emojiUnicode(line[0] + line[1])

    switch (lineLanguageToken) {
      case languageTokens.string:
        stringValidator(line)
        break
      case languageTokens.integer:
        integerValidator(line)
        break
      case languageTokens.decimal:
        decimalValidator(line)
        break
      case languageTokens.ifCommand:
        ifCondition(line)
        break
      case languageTokens.printCommand:
        printCommand(line)
        break
      default:
        throwAndExit(`Line was not recognized: "${line}"`)
    }
  })
}
