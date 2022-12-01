const startbtn = document.getElementById('startbtn')
const pntMenu = document.getElementById('pointMenu')
const userChoices = document.getElementById('userchoices')
const cNav = document.getElementById('centralNav')

const playerPntMenu = document.getElementById('playerPointMenu')
const cpuPntMenu = document.getElementById('cpuPointMenu')

playerPntMenu.style.display = 'none'
cpuPntMenu.style.display = 'none'

const continueBtn = document.createElement('button')
continueBtn.textContent = 'Continue'
continueBtn.classList.add('btn')
continueBtn.classList.add('btn-primary')
continueBtn.style.display = 'none'
cNav.appendChild(continueBtn)

let userpnts = 0
let cpupnts = 0
let targetpnts = 0

const ctnGame = document.createElement('button')
ctnGame.textContent = 'Continue Prev Game'
ctnGame.classList.add('btn')
ctnGame.classList.add('btn-primary')
ctnGame.style.display = 'none'
cNav.appendChild(ctnGame)

const cpuTurnbtn = document.createElement('button')
cpuTurnbtn.textContent = 'CPU turn'
cpuTurnbtn.classList.add('btn')
cpuTurnbtn.classList.add('btn-primary')
cpuTurnbtn.style.display = 'none'
cNav.appendChild(cpuTurnbtn)

const resetbtn = document.createElement('button')
resetbtn.textContent = 'Reset'
resetbtn.classList.add('btn')
resetbtn.classList.add('btn-primary')
resetbtn.style.display = 'none'
cNav.appendChild(resetbtn)

const rock = document.createElement('button')
rock.textContent = 'Rock'
rock.classList.add('btn')
rock.classList.add('btn-primary')

const paper = document.createElement('button')
paper.textContent = 'Paper'
paper.classList.add('btn')
paper.classList.add('btn-primary')

const scissors = document.createElement('button')
scissors.textContent = 'Scissors'
scissors.classList.add('btn')
scissors.classList.add('btn-primary')

scissors.style.display = 'none'
rock.style.display = 'none'
paper.style.display = 'none'

userChoices.appendChild(rock)
userChoices.appendChild(paper)
userChoices.appendChild(scissors)

const playerPic = document.getElementById('playerPic')
const compPic = document.getElementById('cpuPic')

let userMove = 0

const curPlayerPoints = document.getElementById('playerPoints')
const curCpuPoints = document.getElementById('cpuPoints')

curCpuPoints.style.display = 'none'
curPlayerPoints.style.display = 'none'

const rndResult = document.getElementById('result')

ctnGame.addEventListener('click', () => {
  userpnts = parseInt(localStorage.getItem('savedPlayerPoints'))
  cpupnts = parseInt(localStorage.getItem('savedCPUPoints'))
  targetpnts = parseInt(localStorage.getItem('savedTargetPoints'))

  ctnGame.style.display = 'none'
  startbtn.style.display = 'none'
  pntMenu.style.display = 'none'

  curCpuPoints.style.display = 'block'
  curPlayerPoints.style.display = 'block'
  curCpuPoints.textContent = cpupnts
  curPlayerPoints.textContent = userpnts

  scissors.style.display = 'block'
  rock.style.display = 'block'
  paper.style.display = 'block'
  resetbtn.style.display = 'block'
  playerPntMenu.style.display = 'block'
  cpuPntMenu.style.display = 'block'
})

startbtn.addEventListener('click', () => {
  ctnGame.style.display = 'none'
  targetpnts = pntMenu.value
  console.log(targetpnts)
  startbtn.style.display = 'none'
  pntMenu.style.display = 'none'

  scissors.style.display = 'block'
  rock.style.display = 'block'
  paper.style.display = 'block'
  resetbtn.style.display = 'block'
  curCpuPoints.style.display = 'block'
  curPlayerPoints.style.display = 'block'

  localStorage.setItem('savedPlayerPoints', userpnts)
  localStorage.setItem('savedCPUPoints', cpupnts)
  localStorage.setItem('savedTargetPoints', targetpnts)
  localStorage.setItem('gameInProgress', 1)

  playerPntMenu.style.display = 'block'
  cpuPntMenu.style.display = 'block'
  curCpuPoints.textContent = 0
  curPlayerPoints.textContent = 0
})

