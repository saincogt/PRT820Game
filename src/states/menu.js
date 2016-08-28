'use strict'

var menuState = function (game) {
	// console.log("Now the 'menu' state starts!");
};

menuState.prototype = {
	preload: function () {
		'use strict';
		this.load.image('background', 'src/assets/img/background.jpg');
		this.load.image('title', 'src/assets/img/title1.png');
		this.load.image('play', 'src/assets/img/playMenu.png');
		this.load.image('score', 'src/assets/img/scoreMenu.png');
		this.load.bitmapFont('lastmileFont', 'src/assets/font/font.png', 'src/assets/font/font.fnt');
	},
	create: function () {
		'use strict';
		var background = this.game.add.image(0, 0, 'background');

		var title = this.game.add.sprite(this.world.centerX, this.world.centerY/2-20, 'title');
		title.anchor.setTo(0.5, 0.5);
		var tween = this.add.tween(title);
		tween.to({y: this.world.width/5+25}, 800, Phaser.Easing.Bounce.Out, true, 500);

		var startButton = this.game.add.button(this.world.centerX, 300, 'play', this.startPlay, this);
		startButton.anchor.setTo(0.5, 0.5);

		var scoreButton = this.game.add.button(this.world.centerX, 360, 'score', this.checkScore, this);
		scoreButton.anchor.setTo(0.5, 0.5);
		var authorText = this.add.bitmapText(this.world.centerX, 500, 'lastmileFont', 'Developed by Sancho', 20);
		authorText.anchor.setTo(0.5, 0.5);

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
	},
	startPlay: function () {
		'use strict';
		this.game.state.start('play');
	},
	checkScore: function () {
		'use strict';

		// this.game.state.start('score');
	},
	render: function () {
		'use strict';

		// game.debug.game();
	}
};
module.exports = menuState;

