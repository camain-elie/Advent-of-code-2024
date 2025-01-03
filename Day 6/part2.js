const fs = require('fs')

const input = fs.readFileSync('./input', 'utf-8')

// INIT

console.time('init')

const lineArray = input.split('\r\n')
const map = lineArray.map(item => item.split(''))
const obstacleMap = [...lineArray].map(item => item.split(''))
const direction = [
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
]
const directionChar = ['↑', '→', '↓', '←']
let directionIndex = 0
let position = {x: -1, y: -1}, initialPosition
let directionChanged = false

map.forEach((item, index) => {
    const x = item.indexOf('^')
    if (x !== -1) {
        position.x = x
        position.y = index
    }
})

initialPosition = {...position}

console.timeEnd('init')

// FUNCTIONS

function calculatePath(write) {
  while (position.x >=0 && position.x < map[0].length && position.y >= 0 && position.y < map.length) {
    if (checkNextPosObstacle()) {
      directionIndex = changeDirection(directionIndex)
      directionChanged = true
    } else {
      move(write)
      directionChanged = false
    }
  }
}

function changeDirection (currentDir) {
    let newDirection = currentDir + 1
    if (newDirection > direction.length - 1) newDirection = 0
    return newDirection

}

function checkNextPosObstacle () {
    const {x: dirX, y: dirY} = direction[directionIndex]
    let pos = {x: position.x + dirX, y: position.y + dirY}
    return map[pos.y][pos.x] === "#"
}

function move (write) {
    let {x: dirX, y: dirY} = direction[directionIndex],
        {x, y} = position
    let newPos = { x: x + dirX, y: y + dirY }
    const char = directionChanged ? '+' : directionChar[directionIndex]
    if (write) map[y][x] = char
    else checkAddObstacle(directionIndex, position)
    position = newPos
}

function checkAddObstacle ( directionIndex, currentPosition ) {
  const { x: dirX, y: dirY } = direction[directionIndex],
    { x, y } = currentPosition
  const nextX = x + dirX, nextY = y + dirY
  
  if (map[nextY] && map[nextY][nextX] !== '#') {
    let newDir = changeDirection(directionIndex),
      newPosition = {...currentPosition}
    const correctChar = directionChar[newDir]

    let directionCondition = false, directionChangeCondition = false

    while (newPosition.x >=0 && newPosition.x < map[0].length && newPosition.y >= 0 && newPosition.y < map.length) {
      newPosition = { x: direction[newDir].x + newPosition.x, y: direction[newDir].y + newPosition.y }
      if (map[newPosition.y] && map[newPosition.y][newPosition.x] === correctChar) directionCondition = true
      if (map[newPosition.y] && map[newPosition.y][newPosition.x] === '#') directionChangeCondition = true 
    }


    if(directionCondition && directionChangeCondition) obstacleMap[nextY][nextX] = 'O'
  }
}

function reinitState() {
  position = initialPosition
  directionIndex = 0
  directionChanged = false
}

// RUN

console.time('path')
calculatePath(true)
console.timeEnd('path')

console.time('obstacle')
reinitState()
calculatePath(false)
console.timeEnd('obstacle')

const mapString = map.map(item => item.join('')).join('\n'),
  obstacleString = obstacleMap.map(item => item.join('')).join('\n')

// answer is above 1602

fs.writeFile('./output.txt', mapString, err => {
  if (err) console.error(err)
})
fs.writeFile('./obstacle.txt', obstacleString, err => {
  if (err) console.error(err)
})
