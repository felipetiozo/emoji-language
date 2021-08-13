const throwAndExit = require('../../utils/throwAndExit')

module.exports = function(line) {
  const isValid = '/🔄 ([A-Za-z1-9 ]+$) (==|>|<|<=|>=|!=) (\"([A-Za-z1-9 ]+$)\"|(\d+).?(\d+)|(\d+)/g'.test(line)

  if (!isValid) {
    throwAndExit(`Invalid while loop line: ${line}`)
  }
}
