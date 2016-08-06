var bootState = function (game) {
	console.log("Now the 'boot' state starts!");
}

bootState.prototype = {
	preload: function () {
		
		this.load.image('background', 'assets/img/background.jpg');
		this.load.image('title', 'assets/img/title1.png');
		this.load.image('play', 'assets/img/playMenu.png');
		this.load.image('score', 'assets/img/scoreMenu.png');
		this.load.bitmapFont('lastmileFont', 'assets/img/font.png', 'assets/img/font.fnt');
	},
	create: function () {

		var background = this.game.add.image(0, 0, 'background');

		var title = game.add.sprite(this.world.centerX, this.world.centerY/2, 'title');
		title.anchor.setTo(0.5, 0.5);

		// Tried to add tween to the title
		// this.titleGroup = this.game.add.group();
		// this.titleGroup.add(this.title);

		// this.titleGroup.x = 10;
		// this.titleGroup.y = 100;
		// this.title.x = 10;
		// this.title.y = 10;
		// this.game.add.tween(this.title).to({y:this.world.centerY/2}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

		// var loadingLabel = game.add.text(300, 260, 'Loading...', {font: '30px Courier', fill: '#000'});
		

		var startButton = this.game.add.button(this.world.centerX, 300, 'play', this.startPlay, this);
		startButton.scale.setTo(0.8, 0.8);
		startButton.anchor.setTo(0.5, 0.5);

		var scoreButton = this.game.add.button(this.world.centerX, 360, 'score', this.checkScore, this);
		scoreButton.scale.setTo(0.8, 0.8);
		scoreButton.anchor.setTo(0.5, 0.5);
		var authorText = this.add.bitmapText(this.world.centerX, 450, 'lastmileFont', 'Developer: Sancho', 30);
		authorText.anchor.setTo(0.5, 0.5);

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
	},
	startPlay: function () {
		this.game.state.start('play');
	},
	checkScore: function () {
		// this.game.state.start('score');
	},
	render: function () {
		// game.debug.game();
	}
};