const shortid = require('shortid')
const emojiUnicode = require('./emojiUnicode')
const languageTokens = require('./languageTokens')

module.exports = function setTokens(line, scope) {
  try {
    // ignore comments
    line.value = line.value.replace(/\/\/.*/g, '')

    // set "some string" as 'string_value:<id>'
    const stringValue = setStringTokens(line.value)
    if (stringValue) {
      scope.strings[stringValue.id] = stringValue.string_value
      line.value = stringValue.result
    }

    // set tokens for emojis and reserved characters
    const words = line.value.split(' ').filter(word => word)
    const tokenizedLine = words.map(parseToToken).join(' ')
    line.value = tokenizedLine

    return line
  } catch (error) {
    throw new Error(error.message + ' at line: ' + (line.index + 1))
  }
}

function parseToToken(word) {
  const emojiCode = emojiUnicode(word)
  const unicodeToken = languageTokens.unicode[emojiCode]
  return unicodeToken || word
}

function setStringTokens(line) {
  const id = shortid.generate()
  const occurencesOfQuotes = getAllIndexes(line, '"')
  if (occurencesOfQuotes.length > 2) {
    throw Error('has a error with `"`')
  }

  if (occurencesOfQuotes.length < 2) {
    return null
  }
  const substring = line.substring(occurencesOfQuotes[0] + 1, occurencesOfQuotes[1])
  line = line.replace(/".*"/g, 'string_value:' + id)
  return {
    string_value: substring,
    id: id,
    result: line
  }
}

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}