const fs = require('fs')

const input = fs.readFileSync('./input/list', 'utf-8')
const unfilteredArray = input.split(/\s+/)

const leftList = [], rightList = []

unfilteredArray.forEach(item => 
    leftList.length === rightList.length ?
    leftList.push(Number(item))
    : rightList.push(Number(item))
)

leftList.sort()
rightList.sort()

const counts = {}

for (const num of rightList) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

let similarityScore = 0
leftList.forEach(item => similarityScore += item * (counts[item] ?? 0))

console.log(similarityScore)