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

function checkUpdate(update) {
    let middleNumber = 0, isValid = true

    update.forEach((pageNumber, index, update) => {
        if (index === update.length - 1 && isValid) middleNumber = update[(update.length-1)/2]
        
        for(let i = index; i<update.length-1; i++) {
            let rule = rules[update[i]]
            if (rule && rule.indexOf(pageNumber) !== -1) isValid = false
        }
    })
    return middleNumber
}

let result = 0

pages.forEach(update => {
    result += Number(checkUpdate(update))
})

console.log(result)