'use strict'

var Transports = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

	this.plane = game.add.sprite(game.world.width*7/8-90, game.world.centerY+100, 'plane');
	this.plane.scale.setTo(0.09, 0.09);
	this.plane.anchor.setTo(0.5, 0.5);
	
	// Plane can carry 2 units; 
	// No water and shelter;
	this.plane.storage = 2;
	this.plane.food = 0;
	// this.plane.water = 0;
	this.plane.medicine = 0;
	// this.plane.shelter = 0;

	this.truck = game.add.sprite(game.world.width*7/8-90, game.world.centerY+160, 'truck');
	this.truck.scale.setTo(0.08, 0.08);
	this.truck.anchor.setTo(0.5, 0.5);


	// Gray the truck;
	// var gray = game.add.filter('Gray');
	// this.truck.filters = [gray];
	
	// Convoy can carry 5 units;
	this.truck.storage = 5;
	this.truck.food = 0;
	this.truck.water = 0;
	this.truck.medicine = 0;
	this.truck.shelter = 0;
	
	this.porter = game.add.sprite(game.world.width*7/8-90, game.world.centerY+220, 'porter');
	this.porter.scale.setTo(0.15, 0.15);
	this.porter.anchor.setTo(0.5, 0.5);

	// Porters can carry 5 units;
	this.porter.storage = 5;
	this.porter.food = 0;
	this.porter.water = 0;
	this.porter.medicine = 0;
	this.porter.shelter = 0;
	this.porter.population = 1000;

	// Convoy takes 20 seconds, plane 5 seconds, porters 30 seconds to the camp;
	this.sendPlane = function () {
		// Tween the plane;
		var tween = game.add.tween(this.plane).to({x: [game.world.width/2, game.world.width/8], y: [game.world.centerY-50, game.world.centerY+70]}, 5000, Phaser.Easing.Quadratic.InOut, true, 0);
		tween.onComplete.add(this.PlaneOnComplete, this);
	};

	this.sendConvoy = function () {
		// Tween the truck;
		var tween = game.add.tween(this.truck);
		tween.to({x: game.world.width/8}, 20000, 'Linear', true, 0);
		tween.onComplete.add(this.ConvoyOnComplete, this);
	};

	this.sendPorters = function () {
		// Tween the porters; 30 seconds
		var tween = game.add.tween(this.porter).to({x: game.world.width/8}, 3000, 'Linear', true, 0);
		tween.onComplete.add(this.PortersOnComplete, this);
	};

	this.PlaneOnComplete = function () {
		console.log('Plane Arrived');

		// (-_-;) complicated
		game.state.states.play.camp.food += this.plane.food;
		// game.state.states.play.camp.water += this.plane.water;
		game.state.states.play.camp.medicine += this.plane.medicine;
		// game.state.states.play.camp.shelter += this.plane.shelter;

		console.log(game.state.states.play.camp.food);
		
	};

	this.ConvoyOnComplete = function () {
		console.log('Convoy Arrived');
		game.state.states.play.camp.food += this.truck.food;
		game.state.states.play.camp.water += this.truck.water;
		game.state.states.play.camp.medicine += this.truck.medicine;
		game.state.states.play.camp.shelter += this.truck.shelter;

	};

	this.PortersOnComplete = function () {
		console.log('Porters Arrived');
		game.state.states.play.camp.food += this.porter.food;
		game.state.states.play.camp.water += this.porter.water;
		game.state.states.play.camp.medicine += this.porter.medicine;
		game.state.states.play.camp.shelter += this.porter.shelter;
		game.state.states.play.camp.population += this.porter.population;

		console.log(game.state.states.play.camp.population);

	};

};


Transports.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Transports;

/**
* This turns your displayObjects to grayscale.
* @class Gray
* @contructor
*/
Phaser.Filter.Gray = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.gray = { type: '1f', value: 1.0 };

    this.fragmentSrc = [

        "precision mediump float;",

        "varying vec2       vTextureCoord;",
        "varying vec4       vColor;",
        "uniform sampler2D  uSampler;",
        "uniform float      gray;",

        "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b), gray);",
        "}"
    ];

};

Phaser.Filter.Gray.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Gray.prototype.constructor = Phaser.Filter.Gray;

/**
* The strength of the gray. 1 will make the object black and white, 0 will make the object its normal color
* @property gray
*/
Object.defineProperty(Phaser.Filter.Gray.prototype, 'gray', {

    get: function() {
        return this.uniforms.gray.value;
    },

    set: function(value) {
        this.uniforms.gray.value = value;
    }

});