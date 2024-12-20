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

let totalDistance = 0
for(let i = 0; i < 1000; i++) {
    totalDistance += Math.abs(rightList[i] - leftList[i])
}

console.log(totalDistance)