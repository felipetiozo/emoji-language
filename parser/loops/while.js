const { parser } = require('../../steps/parser')
const validateComparison = require('../general/validateComparison')

module.exports = function(line, scope) {
  const words = line.value.split(' ')
  words.shift() // remove commnad word

  if (scope.inside) {
    throw new Error('cannot open another bracket')
  }

  scope.inside = 'while:' + line.index
  validateComparison(words[0], words[2], scope)
  const condition = `${words[0]} ${words[1]} ${words[2]}`

  return `while ${condition}:`
}
