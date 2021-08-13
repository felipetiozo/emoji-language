const getTypeOf = require("../general/getTypeOf")

module.exports = function(line, scope) {
  // expects 'dec_integer <id> = <number>'
  const words = line.split(' ')
  words.shift()

  if (scope.global[words[0]]) {
    throw new Error(words[0] + ' is already defined')
  }
  if (scope.inside) {
    throw new Error('cannot define a variable inside brackets')
  }

  if ('integer' !== getTypeOf(words[2], scope)) {
    throw new Error('type ' + getTypeOf(words[2], scope) + ' is not assignable to integer')
  }

  scope.global[words[0]] = {
    type: 'integer',
    value: words[2]
  }
  return words.join(' ')
}
