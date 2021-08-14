const fs = require('fs')
const path = require('path')

function generateFile(parsedLines, fileName) {
  fs.writeFileSync(path.resolve(__dirname, `../out/${fileName}.py`), parsedLines.join('\n'))
}

module.exports = generateFile
