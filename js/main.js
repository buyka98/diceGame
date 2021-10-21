    // Player's turn player1 is 0 , player2 is 1 
    let activePlayer;

    // Player's score
    let score;
    
    // Player's round score 
    let roundScore;
    // GameOver status
    let isGameOver;

let score0El = document.querySelector("#score-0")
let score1El = document.querySelector("#score-1")
let currentScore0El = document.querySelector("#current-0")
let currentScore1El = document.querySelector("#current-1")
let btnRollEl = document.querySelector(".btn-roll")
let btnHoldEl = document.querySelector(".btn-hold")
let btnNewEl = document.querySelector(".btn-new")

newGame();
function newGame() {
    isGameOver = false;
    activePlayer = 0;
    roundScore = 0;
    score = [0, 0];
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    document.querySelector(".player-0").classList.remove("winner")
    document.querySelector(".player-1").classList.remove("winner")
    document.querySelector("#name-0").textContent = "Player 1"
    document.querySelector("#name-1").textContent = "Player 2"
    document.querySelector("img").style.display = "none";
    // Add active red round to player 1 and remove it from player 2
    document.querySelector(`.player-0`).classList.add("active");
    document.querySelector(`.player-1`).classList.remove("active");

}

function rollDice(activePlayer) { 
    // Dice: random numbers between 1 to 6 
    let dice = Math.floor(Math.random()*6 + 1);
    roundScore = roundScore  + dice;
    document.querySelector("img").style.display = "block";
    document.querySelector("img").src = `/images/dice${dice}.png`
    // if dice is 1 then switch players
    if (dice !== 1 ){
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    }else {
        switchPlayer();
    }
    
}
function hold(activePlayer) {
    // Add roundScore to score
    score[activePlayer] += roundScore
    // Change score of the player
    document.querySelector(`#score-${activePlayer}`).textContent = score[activePlayer];
    
    if (score[activePlayer] > 20) {
        isGameOver = true;
        document.querySelector("#name-"+ activePlayer).textContent = "winner!!!"
        document.querySelector(".player-"+ activePlayer).classList.add("winner")
    }else{
        switchPlayer()
    }
}

function switchPlayer() {
    // if active player is 0 then change it to 1, else change it to 0 
    document.querySelector(`.player-${activePlayer}`).classList.remove("active");
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
    currentScore1El.textContent = 0;
    currentScore0El.textContent = 0;
    document.querySelector(`.player-${activePlayer}`).classList.add("active");
    document.querySelector("img").style.display = "none";
}
function alertNewGame() {
    alert("Please start a new GAME!!!");
}
btnNewEl.addEventListener("click",  newGame)
btnRollEl.addEventListener("click", function () { isGameOver ? alertNewGame() : rollDice(activePlayer) })
btnHoldEl.addEventListener("click", function () {isGameOver ? alertNewGame() : hold(activePlayer)} )