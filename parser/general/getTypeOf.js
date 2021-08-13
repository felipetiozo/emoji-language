module.exports = function getTypeOf(word, scope) {
  if (scope.global[word]) {
    return scope.global[word].type
  }
  if (word.startsWith('string')) {
    return 'string'
  }
  if (word.includes('.')) {
    return 'decimal'
  }
  if (!isNaN(Number(word))) {
    return 'integer'
  }

  throw new Error(`${word} is not defined`)
}