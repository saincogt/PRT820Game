var overState = function (game) {
	// body...
};

var overObjects = overState.prototype.assets;
overState.prototype = {
	preload: function () {
		// for (var overProp in overObjects) {
		// 	if (overObjects.hasOwnProperty(overProp)) {
		// 		this.load.image(overProp, overObjects[overProp]);
		// 	}
		// }
		this.load.image('gameover', 'src/assets/img/gameover.png');
		this.load.image('background', 'src/assets/img/background.jpg');
		this.load.image('mainmenu', 'src/assets/img/mainmenu.png');
		this.load.image('playagain', 'src/assets/img/playagain.png');
	},

	create: function () {
		this.game.add.image(0, 0, 'background');
		// var gameOver = this.game.add.sprite(this.world.centerX, this.world.centerY, 'gameover').anchor.setTo(0.5, 0.5);
		// var tween = this.add.tween(gameOver);
		// tween.to({y: this.world.centerY+5}, 800, Phaser.Easing.Bounce.Out, true, 500);
		var gameOver = this.game.add.sprite(this.world.centerX, this.world.centerY-150, 'gameover');
		gameOver.anchor.setTo(0.5, 0.5);
		var tween = this.add.tween(gameOver);
		tween.to({y: this.world.centerY-50}, 800, Phaser.Easing.Bounce.Out, true, 500);

		this.add.button(this.world.centerX, this.world.centerY + 30, 'playagain', this.playAgain, this).anchor.setTo(0.5, 0.5);
		this.add.button(this.world.centerX, this.world.centerY + 80, 'mainmenu', this.mainMenu, this).anchor.setTo(0.5, 0.5);
		this.add.bitmapText(this.world.centerX, this.world.centerY + 130, 'lastmileFont', 'Your Score: ' + this.game.state.states.play.scores, 20).anchor.setTo(0.5, 0.5);

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
	},

	update: function () {
		// body...
	},

	render: function () {
		// body...
	},

	playAgain: function () {
		this.game.state.start('play');
	},

	mainMenu: function () {
		this.game.state.start('menu');
	}
};

overState.prototype.assets = {
	gameover: 'src/assets/img/gameover.png',
	mainmenu: 'src/assets/img/mainmenu.png',
	playagain: 'src/assets/img/playagain.png'
};

module.exports = overState;
