// Author: Sancho
// Create new Phaser game, the element '' is a DOM ID, the game can be inserted the DOM element with this ID.
var game = new Phaser.Game(960, 720, Phaser.AUTO, 'last-mile');

// Added all the states. 'name' is the casual name of the state, they will be used when we call them.
// nameState is the official name, we will use them to define the states.

game.state.add('menu', menuState);
// game.state.add('load', loadState);
// game.state.add('menu', menuState);
game.state.add('play', playState);
// game.state.add('score', scoreState);

// After adding the states, we can start the first state

game.state.start('menu');

// Phaser will automatically look for this function when it starts and load anything defined within it.
function preload() {

};

function create() {

};

function update() {
	
};