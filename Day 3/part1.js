const fs = require('fs')

const input = fs.readFileSync('./input/list', 'utf-8')

const multiplyArray = input.match(/mul\([0-9]+,[0-9]+\)/g)

const result = multiplyArray.reduce((previous, item) => {
  const [a,b] = item.match(/[0-9]+/g)
  return a*b + previous
}, 0)

console.log(result)