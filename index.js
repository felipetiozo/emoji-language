const fs = require('fs')

const logStep = require('./utils/logStep')
const throwAndExit = require('./utils/throwAndExit')
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
  logStep('ReadingFile', false)
  file = fs.readFileSync(fileArg, 'utf8');
  logStep('ReadingFile', true)
} catch(e) {
  throwAndExit(`File ${fileArg} dont exist`)
}

const fileName = fileArg.split('.')[0]

logStep('ReadingLines', false)
logStep('ReadingLines', true)
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
  logStep('ValidatingFile', false)
  validate(file)
  logStep('ValidatingFile', true)

  console.log(lines)
  const tokenizedLines = lines.map(line => setTokens(line, scope))
  console.log(tokenizedLines)

  parsedLines = parserStep(tokenizedLines, scope)
} catch(err) {
  throwAndExit(err.message)
}
generateFile(parsedLines, fileName)
