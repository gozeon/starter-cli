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
      `git commit -m "chore(*): init project by starter-cli" && cd ..`
    exec(initGitStr, (error, stdout, stderr) => {
      if (error) {
        callback(error)
      }
      callback()
    })
  },
  rewritePkg: function (projectName, obj) {
    let obj_ = obj
    if (obj_.hasOwnProperty('name')) {
      obj_.name = projectName
    }
    if (obj_.hasOwnProperty('version')) {
      obj_.version = "1.0.0"
    }
    if (obj_.hasOwnProperty('description')) {
      obj_.description = ""
    }
    if (obj_.hasOwnProperty('keywords')) {
      obj_.keywords = []
    }
    if (obj_.hasOwnProperty('license')) {
      obj_.license = "ISC"
    }
    if (obj_.hasOwnProperty('author')) {
      obj_.author = ""
    }

    if (obj_.hasOwnProperty('repository')) {
      delete obj_.repository
    }
    if (obj_.hasOwnProperty('homepage')) {
      delete obj_.homepage
    }
    if (obj_.hasOwnProperty('bugs')) {
      delete obj_.bugs
    }
    return obj_
  }
}