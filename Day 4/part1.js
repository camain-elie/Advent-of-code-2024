const fs = require('fs')

const input = fs.readFileSync('./input', 'utf-8')

const lineArray = input.split('\r\n')
const letterArray = lineArray.map(item => item.split(''))

function checkVertically (array, x, y) {
  let nXMAS = 0
  if (array[x][y+1] === "M" && array[x][y+2] === "A" && array[x][y+3] === "S") nXMAS++
  if (array[x][y-1] === "M" && array[x][y-2] === "A" && array[x][y-3] === "S") nXMAS++
  return nXMAS
}

function checkHorizontally (array, x, y) {
  console.log(x, y, array[0][8])
  let nXMAS = 0
  if (array[x+3] && array[x+1][y] === "M" && array[x+2][y] === "A" && array[x+3][y] === "S") nXMAS++
  if (array[x-3] && array[x-1][y] === "M" && array[x-2][y] === "A" && array[x-3][y] === "S") nXMAS++
  return nXMAS
}

function checkDiagonally (array, x, y) {
  let nXMAS = 0
  if (array[x-3] && array[x-1][y-1] === "M" && array[x-2][y-2] === "A" && array[x-3][y-3] === "S") nXMAS++
  if (array[x-3] && array[x-1][y+1] === "M" && array[x-2][y+2] === "A" && array[x-3][y+3] === "S") nXMAS++
  if (array[x+3] && array[x+1][y-1] === "M" && array[x+2][y-2] === "A" && array[x+3][y-3] === "S") nXMAS++
  if (array[x+3] && array[x+1][y+1] === "M" && array[x+2][y+2] === "A" && array[x+3][y+3] === "S") nXMAS++
  return nXMAS
}

function checkXMAS (array, x, y) {
  return checkVertically(array, x, y) + checkHorizontally(array, x, y) + checkDiagonally(array, x, y)
}

let XMASNumber = 0

letterArray.forEach((line, xIndex, letterArray) => {
  line.forEach((value, yIndex, line) => {
    if (value === 'X') XMASNumber += checkXMAS(letterArray, xIndex, yIndex)
  })
})

console.log(XMASNumber)