let player1Total = 0;
let player2Total = 0;
let computerTotal = 0;
let computerTurn = false;
let player1Turn = true; // dont forget to change this
let player2Turn = null;
let gameOver = false;
let dieRollNumber = null;
let $square9Target;
let $player1Square;
let $square9;

// all elements grabbed from DOM
let $rollDieButton = $('.rollDie');


// create function that rolls die
// if player1Turn add result to player1total
// else do same but for player2

function rollDie() {
  dieRollNumber = Math.floor(Math.random() * 6) + 1;
}



$rollDieButton.on('click', ()=> {
  rollDie();
  addPlayerTotal();
  placePlayer1();
  checkForChimneys();
  gameStatus();
  console.log(dieRollNumber);
  console.log(player1Total);
});

function addPlayerTotal() {
  if (player1Turn) {
    return player1Total += dieRollNumber;
  } else {
    return player2Total += dieRollNumber;
  }
};

// place player1 on board
function placePlayer1() {
  $('.player1').removeClass('player1');
  $player1Square = $(`[data-id="${player1Total}"]`);
  $player1Square.addClass('player1');
}



function gameStatus() {
  if (player1Total >= 100) {
    gameOver = true;
    alert("player1 Wins!");
  }
}

// create an array for chimneys, candycanes, etc and have each snake be its own object with position property which is a number and a target property which is also a number

// chimneys array

const chimneys = [
  {
    position: 16,
    targetPosition: 6
  },
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
    targetPosition: 88
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
  },
]

// presents array

const presents = [
  { position: 12 },
  { position: 56 },
  { position: 82 }
]

// coals array

const coals = [
  { position: 95 },
  { position: 13 },
  { position: 22 }
]


// check sqaure type and change playertotal accordingly
// call this in roll div

// inside checksquaretype check against all snake number positions using a for loop use if (snakes[i].position === player1total) {
//   player1total + snakes[i].target;
// }

//

// check if player 1


function checkForChimneys() {
  for (let i = 0; i < chimneys.length; i++) {
    if (chimneys[i].position === player1Total) {
      player1Total = chimneys[i].targetPosition;
      placePlayer1()
      console.log('went down the chimney');
    }
  }
}


function checkForCandyCanes() {
  for (let i = 0; i < candyCanes.length; i++) {
    if (candyCanes[i].position === player1Total) {
      player1Total = candyCanes[i].targetPosition;
      placePlayer1()
      console.log('went up the candy cane');
    }
  }
}
function checkForPresents() {

}
function checkForCoals() {

}
