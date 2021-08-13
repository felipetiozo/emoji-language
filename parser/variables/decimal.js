const getTypeOf = require("../general/getTypeOf")

module.exports = function(line, scope) {
  // expects 'dec_decimal <id> = <number>.<number>'
  const words = line.split(' ')
  words.shift()

  if (scope.global[words[0]]) {
    throw new Error(words[0] + ' is already defined')
  }
  if (scope.inside) {
    throw new Error('cannot define a variable inside brackets')
  }
  if ('decimal' !== getTypeOf(words[2], scope)) {
    throw new Error('type ' + getTypeOf(words[2], scope) + ' is not assignable to decimal')
  }

  scope.global[words[0]] = {
    type: 'decimal',
    value: words[2]
  }
  return line.replace('dec_decimal ', '').replace('=', ).trim()
}
