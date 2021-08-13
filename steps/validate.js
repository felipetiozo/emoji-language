function validate(line) {
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
    case languageTokens.if:
      ifCondition(line)
      break
    case languageTokens.output:
      printCommand(line)
      break
    case languageTokens.while:
      whileLoop(line)
      break
    default:
      throwAndExit(`Line was not recognized: "${line}"`)
  }
}

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
const elseCondition = require('../validators/conditions/else')
const printCommand = require('../validators/commands/print')
const inputCommand = require('../validators/commands/input')
const whileCommand = require('../validators/loops/while')
// loops

module.exports = function(file) {
  const linesWithSemiCollon = file.split('\n')

  const lines = linesWithSemiCollon.filter(line => line && line != "").map(line => line.trim())

  lines.forEach((line, index) => {
    try {
      const lineLanguageToken = emojiUnicode(line[0] + line[1])

      switch (lineLanguageToken) {
        case languageTokens.token.dec_string:
          stringValidator(line)
          break
        case languageTokens.token.dec_integer:
          integerValidator(line)
          break
        case languageTokens.token.dec_decimal:
          decimalValidator(line)
          break
        case languageTokens.token.if:
          ifCondition(line)
          break
        case languageTokens.token.else:
          elseCondition(line)
          break
        case languageTokens.token.input:
          inputCommand(line)
          break
        case languageTokens.token.output:
          printCommand(line)
          break
        case languageTokens.token.while:
          whileCommand(line)
          break
        // case languageTokens.token.end_bracket:
        //   endBracketValidator(line)
        //   break
        // default:
        //   if (!noEmojivalidator()) {
        //     throw new Error(`Line was not recognized: "${line}"`)
        //   }
          // break
      }
    } catch (error) {
      throw new Error(error.message + ' at line: ' + (index + 1))
    }
  })
}
