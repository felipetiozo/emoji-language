const path = require('path')
const fs = require('fs')

function generateFile(parsedLines, fileName = 'out') {
  console.log(`Generating file ${fileName}.py at ./out`)
  fs.writeFileSync(path.resolve(__dirname, `../out/${fileName}.py`), parsedLines.join('\n'))
}

module.exports = generateFile