const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /🤔 [a-z]* == ("?[a-z ]*")?|([1-9]*)? { .*}/g.test(line)

  if (!isValid) {
    throwAndExit(`Invalid if condition line: ${line}`)
  }
}
