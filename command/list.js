'use strict'
const templates = require('../templates')
const utils = require('../utils')

module.exports = () => {
  utils.consoleTemplate(templates.tpl);
  process.exit()
}