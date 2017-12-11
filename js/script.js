let player1Total = 0;
let player2Total = 0;
let computerTotal = 0;
let computerTurn = false;
let player1Turn = true; // dont forget to change this
let player2Turn = null;
let gameOver = false;
let dieRollNumber = null;

const $rollDieButton = $('.rollDie');


// create function that rolls die
// if player1Turn add result to player1total
// else do same but for player2

$rollDieButton.on('click', ()=> {
  dieRollNumber = Math.floor(Math.random() * 6) + 1;
  addPlayerTotal();
  checkPosition();
  gameStatus();
  console.log(dieRollNumber);
  console.log(player1Total);
});

addPlayerTotal =()=> {
  if (player1Turn) {
    return player1Total += dieRollNumber ;
  }
  else {
    return player2Total += dieRollNumber ;
  }
};

// place player1 on board
checkPosition =()=> {
  $('.player1').removeClass('player1');
  let $player1 = $(`[data-id="${player1Total}"]`);
  $player1.addClass('player1');
}



gameStatus =()=> {
  if (player1Total >= 100) {
    gameOver = true;
    alert("player1 Wins!");
  }
}

// create function that checks if player has class of chimney / candycane if true then move player to checkPosition

// how would


checkSquareType =()=> {
  // check sqaure type and change playertotal accordingly
  // call this in roll div
}
