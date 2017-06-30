const templates = require('../templates')
const chalk = require('chalk')

module.exports = {
  consoleTemplate: function () {
    Object.getOwnPropertyNames(templates.tpl).forEach((key, idx, array) => {
      console.log(`${chalk.grey(idx)}:  ${chalk.green(key)}`)
    })
  }
}