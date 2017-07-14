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
const Ora = require('ora')

module.exports = () => {
  co(function* () {
    let tplName = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
    let gitUrl
    let branch
    const spinner = new Ora()

    spinner.start(` start generating...`)

    setTimeout(() => {

      if (!templates.tpl[tplName]) {
        utils.showNotifier('Warning', `Template ${tplName} does not exist!`)
        spinner.warn( ` ${chalk.yellow(tplName)} does not exit!`)
        process.exit()
      }
      gitUrl = templates.tpl[tplName].url
      branch = templates.tpl[tplName].branch

      let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`

      exec(cmdStr, (error, stdout, stderr) => {
        if (error) {
          spinner.fail(error.message)
          process.exit()
        }

        const projectPath = path.resolve(process.cwd(), `${projectName}/`);

        fs.readJson(path.resolve(projectPath, 'package.json'))
          .then(packageObj => {
            fs.writeJson(path.resolve(projectPath, 'package.json'),
              utils.rewritePkg(projectName, packageObj), err => {
                if (err) {
                  spinner.fail(error.message)
                  process.exit()
                }

                utils.gitInit(projectName, function (error) {
                  if (error) {
                    spinner.fail(error.message)
                    process.exit()
                  }
                  utils.showNotifier('Success', `√ Generation completed!`)
                  spinner.succeed(` ${chalk.green('Generation completed!')}`)
                  console.log(chalk.grey(`\n cd ${projectName} && npm install \n`))
                  process.exit()
                })
              })

          })
          .catch(err => {
            console.log(err)
            process.exit()
          })
      })

    }, 2000)
  })
}