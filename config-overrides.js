const { override, babelInclude } = require('customize-cra')
const path = require('path')
const fs = require('fs')

module.exports = override(
  babelInclude([
    path.resolve('src'),       
    path.resolve('node_modules'),
    fs.realpathSync(__dirname + '/node_modules/@surran/footer'),
    fs.realpathSync(__dirname + '/node_modules/@surran/events'),
    fs.realpathSync(__dirname + '/node_modules/@surran/meta-tags'),
    fs.realpathSync(__dirname + '/node_modules/@surran/tabs-carousel') 
  ]),
)