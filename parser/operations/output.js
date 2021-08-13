module.exports = function(line) {
  if(line.includes("//")) {
    return `print(${line.split("//")[0].replace("🖨", "").trim()})`
  }

  return `print(${line.split("}")[0].replace("🖨", "").trim()})`
}
