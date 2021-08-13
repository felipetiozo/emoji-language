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

  scope.global[words[0]] = {
    type: 'decimal',
    value: words[2]
  }
  return line.replace('dec_decimal ', '').replace('attribution', '=').trim()
}
