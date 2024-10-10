//  https://docs.google.com/spreadsheets/d/1__Mtndpq84kKXbbGKaxcHZ8UVzqDKlkaJz6m5l5_15k/edit?usp=sharing
const ghostToCode = require('./ghostToCode.json') // one character assigned to each and every 19,606 possible combinations of the digits 0,1,2,3,5,6,7 up to length of 5 in a set
const quantityDigits = require('./quantityDigits.json') // quantityDigits will be used to multiply ghostToCode characters. it is a Base-11499 number system to minimize repetition
const codeToGhost = {}
const charAmt = quantityDigits.length+1
const quantityMark = ["","",...quantityDigits]
                  // empty string for 0 and 1
Object.entries(ghostToCode).forEach(e=>codeToGhost[e[1]]=e[0])

module.exports = {
  compress: ghost => ghost.match(/[0123567]{1,5}/g).map(set => ghostToCode[set]).join('').match(/(.)\1*/g).map(set => {
    if(quantityMark[set.length] !== undefined) return set[0]+quantityMark[set.length]

    let returnStr = ""
    for(let i=0; i<Math.floor(set.length/charAmt); i++) {
      returnStr += set[0]+quantityMark[charAmt]
    }
    returnStr += set[0]+quantityMark[set.length%charAmt]
    return returnStr
  }).join(''),
  decompress: code => code.match(new RegExp(`\\W[${quantityDigits}]?`,'g')).map(set => {
    if(set.length===1) return codeToGhost[set]
    if(set.length!==2) return '' // Invalid Length
    const [code_, quantity] = set.split('')
    return codeToGhost[code_].repeat(quantityMark.indexOf(quantity))
  }).filter(Boolean).join('')
}