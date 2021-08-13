module.exports = function(line) {
  return `input(${line.replace("🖨", "").trim()})`
}
