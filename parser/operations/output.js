module.exports = function(line) {
  return `print(${line.replace("🖨", "").trim()})`
}
