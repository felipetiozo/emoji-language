const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /ℹ️ ([A-Za-z1-9]+$) = [1-9]*.*[1-9]/g.test(line)

  if (!isValid) {
    throwAndExit(`Invalid decimal var line: ${line}`)
  }
}
