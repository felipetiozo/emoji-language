const fs = require('fs')

const throwAndExit = require('./utils/throwAndExit')
const validateStep = require('./steps/validate')
const parserStep = require('./steps/parser')
const setTokens = require('./utils/setTokens')
// const decimal = require('./parser/variables/decimal')
const validate = require('./steps/validate')
const generateFile = require('./steps/generator')

const args = require('minimist')(process.argv.slice(2));

const fileArg = args.f
if (!fileArg) {
  throwAndExit('Missing file argument (-f)')
}

let file
try {
  file = fs.readFileSync(fileArg, 'utf8');
} catch(e) {
  throwAndExit(`File ${fileArg} dont exist`)
}

const fileName = fileArg.split('.')[0]

const lines = file.split('\n').map((line, index) => {
  return {
    value: line,
    index,
  }
}).filter(line => line.value)

const scope = {
  strings: {},
  inside: null,
  global: {}
}

let parsedLines
try {
  // validate(file)

  console.log(lines)
  const tokenizedLines = lines.map(line => setTokens(line, scope))
  console.log(tokenizedLines)

  parsedLines = parserStep(tokenizedLines, scope)
} catch(err) {
  throwAndExit(err.message)
}
generateFile(parsedLines, fileName)

