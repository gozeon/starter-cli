'use strict'
const co = require('co')
const prompt = require('co-prompt')
const templates = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const emoji = require('node-emoji')
const utils = require('../utils')

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')

    if (templates.tpl[tplName]) {
      delete templates.tpl[tplName]
    } else {
      console.log(`${emoji.get(':warning:')}' ${chalk.red('Template does not exist!')}`)
      process.exit()
    }

    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(templates), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(`${emoji.get(':sparkles:')}' ${chalk.green('Template deleted!')}`)
      console.log(chalk.grey('The last template list is: \n'))
      utils.consoleTemplate(templates.tpl)
      console.log('\n')
      process.exit()
    })
  })
}