const getTypeOf = require('./getTypeOf')

module.exports = function validateComparison(word1, word2, scope) {
  if (!scope.global[word1]) {
    throw new Error(`${word1} is not defined`)
  }
  if (scope.global[word1].type !== getTypeOf(word2, scope)) {
    throw new Error(`cannot compare ${scope.global[word1].type} with ${getTypeOf(word2, scope)}`)
  }
}