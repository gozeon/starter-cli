'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const emoji = require('node-emoji')

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
    let gitUrl
    let branch

    if (!config.tpl[tplName]) {
      console.log(`${emoji.get(':warning:')}' chalk.red('\n × Template does not exit!')`)
      process.exit()
    }
    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch

    let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`

    console.log(chalk.white('\n Start generating...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(`${emoji.get(':sparkles:')}' ${chalk.green('\n √ Generation completed!')}`)
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  })
}