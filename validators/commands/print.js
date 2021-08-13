const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /🖨 "[a-z ]*"/g.test(line)

  if (!isValid) {
    throwAndExit(`Invalid print command line: ${line}`)
  }
}
