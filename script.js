let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
updateScore();

function updateScore() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }


}



function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let Result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') { Result = 'You Lose' }
    else if (computerMove === 'paper') { Result = 'You Win' }
    else if (computerMove === 'scissors') { Result = 'tie' };
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') { Result = 'You Win' }
    else if (computerMove === 'paper') { Result = 'tie' }
    else if (computerMove === 'scissors') { Result = 'You Lose' };

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') { Result = 'tie' }
    else if (computerMove === 'paper') { Result = 'You Lose' }
    else if (computerMove === 'scissors') { Result = 'You Win' };
  }

  if (Result === 'You Win') {
    score.wins += 1;
  } else if (Result === 'You Lose') {
    score.losses += 1;
  } else if (Result === 'tie') {
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));

  updateScore();

  document.querySelector('.js-result').innerHTML = Result;
  document.querySelector('.js-moves').innerHTML = `you <img src="icons\\${playerMove}.png" height="40px" width="35px"
         class="move-img"> 
       - <img src="icons\\${computerMove}.png" height="40px" width="35px"
         class="move-img">  Computer`;

  /* alert(`You picked ${playerMove}, Computer picked ${computerMove}, ${Result} 
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);*/

}
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}



