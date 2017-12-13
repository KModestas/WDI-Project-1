

let gameOver = false;
let gameMode = null;
let computerSelectTurn = null;
let dieRollNumber = null;
let turn = 'player1';

let $playerSquare = null;

// all elements grabbed from DOM
const $rollDieButton = $('.rollDie');
const $singlePlayerButton = $('.singlePlayer');
const $characterButton = $('.characterButton');

// player objects

const player1 = {
  title: 'player1',
  displayName: 'Player 1', // refers to name you want to display on screen to user
  total: 0,
  character: null // this value must match up to the css class that displays the character image
};

const player2 = {
  title: 'player2',
  displayName: 'Player 2',
  total: 0,
  character: null
};

const computer = {
  title: 'computer',
  displayName: 'Computer',
  total: 0,
  character: null
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
  { position: 22 }
];


// singplayer game mode functionality

$singlePlayerButton.on('click', function(){
  gameMode = 'singlePlayer';
  computerSelectTurn = false;
  console.log(gameMode);
  console.log(computerSelectTurn);
  // character-select-menu = display block
});

$characterButton.on('click', function(e){
  setPlayer1Property(e);
  computersChoice(e);
});

function setPlayer1Property(e) {
  let player1CharacterProperty = e.target.innerText;
  player1CharacterProperty = player1CharacterProperty.toLowerCase();
  player1.character = player1CharacterProperty;

  for (let i = 0; i < characters.length; i++) {
    if (player1.character === characters[i]) {
      characters.splice(i, 1);
    }
  }
  computerSelectTurn = true;
  console.log(computerSelectTurn);

}

function computersChoice() {
  if (computerSelectTurn) {
    computer.character = characters[0];
  }
}

// rolls die and stores number in dieRollNumber

function rollDie() {
  dieRollNumber = Math.floor(Math.random() * 6) + 1;
}


// player object is passed in as an argument in this function which then passes a reference to the player object to the processTurn function (the reference being player) which contains all of the other functions that process the object and gives them access to the player object and its properties.

$rollDieButton.on('click', ()=> {
  $rollDieButton.prop( 'disabled', true );
  switch (turn) {
    case 'player1':
      processTurn(player1);
      if (gameMode === 'singlePlayer')
        setTimeout(function(){
          processTurn(computer);
        },1000);
      break;
    case 'player2':
      processTurn(player2);
      break;
  }
  setTimeout(function(){
    $rollDieButton.prop( 'disabled', false );
  },1000);
  console.log(dieRollNumber);
  console.log(player1.total);

});

function processTurn(player) {
  rollDie();
  addPlayerTotal(player); // refactored
  placePlayer(player); // refactored
  checkForChimneys(player); // refactored
  checkForCandyCanes(player); // refactored
  gameStatus(player); // refactored
  changeTurn();

}

// create function in processturn that changes the turn variable to the appropriate players turn

function changeTurn() {
  if (turn === 'player1' && gameMode === 'singlePlayer') {
    turn = 'computer';
  } else if (turn === 'computer' && gameMode === 'singlePlayer') {
    turn = 'singlePlayer';
  }
}

// then computer can have its own switch code block on rollediebutton

// have the check for coals and for presents function in processturn, BEFORE the changeturn function

function addPlayerTotal(player) {
  player.total += dieRollNumber;
}


// place player on board
function placePlayer(player) {
  $(`.${player.character}`).removeClass(`${player.character}`);
  $playerSquare = $(`[data-id="${player.total}"]`);
  $playerSquare.addClass(`${player.character}`);
}
// change player.title to player.character inorder to display the correct image



function gameStatus(player) {
  if (player.total >= 100) {
    gameOver = true;
    alert(`${player.displayName} wins!`);
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
      player1Turn = true;
      console.log('player1 has been gifted another go, merry christmas!');
    }
  }
}

function checkForCoals(player) {
  for (let i = 0; i < coals.length; i++) {
    if (coals[i].position === player.total) {
      player2Turn = true;
      console.log('player1 has been naughty this year and must miss their go');
    }
  }
}
