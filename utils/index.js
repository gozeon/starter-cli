const chalk = require('chalk')
const exec = require('child_process').exec

module.exports = {
  consoleTemplate: function (obj) {
    Object.getOwnPropertyNames(obj).forEach((key, idx, array) => {
      // console.log(`${chalk.grey(idx)}:  ${chalk.cyan(key)}`)
      console.log(`|-- ${chalk.yellow(key)}`)
    })
  },
  gitInit: function (projectName, callback) {
    let initGitStr = `cd ${projectName}/ &&` +
    ` rm -rf .git/ && ` +
    `git init && git add . && ` +
    `git commit -m "chore(*): init project by goze-cli" && cd ..`
    exec(initGitStr, (error, stdout, stderr) => {
      if (error) {
        callback(error)
      }
      callback()
    })
  }
}