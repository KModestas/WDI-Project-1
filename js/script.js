
let gameOver = false;
// allows computer to select their character
let computerSelectTurn = null;
// resulting number from rolling die is stored
let dieRollNumber = null;
let removedCharacter = null;
let $playerSquare = null;
const turn = 'player1';


// all elements grabbed from DOM
const $rollDieButton = $('.die');
const $characterButton = $('.character-button');
const $characterMenu = $('.character-select-menu');
const $gameBoard = $('.game-board');
const $rollDieDiv = $('.roll-die-div');
const $player1GameLog = $('.player-1-game-log');
const $computerGameLog = $('.computer-game-log');


// player objects
const player1 = {
  title: 'player1',
  displayName: 'Player 1', // refers to name you want to display on screen to user
  total: 0, // total number from die rolls
  character: null, // this value must match up to the css class that displays the character image
  coal: false
};


const computer = {
  title: 'computer',
  displayName: 'Computer',
  total: 0,
  character: null,
  coal: false
};


// characters array stores class names of characters
const characters = ['santa', 'elf'];


// chimneys array
const chimneys = [
  {
    position: 93,
    targetPosition: 66
  },
  {
    position: 90,
    targetPosition: 51
  },
  {
    position: 54,
    targetPosition: 7
  },
  {
    position: 97,
    targetPosition: 44
  },
  {
    position: 60,
    targetPosition: 39
  }
];


// candycanes array
const candyCanes = [
  { position: 78,
    targetPosition: 98
  },
  {
    position: 52,
    targetPosition: 85
  },
  {
    position: 12,
    targetPosition: 69
  },
  {
    position: 3,
    targetPosition: 37
  },
  {
    position: 40,
    targetPosition: 63
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


// plays in game music
function playSound() {
  const audio = $('audio').get(0);
  $(audio).attr('src','./sounds/song.mp3');
  audio.play();
}


playSound();


$characterButton.on('click', function(e){
  // assigns the character the player clicks on
  setPlayer1Property(e);
  // computer assigne character after player
  computersChoice(e);
  // game log text color depending on character
  characterColor();
  // loads gameboard
  loadGame();
});


function characterColor() {
  if (player1.character === 'santa') {
    $player1GameLog.addClass('red');
  } else{
    $player1GameLog.addClass('white');
  }

  if (computer.character === 'santa') {
    $computerGameLog.addClass('red');
  } else {
    $computerGameLog.addClass('white');
  }
}


function setPlayer1Property(e) {
  // sets player objects character to be the character they selected in menu
  let player1CharacterProperty = (e.target).innerText;
  player1CharacterProperty = player1CharacterProperty.toLowerCase();
  player1.character = player1CharacterProperty;

  // removes players picked character from characers array so computer cant pick it
  for (let i = 0; i < characters.length; i++) {
    if (player1.character === characters[i]) {
      characters.splice(i, 1);
    }
  }
  computerSelectTurn = true;
}


// assigns the remaining character in characters array to computer after player has made selection
function computersChoice() {
  if (computerSelectTurn) {
    computer.character = characters[0];
  }
}


// hides character select menu and loads gameboard and die div
function loadGame() {
  $characterMenu.hide();
  $gameBoard.addClass('visible');
  $rollDieDiv.addClass('visible');
}

// have coal property on each object
// have if statement that checks if coal is true, if thats the case then dont process the turn and then change coal proerty to false;


// player and computer object gets passed as arguments for process turn which gives all other function sin process turn access to the player/computer objects properties under the reference name/variable of "player"
$rollDieButton.on('click', ()=> {
  $rollDieButton.prop('disabled', true );

  setTimeout(function(){
    processTurn(player1);
  },250);
  setTimeout(function(){
    processTurn(computer);
  },1000);

  setTimeout(function(){
    $rollDieButton.prop( 'disabled', false );
  },1000);
});

function processTurn(player) {
  // should check for player.coal to be true
  if (gameOver === false) {
    // if player has coal, coal is set to false and players turn is not processed this go.
    if (player.coal) {
      player.coal = false;
    } else if (!player.coal) {
      rollDie(player);
      addPlayerTotal(player);
      placePlayer(player);
      addCoal(player);
      checkForChimneys(player);
      checkForCandyCanes(player);
      gameStatus(player);
    }
  }
}

// rolls die and stores number in dieRollNumber
function rollDie(player) {
  dieRollNumber = Math.floor(Math.random() * 6) + 1;
  if (player.title === 'player1') {
    $player1GameLog.fadeOut();
    $player1GameLog.text(`${player.displayName} rolled a ${dieRollNumber}`);
    $player1GameLog.fadeIn();
  }
  if (player.title === 'computer' ) {
    $computerGameLog.fadeOut();
    $computerGameLog.text(`${player.displayName} rolled a ${dieRollNumber}`);
    $computerGameLog.fadeIn();
  }
}

// adds the resulting number of the die to the player total
function addPlayerTotal(player) {
  player.total += dieRollNumber;
}


// place player on board
function placePlayer(player) {
  // removes class from previous square
  $(`.${player.character}`).removeClass(player.character);
  // grabs the div with the data Id equal to player total from the gameBoard
  $playerSquare = $(`[data-id="${player.total}"]`);
  // adds the players character class to the correct div
  $playerSquare.addClass(`${player.character}`);
}


function gameStatus(player) {
  if (player.total >= 100) {
    gameOver = true;
    $rollDieButton.off('click');
    alert(`${player.displayName} wins!`);

    $player1GameLog.remove();
    $computerGameLog.remove();

    setTimeout(function(){
      window.location.reload();
    }, 500);

  }
}

// functions that Check the square type player lands on

function checkForChimneys(player) {
  for (let i = 0; i < chimneys.length; i++) {
    if (chimneys[i].position === player.total) {
      player.total = chimneys[i].targetPosition;
      placePlayer(player);
      if (player.title === 'player1') {
        $player1GameLog.text(`${player.displayName} went down the chimney!`);
      }
      if (player.title === 'computer' ) {
        $computerGameLog.text(`${player.displayName} went down the chimney!`);
      }
    }
  }
}


function checkForCandyCanes(player) {
  for (let i = 0; i < candyCanes.length; i++) {
    if (candyCanes[i].position === player.total) {
      player.total = candyCanes[i].targetPosition;
      placePlayer(player);
      if (player.title === 'player1') {
        $player1GameLog.text(`${player.displayName} went up the candy Cane!`);
      }
      if (player.title === 'computer' )
        $computerGameLog.text(`${player.displayName} went up the candy Cane!`);
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
      if (player.title === 'player1') {
        $player1GameLog.text(`${player.displayName} has been naughty this year and must miss their go!`);
      }
      if (player.title === 'computer' )
        $computerGameLog.text(`${player.displayName} has been naughty this year and must miss their go!`);
    }
  }
}
