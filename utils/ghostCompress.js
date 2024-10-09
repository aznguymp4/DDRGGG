// https://docs.google.com/spreadsheets/d/1KvC_ZLgJAivgMwbbYcK3EnkWGojBeIV6O26hS4MY7BU/edit?gid=0#gid=0
const ghostToCode = require('./ghostToCode.json')
const codeToGhost = {}
Object.entries(ghostToCode).forEach(e=>codeToGhost[e[1]]=e[0])

module.exports = {
  compress: ghost => ghost.match(/[0123567]{1,5}/g).map(set => ghostToCode[set]).join(''),
  decompress: code => code.split('').map(code => codeToGhost[code]).filter(Boolean).join('')
}