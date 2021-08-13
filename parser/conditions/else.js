const validateComparison = require('../general/validateComparison')

module.exports = function(line, scope) {
  const words = line.value.split(' ')
  words.shift() // remove command word

  if (scope.inside) {
    throw new Error('cannot open another bracket')
  }

  if (!scope.canUseElse) {
    throw new Error('cannot use else without if')
  }
  scope.canUseElse = false
  scope.inside = 'else:' + line.index

  return `else:`
}
