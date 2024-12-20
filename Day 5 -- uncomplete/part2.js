const fs = require('fs')

const input = fs.readFileSync('./input', 'utf-8')

const rulesInput = input.match(/[0-9]+\|[0-9]+/g)
const pagesInput = input.match(/([0-9])+,([0-9][0-9],)*([0-9])+/g)

const rules = {}
rulesInput.forEach(item => {
    const [pre, post] = item.split('|')
    rules[pre] = [...(rules[pre] ?? []), post]
})

const pages = pagesInput.map(item => item.split(','))

const wrongUpdates = [], pbNumber = [], fixedUpdates = []

function checkUpdate(update) {
    let isValid = true, fixedArray

    update.forEach((pageNumber, index, update) => {        
        for(let i = index; i<update.length-1; i++) {
            let rule = rules[update[i]]
            if (rule && rule.indexOf(pageNumber) !== -1) {
              pbNumber.push(pageNumber)
              isValid = false

              // try to fix the array
              if (!fixedArray) {
                fixedArray = [...update]
                fixedArray.splice(i, 1)
                fixedArray.splice(index, 0, update[i])
                // fixedUpdates.push(fixedArray)
              }
            }
        }
    })

    if (!isValid) {
      wrongUpdates.push(update)
      fixedUpdates.push(fixedArray)
      // pbNumber.push()
    
    }
    return 0
}

let result = 0

pages.forEach((update) => {
    result += Number(checkUpdate(update), )
})

let resultFixedArray = fixedUpdates.reduce((prev, curr, arr) => prev + Number(curr[(curr.length-1)/2]), 0)
// function correctUpdate(update) {

// }

console.log(result, wrongUpdates[0], pbNumber[0], wrongUpdates.length, fixedUpdates.length, resultFixedArray)