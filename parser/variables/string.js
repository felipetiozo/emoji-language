const { parser } = require('../../steps/parser')

module.exports = function(line) {
  const variable = line.replace("🔡", "").split("=")[0].trim()
  const value = parser(line.split("=")[1].trim())
  return `${variable} = ${value}`
}
