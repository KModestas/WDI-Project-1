
// allows computer to select their character
let computerSelectTurn = null;
let player1Turn = true;
// resulting number from rolling die is stored
let dieRollNumber = null;
let $playerSquare = null;
let gameOver = false;


// all elements grabbed from DOM
const $die = $('.die');
const $characterButton = $('.character-button');
const $characterMenu = $('.character-menu');
const $gameBoard = $('.game-board');
const $rollDieDiv = $('.roll-die-div');
const $player1GameLog = $('.player-1-game-log');
const $computerGameLog = $('.computer-game-log');
const $winnerDiv = $('.winner-div');
const $winnerName = $('.winner-name');
const $playAgain = $('.play-again');
const $instructions = $('.instructions');
const $proceed = $('.proceed');


// player objects
const player1 = {
  title: 'player1',
  displayName: 'Player 1', // refers to name you want to display on screen to user
  total: 0, // total number from die rolls
  character: null, // this value must match up to the css class that displays the character image
  coal: false,
  winner: false
};


const computer = {
  title: 'computer',
  displayName: 'Computer',
  total: 0,
  character: null,
  coal: false,
  winner: false
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
  { position: 16 },
  { position: 56 },
  { position: 82 },
  { position: 2 }
];


// coals array
const coals = [
  { position: 95 },
  { position: 13 },
  { position: 22 },
  { position: 73 }
];


// plays in game music
function playSound() {
  const audio = $('audio').get(0);
  $(audio).attr('src','./sounds/song.mp3');
  audio.play();
}


playSound();


$proceed.on('click', function(){
  $instructions.hide();
  $characterMenu.animate({
    opacity: 1
  }, 1000);
  $characterMenu.addClass('visible');
});



$characterButton.on('click', function(e){
  // assigns the character the player clicks on
  setPlayer1Property(e);
  // computer assigne character after player
  computersChoice(e);
  // game log text color depending on character
  characterLogColor();
  // loads gameboard
  loadGame();
});


