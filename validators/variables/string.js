const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /🔡 [a-zA-Z1-9]* = ".*"/g.test(line)

  if (!isValid) {
    throwAndExit(`Invalid text var line: ${line}`)
  }
}
