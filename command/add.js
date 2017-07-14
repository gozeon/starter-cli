'use strict'
const co = require('co')
const prompt = require('co-prompt')
const templates = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const emoji = require('node-emoji')
const utils = require('../utils');
const Ora = require('ora');

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')
    let gitUrl = yield prompt('Git https link: ')
    let branch = yield prompt('Branch: ')
    const spinner = new Ora();

    spinner.start(` template ${chalk.yellow(tplName)} is adding.`);

    setTimeout(() => {

    if (!templates.tpl[tplName]) {
      templates.tpl[tplName] = {}
      templates.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '')
      templates.tpl[tplName]['branch'] = branch
    } else {
      spinner.warn(` ${tplName} has already existed!`)
      utils.showNotifier('Warning', `${tplName} has already existed!`)
      process.exit()
    }

    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(templates), 'utf-8', (err) => {
      if (err) console.log(err)
      spinner.succeed(` New template ${tplName} is added!`)
      utils.showNotifier('Success', `New template ${tplName} added!`)
      console.log(chalk.grey('The latest template list is: \n'))
      utils.consoleTemplate(templates.tpl)
      console.log('\n')
      process.exit()
    })
    }, 1800)
  })
}