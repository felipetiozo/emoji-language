module.exports = function getBrackets(lines) {
  let bracketsStack = []
  let brackets = {}
  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i])
    if (lines[i].endsWith('{')) {
      lines[i].slice(0, -1)
      bracketsStack.unshift({ line: i + 1, })
      brackets[i] = []
      for (let j = i; j<lines.length; j++) {
        console.log('j', lines[j])
        if (lines[j].startsWith('}')) {
          console.log('a')
          lines.splice(j)
          break
        }
        else {
          brackets[i].push(lines[j])
          lines.splice(j)
        }
      }
      if (!brackets[i].length) {
        console.log('error')
      }
    }
  }
  if (bracketsStack.length) {
    console.log(`bracket at ${bracketsStack.line} was not closed`)
  }
  console.log('lines', lines)
  return brackets
}