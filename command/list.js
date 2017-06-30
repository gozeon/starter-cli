'use strict'
const chalk = require('chalk')
const consoleTemplate = require('../utils');

module.exports = () => {
  // Object.getOwnPropertyNames(templates.tpl).forEach((key, idx, array) => {
  //   console.log(`${chalk.grey(idx)}:  ${chalk.green(key)}`)
  // });
  consoleTemplate();
  process.exit()
}