const X_CLASS = "x"
const resttartButton = document.querySelector("#restartButton")
const CIRLCE_CLASS = "circle"
const cellElements = document.querySelectorAll('[data-cell')
const board = document.querySelector("#board")
const winningMessageElement = document.querySelector("#winnigMessage")
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
resttartButton.addEventListener("click", startGame)
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
let circleTurn
startGame()
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRLCE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    })
    steBoardHoverClass()
    winningMessageElement.classList.remove("show")
}
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRLCE_CLASS : X_CLASS
    placemark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        steBoardHoverClass()
    }
}
function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = `Draw!`
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add("show")
}
function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRLCE_CLASS)
    })
}
function swapTurns() {
    circleTurn = !circleTurn
}
function steBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRLCE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRLCE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}