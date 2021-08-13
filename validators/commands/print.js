const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /🖨 ([A-Za-z1-9]+$|".*")/g.test(line)

  if (!isValid) {
    throwAndExit(`Invalid print command line: ${line}`)
  }
}
