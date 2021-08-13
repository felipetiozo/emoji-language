const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /😧 {/.test(line)

  if (!isValid) {
    throwAndExit(`Invalid decimal var line: ${line}`)
  }
}
