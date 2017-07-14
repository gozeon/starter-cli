'use strict'
const co = require('co')
const prompt = require('co-prompt')
const templates = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const emoji = require('node-emoji')
const utils = require('../utils')
const Ora = require('ora')

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')
    const spinner = new Ora();

    spinner.start(` template ${chalk.yellow(tplName)} is deleting.`);

    setTimeout(() => {

      if (templates.tpl[tplName]) {
        delete templates.tpl[tplName]
      } else {
        utils.showNotifier('Warning', `Template ${tplName} does not exist!`)
        spinner.warn(` ${chalk.yellow(tplName)} has already existed!`)
        process.exit()
      }

      fs.writeFile(__dirname + '/../templates.json', JSON.stringify(templates), 'utf-8', (err) => {
        if (err) console.log(err)
        utils.showNotifier('Success', `Template ${tplName} is deleted!`)
        spinner.succeed(` ${chalk.yellow(tplName)} is deleted!`)
        console.log(chalk.grey('The last template list is: \n'))
        utils.consoleTemplate(templates.tpl)
        console.log('\n')
        process.exit()
      })
    }, 1800)
  })
}