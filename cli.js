const program = require('commander')
const pkg = require('./package.json')
const fs = require('fs')
const isAcronym = require('./')

program
  .version(pkg.version)
  .option('-p, --phrase <phrase>', 'query phrase (mandatory)')
  .option('-f, --file <wordsFile>', 'file of words to test phrase against')
  .parse(process.argv)

if (!program.phrase) {
  console.error('ERROR: `--phrase` is mandatory')
  process.exit(1)
}

const wordsPath = program.file || require('word-list')
const words = fs.readFileSync(wordsPath, 'utf8').split('\n')

for (const word of words) {
  if (isAcronym(program.phrase, word)) {
    console.log(word)
  }
}
