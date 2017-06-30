const templates = require('../templates')

function consoleTemplate() {
  Object.getOwnPropertyNames(templates.tpl).forEach((key, idx, array) => {
    console.log(`${chalk.grey(idx)}:  ${chalk.green(key)}`)
  });
}

module.exports = {
  consoleTemplate
}