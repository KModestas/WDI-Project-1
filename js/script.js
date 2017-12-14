

let gameOver = false;
let gameMode = null;
let computerSelectTurn = null;
let dieRollNumber = null;
let turn = 'player1';
let removedCharacter;
<<<<<<< HEAD
=======

>>>>>>> 5fbe934f013c120b138d9ada65e53f144cccf450
let $playerSquare = null;

// all elements grabbed from DOM
const $rollDieButton = $('.rollDie');
const $characterButton = $('.characterButton');
const $characterMenu = $('.character-select-menu');
<<<<<<< HEAD
=======
// const $goBack = $('.go-back');
// const $playButton = $('.play');
>>>>>>> 5fbe934f013c120b138d9ada65e53f144cccf450
const $gameBoard = $('.game-board');
const $rollDieDiv = $('.roll-die-div');
const $player1GameLog = $('.player1GameLog');
const $computerGameLog = $('.computerGameLog');

// player objects

const player1 = {
  title: 'player1',
  displayName: 'Player 1', // refers to name you want to display on screen to user
  total: 0,
  character: null,
  coal: false// this value must match up to the css class that displays the character image
};


const computer = {
  title: 'computer',
  displayName: 'Computer',
  total: 0,
  character: null,
  coal: false
};

// characters array

const characters = ['santa', 'elf'];

// chimneys array

const chimneys = [
  {
    position: 45,
    targetPosition: 17
  },
  {
    position: 53,
    targetPosition: 32
  },
  {
    position: 72,
    targetPosition: 15
  },
  {
    position: 79,
    targetPosition: 61
  },
  {
    position: 94,
    targetPosition: 74
  },
  {
    position: 98,
    targetPosition: 65
  },
  {
    position: 86,
    targetPosition: 67
  }
];

// candycanes array

const candyCanes = [
  { position: 52,
    targetPosition: 85
  },
  {
    position: 38,
    targetPosition: 77
  },
  {
    position: 25,
    targetPosition: 73
  },
  {
    position: 28,
    targetPosition: 59
  },
  {
    position: 75,
    targetPosition: 85
  },
  {
    position: 2,
    targetPosition: 19
  },
  {
    position: 9,
    targetPosition: 31
  }
];

// presents array

const presents = [
  { position: 12 },
  { position: 56 },
  { position: 82 }
];

// coals array

const coals = [
  { position: 95 },
  { position: 13 },
  { position: 23 }
];


// singplayer game mode functionality

// $singlePlayerButton.on('click', function(){
//   computerSelectTurn = false;
//   console.log(gameMode);
//   console.log(computerSelectTurn);
//   $mainMenu.hide();
//   $characterMenu.addClass('visible');
//
// });

$characterButton.on('click', function(e){
  setPlayer1Property(e);
  computersChoice(e);
  loadGame();
});



function setPlayer1Property(e) {
  let player1CharacterProperty = e.target.innerText;
  player1CharacterProperty = player1CharacterProperty.toLowerCase();
  player1.character = player1CharacterProperty;

  for (let i = 0; i < characters.length; i++) {
    if (player1.character === characters[i]) {
      removedCharacter = characters.splice(i, 1);
      removedCharacter = removedCharacter.toString();
    }
  }

  computerSelectTurn = true;
  console.log(computerSelectTurn);

}

function computersChoice(e) {
  if (computerSelectTurn) {
  computer.character = characters[0];
}}


<<<<<<< HEAD


function loadGame() {
=======
// $goBack.on('click', function(){
//   $mainMenu.show();
//   $characterMenu.removeClass('visible');
//   characters[1] = removedCharacter;
//   console.log(characters);
//
// });



  function loadGame() {
>>>>>>> 5fbe934f013c120b138d9ada65e53f144cccf450
  $characterMenu.hide();
  $gameBoard.addClass('visible');
  $rollDieDiv.addClass('visible');
}







// rolls die and stores number in dieRollNumber

function rollDie(player) {
  dieRollNumber = Math.floor(Math.random() * 6) + 1;
  if (player.title === 'player1') {
    $player1GameLog.text(`${player.title} Rolled a ${dieRollNumber}`);
  }
  if (player.title === 'computer' )
  $computerGameLog.text(`${player.title} Rolled a ${dieRollNumber}`);
}

// have coal property on each object
// have if statement that checks if coal is true, if thats the case then dont process the turn and then change coal proerty to false;

// player object is passed in as an argument in this function which then passes a reference to the player object to the processTurn function (the reference being player) which contains all of the other functions that process the object and gives them access to the player object and its properties.

$rollDieButton.on('click', ()=> {
  $rollDieButton.prop( 'disabled', true );
  switch (turn) {
    case 'player1':
      processTurn(player1);
      setTimeout(function(){
        processTurn(computer);
      },1000);
      break;
  }

  setTimeout(function(){
    $rollDieButton.prop( 'disabled', false );
  },1000);


});

function processTurn(player) {
  // should check for player.coal to be true.
  if (player.coal) {
    player.coal = false;
    console.log(`${player.title} has missed their go`);
  } else if (!player.coal) {
    console.log(`${player.title} turn`);
    rollDie(player);
    addPlayerTotal(player); // refactored
    placePlayer(player); // refactored
    addCoal(player); // add coal if the player total is the same as a coal square
    checkForChimneys(player); // refactored
    checkForCandyCanes(player); // refactored
    gameStatus(player); // refactored
  }
}


function addPlayerTotal(player) {
  player.total += dieRollNumber;
}


// place player on board
function placePlayer(player) {    $(`.${player.character}`).removeClass(`${player.character}`);
$playerSquare = $(`[data-id="${player.total}"]`);
$playerSquare.addClass(`${player.character}`);
}

// change player.title to player.character inorder to display the correct image



function gameStatus(player) {
  if (player.total >= 100) {
    gameOver = true;
    alert(`${player.displayName} wins!`);

    // } else if (player.total > 100) {
    //   player.total - dieRollNumber;
    //   const winningNumber = player.total - 100;

    //   console.log(`${player.title} rolled a ${dieRollNumber} but needs a ${winningNumber} towin`);

  }
}



// functions that Check the square type player lands on

function checkForChimneys(player) {
  for (let i = 0; i < chimneys.length; i++) {
    if (chimneys[i].position === player.total) {
      player.total = chimneys[i].targetPosition;
      placePlayer(player);
      console.log(`${player.displayName} went down the chimney`);
    }
  }
}


function checkForCandyCanes(player) {
  for (let i = 0; i < candyCanes.length; i++) {
    if (candyCanes[i].position === player.total) {
      player.total = candyCanes[i].targetPosition;
      placePlayer(player);
      console.log(`${player.displayName} went up the candyCane`);
    }
  }
}

function checkForPresents(player) {
  for (let i = 0; i < presents.length; i++) {
    if (presents[i].position === player.total) {
      // player.present = true;
      console.log(`${player.title} has been gifted another go, merry christmas!`);
    }
  }
}


function addCoal(player) {
  for (let i = 0; i < coals.length; i++) {
    if (coals[i].position === player.total) {
      player.coal = true;
      console.log(`${player.title} has been naughty this year and must miss their go`);
      console.log(`player.coals: ${player.coal}`);
    }
  }
}
