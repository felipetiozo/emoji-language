const attributionParser = require('./attribution')

module.exports = function(line, scope) {
  if (line.includes('=')) {
    return attributionParser(line, scope)
  }
  return line
}
