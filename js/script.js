// $(() => {
//
// });



// let player1Score = 3;
// const $el = $(`[data-id="${player1Score}"]`);
// $el.addClass('player1');
// .hasClass('snake') => return true or false

// 1) * MENU SCREEN
// div containg h1 asking "how many players"
// also contains 2 buttons with one player and two player option
// sound icon when clicked disables music / sound effects


// 2) * GAME BOARD
// after user clicks on button to make selection, menu screen div = display: none and gameboard is displayed
// gameboard is made up of 100 squares
// have gameover variable which indiciateds wether game is over or not
// have a button to click that rolls the dice and stores the result in a variable
// have player1go variable which will move P1 when dice rolled
// have player2go variable which will move P1 when dice rolled

// have 2 playerscore variables that keep track of players accumilated total number from all the die they have rolled.

// move the players to the sqaure that corresponds to their playersscore for example if their playerscore is 30, they will be on square 30, if they land on a snake that boosts them down to the 20th sqaure, their player score will have 10 minused from it.

//  create grid with 100 squares each square is a div

// depending on sqaure type player lands on, playerscore is increased to a certain number or decreased and player will be moved to the sqaure their playerscore is equal to.

// * SQUARE TYPES
// 1 - snake: move player down to below square
// 2 - ladder: move player up to above square
// 3 - thin ice - make player miss a go
// 4 - make player have another go
// 5 - make player move back a few squares
// 6 - make player move forward a few squares

// loop over each square and give it a number value and if its a special sqaure type, add a function that takes away or adds a number from the playerscore which will somehow make the character move to the sqaure that is equal to their playerscore.

// * QUESTIONS:

// how to assign a number value to each square?
// id or data id and turn it into a number

// how would i make it so that characters move to the numbered sqaure that corresponds to their playersscore? either classes to each sqaure or animating using ccs animate or offsetleft and offsettop

// make the gameboard an object
// make p1 and p2 objects with playertotal/score property

// z index

//
// how would i make ladders and snakes images inside the grid?

// player 1 object
