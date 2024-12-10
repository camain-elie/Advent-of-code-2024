const fs = require('fs')

const input = fs.readFileSync('./input', 'utf-8')
const reportArray = input.split('\r\n')

function isSafe (report) {
    let increasing, previous, safe = true
    report.forEach(item => {
        if (previous) {
            if (increasing === undefined) increasing = previous < item

            const increasingRule = increasing && previous < item || !increasing && previous > item
            const difference = Math.abs(previous - item)
            const differenceRule = difference <= 3 && difference >= 1
            
            if (!(increasingRule && differenceRule)) safe = false
        }
        previous = item
    })
    return safe
}

let safeReportsNumber = 0

reportArray.forEach(item => {
    const levels = item.split(/\s+/).map(Number)
    if (isSafe(levels)) safeReportsNumber++})

console.log(safeReportsNumber)