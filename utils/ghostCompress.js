// https://docs.google.com/spreadsheets/d/1KvC_ZLgJAivgMwbbYcK3EnkWGojBeIV6O26hS4MY7BU/edit?gid=0#gid=0
const ghostToCode = require('./ghostToCode.json')
const codeToGhost = {}
const quantityChars = "2345678910abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$-_.+!*()"
const quantityMark = ["","",...quantityChars]
                  // empty string for 0 and 1
Object.entries(ghostToCode).forEach(e=>codeToGhost[e[1]]=e[0])

module.exports = {
  compress: ghost => ghost.match(/[0123567]{1,5}/g).map(set => ghostToCode[set]).join('').match(/(.)\1*/g).map(set => set[0]+quantityMark[set.length]).join(''),
  decompress: code => code.match(new RegExp(`\\W[${quantityChars}]?`,'g')).map(set => {
    if(set.length===1) return codeToGhost[set]
    if(set.length!==2) return '' // Invalid Length
    const [code_, quantity] = set.split('')
    return codeToGhost[code_].repeat(quantityMark.indexOf(quantity))
  }).filter(Boolean).join('')
}