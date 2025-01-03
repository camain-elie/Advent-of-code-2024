const fs = require('fs')

const input = fs.readFileSync('./input', 'utf-8')

const lineArray = input.split('\r\n')
const map = lineArray.map(item => item.split(''))
const direction = [
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
]
let directionIndex = 0
let position = {x: -1, y: -1}

map.forEach((item, index) => {
    const x = item.indexOf('^')
    if (x !== -1) {
        position.x = x
        position.y = index
    }
})

while (position.x >=0 && position.x < map[0].length && position.y >= 0 && position.y < map.length) {
    if (checkNextPosObstacle()) {
        changeDirection()
    } else {
        move()
    }
}

function changeDirection () {
    directionIndex++
    if (directionIndex > direction.length - 1) directionIndex = 0    
}

function checkNextPosObstacle () {
    const {x: dirX, y: dirY} = direction[directionIndex]
    let pos = {x: position.x + dirX, y: position.y + dirY}
    return map[pos.y][pos.x] === "#"
}

function move () {
    let {x: dirX, y: dirY} = direction[directionIndex],
        {x, y} = position
    let newPos = { x: x + dirX, y: y + dirY }
    map[y][x] = 'X'
    position = newPos
}

const toString = map.map(item => item.join('')).join('\n')

fs.writeFile('./output.txt', toString, err => {
  if (err) console.error(err)
})