if (parseInt(localStorage.getItem('gameInProgress')) === 1) {
  ctnGame.style.display = 'block'
}

scissors.addEventListener('click', () => {
  console.log('S!')
  playerPic.src = ('images/4VAR8_AS01.png')
  disableButtons()

  userMove = 2
})

paper.addEventListener('click', () => {
  console.log('P!')
  playerPic.src = ('images/Notebook-Paper-US-Letter.png')
  disableButtons()

  userMove = 1
})

rock.addEventListener('click', () => {
  console.log('R!')
  playerPic.src = ('images/1200px-Two-parts_stone_nikogda_takih_ne_videl_vot.png')
  disableButtons()

  userMove = 0
})

cpuTurnbtn.addEventListener('click', () => {
  continueBtn.style.display = 'block'
  determineResult(userMove, pickCPUMove())
  cpuTurnbtn.style.display = 'none'
})

continueBtn.addEventListener('click', () => {
  continueBtn.style.display = 'none'
  if (checkWin() === false) {
    playerPic.src = 'images/player.png'
    compPic.src = 'images/computer-lab-icon-2.png'
    enableButtons()
    rndResult.textContent = ''
  }
})

resetbtn.addEventListener('click', reset)

function reset () {
  userpnts = 0
  cpupnts = 0
  targetpnts = 0

  startbtn.style.display = 'block'
  pntMenu.style.display = 'block'

  scissors.style.display = 'none'
  rock.style.display = 'none'
  paper.style.display = 'none'
  resetbtn.style.display = 'none'
  cpuTurnbtn.style.display = 'none'

  playerPic.src = ('images/player.png')
  compPic.src = 'images/computer-lab-icon-2.png'

  playerPntMenu.style.display = 'none'
  cpuPntMenu.style.display = 'none'

  rndResult.textContent = ''
  localStorage.setItem('gameInProgress', 0)
  enableButtons()
}

function disableButtons () {
  cpuTurnbtn.style.display = 'block'

  scissors.disabled = true
  rock.disabled = true
  paper.disabled = true
}

function enableButtons () {
  scissors.disabled = false
  rock.disabled = false
  paper.disabled = false
}

function pickCPUMove () {
  // Math.random() generates a number between 0(inclusive) and 1(exclusive).
  // We multiply that by 3 for 3 possible moves.  now we have a number between 0(inclusive) and 3(exclusive).
  // Math.floor(x) rounds down to the nearest int, giving us one of three values (0, 1, or 2)
  const move = Math.floor(Math.random() * 3)

  if (move === 0) {
    compPic.src = ('images/1200px-Two-parts_stone_nikogda_takih_ne_videl_vot.png')
  } else if (move === 1) {
    compPic.src = ('images/Notebook-Paper-US-Letter.png')
  } else {
    compPic.src = ('images/4VAR8_AS01.png')
  }

  return move
}

function determineResult (playerMove, CPUMove) {
  /* Possible Moves
       0 - rock
       1 - paper
       2 - scissors
    */

  if (playerMove === CPUMove) {
    rndResult.textContent = 'Nobody Wins this round!'
    return 'Draw'
  } else if (((playerMove + 2) % 3) === CPUMove) {
    userpnts += 1
    curPlayerPoints.textContent = userpnts
    rndResult.textContent = 'Player Wins this round!'
    localStorage.setItem('savedPlayerPoints', userpnts)
    return 'PlayerWin'
  } else {
    cpupnts += 1
    curCpuPoints.textContent = cpupnts
    rndResult.textContent = 'CPU Wins this round!'
    localStorage.setItem('savedCPUPoints', cpupnts)
    return 'CPUWin'
  }
}

function checkWin () {
  if (userpnts >= targetpnts) {
    rndResult.textContent = 'Game end - Player Wins!'
    localStorage.setItem('gameInProgress', 0)
    return 'Game end - PlayerWin'
  } else if (cpupnts >= targetpnts) {
    rndResult.textContent = 'Game end - CPU Wins!'
    localStorage.setItem('gameInProgress', 0)
    return 'Game end - CPUWin'
  } else {
    return false
  }
}
