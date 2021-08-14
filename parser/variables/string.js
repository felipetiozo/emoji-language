const getTypeOf = require('../general/getTypeOf')

module.exports = function(line, scope) {
  // expects 'dec_string <id> = string_value:<stringId>'
  const words = line.split(' ')
  words.shift()

  if (scope.global[words[0]]) {
    throw new Error(words[0] + ' is already defined')
  }
  if (scope.inside) {
    throw new Error('cannot define a variable inside brackets')
  }
  if ('string' !== getTypeOf(words[2], scope)) {
    throw new Error('type ' + getTypeOf(words[2], scope) + ' is not assignable to string')
  }
  
  words[2] = getValueOfString(words[2], scope)
  scope.global[words[0]] = {
    type: 'string',
    value: words[2]
  }
  return words.join(' ')
}

function getValueOfString(word, scope) {
  const id = word.split(':')[1]

  return '"' + scope.strings[id] + '"'
}
