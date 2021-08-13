const throwAndExit = require('../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /😀 [a-z]* = "[a-z]*"/g.test(line)

  if (!isValid) {
    throwAndExit(`Invalid text var line: ${line}`)
  }
}
