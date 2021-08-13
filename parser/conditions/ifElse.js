const { parser } = require('../../steps/parser')

module.exports = function(line) {
  if(line.includes("😧")) {
    const condition = line.split("🤔 ")[1].split(" {")[0]
    const operation = line.split(" 😧 ")[0]
    const elseOperation = line.split(" 😧 ")[1].split("{")[1].replace("}", "").trim()
  
    return `if(${condition}):\n ${parser(operation)}\n else: ${parser(elseOperation)}`  
  }
  const condition = line.split("🤔 ")[1].split(" {")[0]
  const operation = line.split("🤔 ")[1].split(" {")[1].replace("}", "").trim()

  return `if(${condition}):\n ${parser(operation)}`
}
