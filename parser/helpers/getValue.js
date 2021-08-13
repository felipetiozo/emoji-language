module.exports = function getValue(word, scope) {
  if (word.startsWith('string')) {
    return '"' + scope.strings[word.split(':')[1]] + '"'
  } else if (isNaN(Number(word))) {
    if (scope.global[word]) {
      return word
    } else {
      throw new Error(word + ' is not declared')
    }
  }
  return word
}