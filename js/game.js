// Author: Sancho
// Create new Phaser game, the element '' is a DOM ID, the game can be inserted the DOM element with this ID.
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

// Phaser will automatically look for this function when it starts and load anything defined within it.
function preload() {
	game.load.image('airdrop', 'assets/img/airdrop.png');
	game.load.image('background', 'assets/img/background.jpg');
	game.load.image('camp', 'assets/img/camp.png');
	game.load.image('convoy', 'assets/img/convoy.png');
	game.load.image('food', 'assets/img/food.png');
	game.load.image('porter', 'assets/img/porter.png');
	game.load.image('shelter', 'assets/img/shelter.png');
	game.load.image('warehouse', 'assets/img/warehouse.gif');
};

function create() {
	game.stage.backgroundColor = "#FFF";
	game.add.image(0, 0, 'background');
	var warehouse = game.add.image(game.world.width*7/8, game.world.centerY, 'warehouse');
	var camp = game.add.image(game.world.width/8, game.world.centerY, 'camp');
	warehouse.anchor.setTo(0.5, 0.5);
	warehouse.scale.setTo(0.8, 0.8);
	camp.anchor.setTo(0.5, 0.5);
	camp.scale.setTo(0.2, 0.2);
};

function update() {
	
};