function characterLogColor() {
  if (player1.character === 'santa') {
    $player1GameLog.addClass('red');
  } else{
    $player1GameLog.addClass('green');
  }

  if (computer.character === 'santa') {
    $computerGameLog.addClass('red');
  } else {
    $computerGameLog.addClass('green');
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
  $gameBoard.animate({
    opacity: 1
  }, 1000);
  $gameBoard.addClass('visible');
  $rollDieDiv.animate({
    opacity: 1
  }, 1000);
  $rollDieDiv.addClass('visible');
}



// have coal property on each object
// have if statement that checks if coal is true, if thats the case then dont process the turn and then change coal proerty to false;


// player and computer object gets passed as arguments for process turn which gives all other function sin process turn access to the player/computer objects properties under the reference name/variable of "player"
$die.on('click', ()=> {
  $die.prop('disabled', true );

  if (player1.present || computer.coal) {
    player1Turn = true;
    player1.present = false;
    computer.coal = false;
    setTimeout(function(){
      processTurn(player1);
    },250);

  } else if (computer.present || player1.coal) {
    player1Turn = true;
    computer.present = false;
    player1.coal = false;
    setTimeout(function(){
      processTurn(computer);
    },1500);
  } else {
    setTimeout(function(){
      player1Turn = false;
      processTurn(player1);
    },250);
    setTimeout(function(){
      player1Turn = true;
      processTurn(computer);
    },1500);
  }

  setTimeout(function(){
    $die.prop( 'disabled', false );
  },1500);
});


function processTurn(player) {
  if (!gameOver) {
    inactiveDie();
    rollDie(player);
    addPlayerTotal(player);
    placePlayer(player);
    addCoal(player);
    addPresent(player);
    checkForChimney(player);
    checkForCandyCane(player);
    gameStatus(player);
  }
}


function inactiveDie() {
  if (player1Turn === false) {
    // $die.hover(function(){
    //   $(this).css('width', '80px');
    //   $(this).css('height', '50px');
    //   $(this).css('cursor', 'wait');
    // });
    $die.css('opacity', '0.5');
    player1Turn = true;
  } else if (player1Turn === true){
    $die.hover(function(){
      $(this).css('width', '78px');
      $(this).css('height', '48px');
      $(this).css('cursor', 'pointer');
    });
    $die.css('opacity', '1');
    player1Turn = false;
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
  // removes class from previous square by grabbing element with class santa or elf and removing the class santa or elf from it
  $(`.${player.character}`).removeClass(player.character);
  // grabs the div with the data Id equal to player total from the gameBoard
  $playerSquare = $(`[data-id="${player.total}"]`);
  // adds the players character class to the correct div
  $playerSquare.addClass(`${player.character}`);
  if (player1.total === computer.total){
    $playerSquare.addClass('neutral-square');
  } else {
    $('.neutral-square').removeClass('neutral-square');
  }
}


function winnerNameColor(player) {
  if (player.character === 'santa') {
    $winnerName.addClass('red');
    $winnerDiv.css('border-color', 'red');
  } else {
    $winnerName.addClass('green');
    $winnerDiv.css('border-color', 'green');
  }
}


function gameStatus(player) {
  if (player.total === 100) {
    gameOver = true;
    $die.off('click');
    $player1GameLog.remove();
    $computerGameLog.remove();
    winnerNameColor(player);
    $winnerDiv.animate({
      opacity: 1
    }, 1500);
    $winnerDiv.addClass('visible');
    $winnerName.text(`${player.displayName} Wins!`);

  } else if (player.total > 100) {
    player.total -= dieRollNumber;
    const winningNumber = 100 - player.total;
    placePlayer(player);
    if (player === player1) {
      $player1GameLog.text(`${player.displayName} rolled a ${dieRollNumber} but needs a ${winningNumber} to win`);
    } else {
      $computerGameLog.text(`${player.displayName} rolled a ${dieRollNumber} but needs a ${winningNumber} to win`);
    }

  }
}

$playAgain.on('click', function(){
  location.reload();
});


// functions that Check the square type player lands on
function checkForChimney(player) {
  for (let i = 0; i < chimneys.length; i++) {
    if (chimneys[i].position === player.total) {
      player.total = chimneys[i].targetPosition;
      placePlayer(player);
      if (player.title === 'player1') {
        $player1GameLog.text(`${player.displayName} went down the chimney`);
      }
      if (player.title === 'computer' ) {
        $computerGameLog.text(`${player.displayName} went down the chimney`);
      }
    }
  }
}


function checkForCandyCane(player) {
  for (let i = 0; i < candyCanes.length; i++) {
    if (candyCanes[i].position === player.total) {
      player.total = candyCanes[i].targetPosition;
      placePlayer(player);
      if (player.title === 'player1') {
        $player1GameLog.text(`${player.displayName} went up the candy Cane`);
      }
      if (player.title === 'computer' )
        $computerGameLog.text(`${player.displayName} went up the candy Cane`);
    }
  }
}


function addPresent(player) {
  for (let i = 0; i < presents.length; i++) {
    if (presents[i].position === player.total) {
      player.present = true;
      if (player.title === 'player1') {
        $player1GameLog.text(`${player.displayName} landed on a present. Merry Christmas`);
      }
      if (player.title === 'computer') {
        $computerGameLog.text(`${player.displayName} landed on a present. Merry Christmas`);
      }
    }
  }
}


function addCoal(player) {
  for (let i = 0; i < coals.length; i++) {
    if (coals[i].position === player.total) {
      player.coal = true;
      if (player.title === 'player1') {
        $player1GameLog.text(`${player.displayName} has landed on a coal. Naughty naughty`);
      }
      if (player.title === 'computer' )
        $computerGameLog.text(`${player.displayName} has landed on a coal. Naughty naughty`);
    }
  }
}
