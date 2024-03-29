//buttons
let startButton = document.getElementById('start-button')
let inflateButton = document.getElementById('inflate-button')

// #region GAME LOGIC AND DATA

//data
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxsize = 300
let highestPopCount = 0
let currentPopCount = 0
let gameLength = 5000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}

function startGame() {

    startButton.setAttribute("disabled", "true")
    inflateButton.removeAttribute("disabled")
    startClock()
    setTimeout(stopGame, gameLength)
}
function startClock() {
    timeRemaining = gameLength
    clockId = setInterval(drawClock, 1000)
}
function stopClock() {
    clearInterval(clockId)
}
function drawClock() {
    let countDownElem = document.getElementById('countdown')
    timeRemaining -= 1000
    countDownElem.innerText = (timeRemaining / 1000).toString()
}
function inflate() {
    clickCount++
    height += inflationRate
    width += inflationRate

    if (height >= maxsize) {
        console.log("pop the balloon")
        currentPopCount++
        height = 0
        width = 0
        stopClock
    }
    draw()
}
function draw() {
    let balloonElement = document.getElementById("Balloon")
    let clickCountElem = document.getElementById("click-count")
    let popCountElem = document.getElementById('pop-count')
    let highPopCount = document.getElementById('high-pop-count')

    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    clickCountElem.innerText = clickCount.toString()
    popCountElem.innerText = currentPopCount.toString()
    highPopCount.innerText = currentPlayer.topScore.toString()
}
function stopGame() {
    console.log("the game is over")

    inflateButton.setAttribute("disabled", "true")
    startButton.removeAttribute("disabled")

    clickCount = 0
    height = 120
    width = 100
    if (currentPopCount > currentPlayer.topScore) {
        currentPlayer.topScore = currentPopCount
        savePlayers()
    }
    currentPopCount = 0

    stopClock()
    draw()
}
// #endregion

let players = []
loadPlayers()

function setPlayer(event) {
    event.preventDefault()
    let form = event.target

    let playerName = form.playerName.value

    currentPlayer = players.find(player => player.name == playerName)
    if (!currentPlayer) {
        currentPlayer = { name: playerName, topScore: 0 }
        players.push(currentPlayer)
        savePlayers()
    }
    console.log(currentPlayer)
    form.reset()
    document.getElementById("game").classList.remove("hidden")
    form.classList.add("hidden")
    draw()
}
function changePlayer() {
    document.getElementById('player-form').classList.remove("hidden")
    document.getElementById("game").classList.add("hidden")
}
function savePlayers() {
    window.localStorage.setItem("players", JSON.stringify(players))
}
function loadPlayers() {
    let playersData = JSON.parse(window.localStorage.getItem("players"))
    if (!playersData) {
        players = playersData
    }
}