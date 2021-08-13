const getValue = require("../helpers/getValue")
const getTypeOf = require("./getTypeOf")

module.exports = function(line, scope) {
  const varId = line.split(' = ')[0]
  const arguments = line.split(' = ')[1]
  if (!scope.global[varId]) {
    throw new Error(varId + ' is not defined')
  }

  const result = getLineBasedOnType(varId, arguments, scope)
  return varId + ' = ' + result
}

function getLineBasedOnType(varId, arguments, scope) {
  const type = scope.global[varId].type

  switch(type) {
    case 'string':
      return stringAttribution(arguments, scope)
    case 'integer':
      return integerAttribution(arguments, scope)
    case 'decimal':
      return decimalAttribution(arguments, scope)
  }
}

function integerAttribution(arguments, scope) {
  const words = arguments.split(' ')
  if (words.length > 3) {
    throw new Error('integerAttribution can only handle with 1 operation')
  } else if (words.length === 1) {
    if (scope.global[words[0]]) {
      if (scope.global[words[0]].type !== 'integer') {
        throw new Error('cannot set ' + scope.global[words[0]].type + ' value as integer')
      }
      return scope.global[words[0]].value
    }
    if (isNaN(Number(words[0]))) {
      throw new Error('attributing NaN in integer')
    }
    return words[0]
  } else if (words.length === 3) {
    const validOperators = ['+', '-', '/', '*']
    if (!validOperators.includes(words[1])) throw new Error('invalid operation: ' + words.join(' '))
    if (getTypeOf(words[0], scope) === 'string') {
      throw new Error(getValue(words[0], scope) + ' is not a number')
    }
    if (getTypeOf(words[2], scope) === 'string') {
      throw new Error(getValue(words[2], scope) + ' is not a number')
    }
    return `round(${words.join(' ')})`
  } else {
    throw new Error('invalid arguments: ' + words.join(' '))
  }
}

function stringAttribution(arguments, scope) {
  const words = arguments.split(' ')
  if (words.length !== 1) {
    throw new Error('string attribution expects only one value')
  }

  if (words[0].startsWith('string')) {
    const id = words[0].split(':')[1]
    return '"' + scope.strings[id] + '"'
  } else if(scope.global[words[0]]) {
    if (scope.global[words[0]].type !== 'string') {
      throw new Error('cannot set ' + scope.global[words[0]].type + ' value as string')
    }
    return scope.global[words[0]].value
  } else {
    throw new Error('attributing unexpected value at string')
  }
}

function decimalAttribution(arguments, scope) {
  const words = arguments.split(' ')
  if (words.length > 3) {
    throw new Error('decimalAttribution can only handle with 1 operation')
  } else if (words.length === 1) {
    if (scope.global[words[0]]) {
      if (scope.global[words[0]].type !== 'decimal') {
        throw new Error('cannot set ' + scope.global[words[0]].type + ' value as decimal')
      }
      return scope.global[words[0]].value
    }
    if (isNaN(Number(words[0]))) {
      throw new Error('attributing NaN in decimal')
    }
    return words[0]
  } else if (words.length === 3) {
    const validOperators = ['+', '-', '/', '*']
    if (!validOperators.includes(words[1])) throw new Error('invalid operation: ' + words.join(' '))
    if (getTypeOf(words[0], scope) === 'string') {
      throw new Error(getValue(words[0], scope) + ' is not a number')
    }
    if (getTypeOf(words[2], scope) === 'string') {
      throw new Error(getValue(words[2], scope) + ' is not a number')
    }

    return words.join(' ')
  } else {
    throw new Error('invalid arguments '+ words.join(' '))
  }
}