function parser(line, scope){
  try {
    const words = line.value.split(' ')
    const initialWord = words[0]
    const tab = scope.inside? '\t' : ''

    switch (initialWord) {
      case 'while':
        if (!scope.inside) scope.canUseElse = false
        return tab + whileParser(line, scope)
      case 'output':
        if (!scope.inside) scope.canUseElse = false
        return tab + outputParser(line.value, scope)
      case 'input':
        if (!scope.inside) scope.canUseElse = false
        return tab + inputParser(line.value, scope) 
      case 'if':
        if (!scope.inside) scope.canUseElse = false
        return tab + ifParser(line, scope)
      case 'else':
        return tab + elseParser(line, scope)
      case 'dec_string':
        if (!scope.inside) scope.canUseElse = false
        return tab + stringParser(line.value, scope)
      case 'dec_integer':
        if (!scope.inside) scope.canUseElse = false
        return tab + integerParser(line.value, scope)
      case 'dec_decimal':
        if (!scope.inside) scope.canUseElse = false
        return tab + decimalParser(line.value, scope)
      case 'end_bracket':
        if (!scope.inside) scope.canUseElse = false
        return tab + endBracket(line.value, scope)
      default:
        if (!scope.inside) scope.canUseElse = false
        return defaultParser(line.value, scope)
    }
  } catch (error) {
    throw new Error(error.message + ' at line: ' + (line.index + 1))
  }
}
module.exports.parser = parser

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

// loops
const whileParser = require('../parser/loops/while')

// general
const defaultParser = require('../parser/general/default')
const endBracket = require('../parser/general/endBracket')

module.exports = function(lines, scope) {
  let parsedLines = []
  lines.forEach(line => parsedLines.push(parser(line, scope)))

  if (scope.inside) {
    const words = scope.inside.split(':')
    const method = words[0]
    const line = words[1]
    throw new Error(`the method ${method} at line ${line} was not closed`)
  }

  return parsedLines
}