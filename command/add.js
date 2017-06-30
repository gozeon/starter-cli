'use strict'
const co = require('co')
const prompt = require('co-prompt')
const templates = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const emoji = require('node-emoji')
const utils = require('../utils');

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')
    let gitUrl = yield prompt('Git https link: ')
    let branch = yield prompt('Branch: ')

    if (!templates.tpl[tplName]) {
      templates.tpl[tplName] = {}
      templates.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '')
      templates.tpl[tplName]['branch'] = branch
    } else {
      console.log(`${emoji.get(':warning:')}' ${chalk.red('Template has already existed!')}`)
      process.exit()
    }

    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(templates), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(`${emoji.get(':sparkles:')}' ${chalk.green('New template added!\n')}`)
      console.log(chalk.grey('The last template list is: \n'))
      utils.consoleTemplate(templates.tpl)
      console.log('\n')
      process.exit()
    })
  })
}