module.exports = function(line, scope) {
  const words = line.split(' ')
  if (words[1].startsWith('string')) {
    const stringId = words[1].split(':')[1]
    words[1] = getValueOfString(scope, stringId)
  } else if(!scope.global[words[1]]) {
    throw new Error(words[1] + ' is not defined')
  }

  line = words.join(' ')
  const result = line.replace('output ', 'print(') + ')'
  return result
}

function getValueOfString(scope, id) {
  return '"' + scope.strings[id] + '"'
}
