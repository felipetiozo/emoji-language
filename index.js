const fs = require('fs')
const args = require('minimist')(process.argv.slice(2));

// utils
const logStep = require('./utils/logStep')
const throwAndExit = require('./utils/throwAndExit')
const setTokens = require('./utils/setTokens')

// steps
const parserStep = require('./steps/parser')
const validate = require('./steps/validate')
const generateFile = require('./steps/generator')

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

const fileName = fileArg.split('.')[0] || 'out'

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

  const tokenizedLines = lines.map(line => setTokens(line, scope))

  logStep('ParsingLines', false)
  parsedLines = parserStep(tokenizedLines, scope)
  logStep('ParsingLines', true)
} catch(err) {
  throwAndExit(err.message)
}

logStep('GeneratingOutput', false)
generateFile(parsedLines, fileName)
logStep('GeneratingOutput', true)

console.log(`File ${fileName}.py was generated at ./out`)
