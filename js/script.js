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


let $rollDieButton = $('.rollDie');


// create function that rolls die
// if player1Turn add result to player1total
// else do same but for player2

$rollDieButton.on('click', ()=> {
  dieRollNumber = Math.floor(Math.random() * 6) + 1;
  addPlayerTotal();
  placePlayer1();
  checkSquareType();
  gameStatus();
  console.log(dieRollNumber);
  console.log(player1Total);
});

addPlayerTotal =()=> {
  if (player1Turn) {
    return player1Total += dieRollNumber;
  }
  else {
    return player2Total += dieRollNumber;
  }
};

// place player1 on board
placePlayer1 =()=> {
  $('.player1').removeClass('player1');
  $player1Square = $(`[data-id="${player1Total}"]`);
  $player1Square.addClass('player1');
}



gameStatus =()=> {
  if (player1Total >= 100) {
    gameOver = true;
    alert("player1 Wins!");
  }
}


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
 },
];

// candycanes array

const candycanes = [
 {

 }
]

// presents array



// coals array


// check sqaure type and change playertotal accordingly
// call this in roll div
// checkSquareType =()=> {
//   // placePlayer1($player1Square);
//    $square9 = $(`[data-id="9"]`);
//   $square9Target = $(`[data-id="31"]`);
//   console.log($square9);
//   console.log($player1Square);
//   $square9Attr = $square9Target.attr('data-id');
//   $square
//   if (player1Total === $square9) {
//     console.log('in if statement');
//     $square9Target.addClass('player1');
//   }
//   snakes[3].position  = player1total
// }





// create an array for snakes, ladders, etc and have each snake be its own object with position property which is a number and a target property which is also a number

// inside checksquaretype check against all snake number positions using a for loop use if (snakes[i].position === player1total) {
//   player1total + snakes[i].target;
// }

//

// check if player 1
