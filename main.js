

const X_CLASS = 'x';
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById("board")
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const retartButton = document.getElementById('restartButton')

let circleTurn



startGame()
retartButton.addEventListener('click',startGame)
retartButton.addEventListener("touch",startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click",handleClick)
        cell.removeEventListener("touch",handleClick)
        cell.addEventListener("click", handleClick, { once: true })
        cell.addEventListener("touch", handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}

function handleClick(e) {

    const cell = e.target
    const currectClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    //place mark
    placeMark(cell, currectClass)

    if (checkWin(currectClass)) {
        //check for win
        console.log('winz')
        endGame(false)
    } 
    else if(isDraw()){
        //check for draw
        endGame(true)
    }else{
        //switch turns
        swapTurns()
        setBoardHoverClass()
    }



  
}

function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }


  function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
  }

function placeMark(cell, currectClass) {
    cell.classList.add(currectClass);
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS)
    }

}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


