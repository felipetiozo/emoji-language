const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = /🤔 ([A-Za-z1-9]+$) (==|>|<|<=|>=|!=) ("?[a-z ]*"|(\d+).?(\d+)|(\d+)) {/g.test(line)

  if (!isValid) {
    throwAndExit(`Invalid if condition line: ${line}`)
  }
}
