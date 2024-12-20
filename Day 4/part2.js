const fs = require('fs')

const input = fs.readFileSync('./input', 'utf-8')

const lineArray = input.split('\r\n')
const letterArray = lineArray.map(item => item.split(''))

function checkXMAS (array, x, y) {
  return (array[x-1] && array[x+1] && 
    (array[x-1][y-1] === "M" && array[x+1][y+1] === "S" || array[x-1][y-1] === "S" && array[x+1][y+1] === "M") &&
    (array[x-1][y+1] === "M" && array[x+1][y-1] === "S" || array[x-1][y+1] === "S" && array[x+1][y-1] === "M"))
}

let XMASNumber = 0

letterArray.forEach((line, xIndex, letterArray) => {
  line.forEach((value, yIndex, line) => {
    if (value === 'A' && checkXMAS(letterArray, xIndex, yIndex)) XMASNumber++
  })
})

console.log(XMASNumber)