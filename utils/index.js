const chalk = require('chalk')

module.exports = {
  consoleTemplate: function (obj) {
    Object.getOwnPropertyNames(obj).forEach((key, idx, array) => {
      console.log(`${chalk.grey(idx)}:  ${chalk.cyan(key)}`)
    })
  }
}