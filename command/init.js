'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const templates = require('../templates')
const chalk = require('chalk')
const emoji = require('node-emoji')
const utils = require('../utils')
const fs = require('fs-extra')
const path = require('path')

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
    let gitUrl
    let branch

    if (!templates.tpl[tplName]) {
      console.log(`${emoji.get(':warning:')}' ${chalk.red('Template does not exit!')}`)
      process.exit()
    }
    gitUrl = templates.tpl[tplName].url
    branch = templates.tpl[tplName].branch

    let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`

    console.log(chalk.white('\n Start generating... \n'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }

      utils.gitInit(projectName, function (error) {
        if (error) {
          console.log(error)
          process.exit()
        }
        const projectPath = path.resolve(process.cwd(), `${projectName}/`);

        fs.readJson(path.resolve(projectPath, 'package.json'))
          .then(packageObj => {
            fs.writeJson(path.resolve(projectPath, 'package.json'),
              utils.rewritePkg(projectName, packageObj), err => {
                if (err) {
                  console.log(err)
                  process.exit()
                }

                console.log(`${chalk.green('√ Generation completed!')}`)
                console.log(`\n cd ${projectName} && npm install \n`)
                process.exit()
              })

          })
          .catch(err => {
            console.log(err)
            process.exit()
          })
      })
    })
  })
}