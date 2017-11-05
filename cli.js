#! /usr/bin/env node

const program = require('commander')
const pkg = require('./package.json')
const readline = require('readline')
const fs = require('fs')
const acronym = require('@mhyfritz/acronym')

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

const rl = readline.createInterface({
  input: fs.createReadStream(wordsPath)
})

rl.on('line', word => {
  if (acronym.test(program.phrase, word)) {
    console.log(word)
  }
})
