#!/usr/bin/env node --harmony
'use strict'
process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')
const chalk = require('chalk')
const emoji = require('node-emoji')

program
  .version(require('../package').version)

program
  .usage('<commander>')

program
  .command('add')
  .description(`${emoji.random()} Add a new template`)
  .alias('a')
  .action(() => {
    require('../command/add')()
  })

program
  .command('list')
  .description(`${emoji.random()} List all the templates`)
  .alias('l')
  .action(() => {
    require('../command/list')()
  })

program
  .command('init')
  .description(`${emoji.random()} Generate a new project`)
  .alias('i')
  .action(() => {
    require('../command/init')()
  })

program
  .command('delete')
  .description(`${emoji.random()} Delete a template`)
  .alias('i')
  .action(() => {
    require('../command/delete')()
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}