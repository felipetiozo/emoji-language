module.exports = function(line) {
  return `if(${line.replace("🤔", "").replace("{", "").trim()}):`
}
