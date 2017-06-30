'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const emoji = require('node-emoji')

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')

    if (config.tpl[tplName]) {
      config.tpl[tplName] = undefined
    } else {
      console.log(`${emoji.get(':exclamation:')} ${chalk.red('Template does not exist!')}`)
      process.exit()
    }

    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(`${emoji.get(':heavy_check_mark:')} ${chalk.green('\n √ Template deleted!')}`)
      console.log(chalk.grey('The last template list is: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })
  })
}