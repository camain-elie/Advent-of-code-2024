const fs = require('fs')

const input = fs.readFileSync('./input/list', 'utf-8')

const instructionArray = input.match(/mul\([0-9]+,[0-9]+\)|do\(\)|don\'t\(\)/g)

let enabled = true

multiplyArray = instructionArray.filter((item, index, array) => {
    if (item === "do()") enabled = true
    else if (item === "don't()") enabled = false
    return !(item === "do()" || !enabled)
})

const result = multiplyArray.reduce((previous, item) => {
  const [a,b] = item.match(/[0-9]+/g)
  return a*b + previous
}, 0)

console.log(result)