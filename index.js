'use strict'

const inputFilename = process.argv[2]
if (!inputFilename) {
  throw new Error('Missing input filename')
}
const outputFilename = process.argv[3]
if (!outputFilename) {
  throw new Error('Missing output filename')
}
console.log('rewriting', inputFilename, 'to', outputFilename)

const falafel = require('falafel')
const fs = require('fs')
const source = fs.readFileSync(inputFilename, 'utf8')
const output = falafel(source, function (node) {
  if (node.type === 'BlockStatement' && node.parent.type === 'FunctionDeclaration') {
    const vars = node.parent.params.map((node) => node.name)
    // wrap function in 'use strict' closure
    const pre = '`(function (){\n"use strict"\nreturn (function () '
    const post = '\n())}())`'
    const limitedBlock = pre + node.source() + post
    // wrap in VM context
    const preVm = 'const vm = require("vm")\nconst sandbox = {}\nvm.createContext(sandbox)\n const src = '
    // add all arguments to the sandbox
    var postVm = ''
    vars.forEach((name) => {
      postVm += '\nsandbox.' + name + ' = ' + name
    })
    postVm += '\nreturn vm.runInContext(src, sandbox)\n'
    const innerCode = preVm + limitedBlock + postVm
    node.update('{\n' + innerCode + '}')
  }
})
fs.writeFileSync(outputFilename, output, 'utf8')
