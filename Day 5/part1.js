const fs = require('fs')

const input = fs.readFileSync('./input', 'utf-8')

const rules = input.match(/[0-9]+\|[0-9]+/g)
console.log(rules)
const pages = input.match(/[0-9][0-9],([0-9][0-9],)*[0-9][0-9]/g)
// console.log(pages)

// function checkXMAS (array, x, y) {
//   return (array[x-1] && array[x+1] && 
//     (array[x-1][y-1] === "M" && array[x+1][y+1] === "S" || array[x-1][y-1] === "S" && array[x+1][y+1] === "M") &&
//     (array[x-1][y+1] === "M" && array[x+1][y-1] === "S" || array[x-1][y+1] === "S" && array[x+1][y-1] === "M"))
// }

// let XMASNumber = 0

// letterArray.forEach((line, xIndex, letterArray) => {
//   line.forEach((value, yIndex, line) => {
//     if (value === 'A' && checkXMAS(letterArray, xIndex, yIndex)) XMASNumber++
//   })
// })

// console.log(XMASNumber)