const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /🔄 [a-z]* [<>==] [1-9] { [a-z+-]* }/g.test(line)

  if (!isValid) {
    throwAndExit(`Invalid while loop line: ${line}`)
  }
}
