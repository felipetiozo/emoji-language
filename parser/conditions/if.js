const validateComparison = require('../general/validateComparison')

module.exports = function(line, scope) {
  const words = line.value.split(' ')
  words.shift() // remove command word

  if (scope.inside) {
    throw new Error('cannot open another bracket')
  }

  scope.canUseElse = true

  scope.inside = 'if:' + line.index
  validateComparison(words[0], words[2], scope)
  words[0] = getValue(words[0], scope)
  words[2] = getValue(words[2], scope)
  
  const condition = `${words[0]} ${words[1]} ${words[2]}`

  return `if ${condition}:`
}

function getValue(word, scope) {
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