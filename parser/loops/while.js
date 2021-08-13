const { parser } = require('../../steps/parser')

module.exports = function(line) {
  const condition = line.split("🔄 ")[1].split(" {")[0]
  const operation = line.split("🔄 ")[1].split(" {")[1].replace("}", "").trim()

  return `while(${condition}):\n ${parser(operation)}`
}
