var Brickbreaker = Brickbreaker || {};

Brickbreaker.Game = function() {};

Brickbreaker.Game.prototype = {



    preload: function() {

        this.game.time.advancedTiming = true;



        /*this.game.load.image('space', 'assets/images/space.png');
        this.game.load.image('player', 'assets/images/player.png');
        this.game.load.image('particle', 'assets/images/particle.png');
        this.game.load.image('blueParticle', 'assets/images/blueParticle.png');
        this.game.load.image('redParticle', 'assets/images/redParticle.png');
        this.game.load.image('pinkBrick', 'assets/images/pinkBrick.png');
        this.game.load.image('pinkParticle', 'assets/images/pinkParticle.png');
        this.game.load.image('greenParticle', 'assets/images/greenParticle.png');*/



    },



    create: function() {



        this.game.physics.arcade.checkCollision.down = false;


        //background sprite

        this.game.stage.background = 'space';

        this.space = this.game.add.sprite(0.5, 0.5, 'space');


        this.player = this.game.add.sprite(this.game.world.centerX, 375, 'player');

        this.game.physics.arcade.enable(this.player);
        this.player.body.immovable = true;
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5, 0.5);


        // Create Ball

        this.ball = this.game.add.sprite(this.game.world.centerX, this.player.y - 16, 'ball');
        this.ball.anchor.set(0.5);
        this.game.physics.arcade.enable(this.ball);
        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;
        this.ballOnPlayer = true;


        this.bricks = this.game.add.group();
        //blueBrick Test
        this.blueBricks = this.game.add.group();
        this.blueBricks.enableBody = true;

        for (var i = 1; i < 7; i++) {
            this.blueBrick = this.blueBricks.create(i * 90, 60, 'blueBrick');

            this.blueBrick.body.gravity.y = 0;
            this.blueBrick.body.immovable = true;
        }


        //redBrick test


        this.redBricks = this.game.add.group();
        this.redBricks.enableBody = true;

        for (var i = 1; i < 7; i++) {
            this.redBrick = this.redBricks.create(i * 90, 25, 'redBrick');

            this.redBrick.body.gravity.y = 0;
            this.redBrick.body.immovable = true;
        }

        //third layer of brick

        this.thirdLayer = this.game.add.group();
        this.thirdLayer.enableBody = true;

        for (var i = 1; i < 7; i++) {
            this.thirdLayerBrick = this.thirdLayer.create(i * 90, 95, 'pinkBrick');

            this.thirdLayerBrick.body.gravity.y = 0;
            this.thirdLayerBrick.body.immovable = true;
        }

        //fourth layer of bricks

        this.fourthLayer = this.game.add.group();
        this.fourthLayer.enableBody = true;

        for (var i = 1; i < 7; i++) {
            this.fourthLayerBrick = this.fourthLayer.create(i * 90, 130, 'greenBrick');

            this.fourthLayerBrick.body.gravity.y = 0;
            this.fourthLayerBrick.body.immovable = true;
        }



        //allow keyboard movement
        // this.cursors = this.game.input.keyboard.createCursorKeys();

        //score text and tweens
        this.scoreText = this.game.add.text(16, 325, 'Score: 0', {
            fontSize: '32px',
            fill: 'white'
        });
        this.scoreTextTween = this.add.tween(this.scoreText.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);

        this.score = 0;
        this.scoreBuffer = 0;
        this.highScore = 0;
        this.highScoreText = this.game.add.text(150, 150, 'HIGHSCORE: ' + localStorage.getItem("highscore"), {
            fontSize: '32px',
            fill: 'white'
        });



        this.scoreTween = this.game.add.tween(this.scoreText).to({
            y: 315
        }, 50, Phaser.Easing.Quintic.InOut).to({
            y: 335
        }, 50, Phaser.Easing.Quintic.InOut);

        //animated score test

        /*var seed = Date.now();
this.random = new Phaser.RandomDataGenerator([seed]);
 
this.game.input.onUp.add(function(pointer){
 
    var newScore = this.random.integerInRange(1, 30);
    this.createScoreAnimation(pointer.x, pointer.y, '+'+newScore, newScore);
 
}, this);*/

        //bricks movement tween
        this.fourthLayerBrickTween = this.game.add.tween(this.fourthLayer).to({
            x: 125
        }, 1000, Phaser.Easing.Linear.In).to({
            x: 15
        }, 1000, Phaser.Easing.Linear.In);
        this.thirdLayerBrickTween = this.game.add.tween(this.thirdLayer).to({
            x: 125
        }, 3000, Phaser.Easing.Linear.In).to({
            x: 15
        }, 3000, Phaser.Easing.Linear.In);
        this.redBricksTween = this.game.add.tween(this.redBricks).to({
            x: 125
        }, 1000, Phaser.Easing.Linear.In).to({
            x: 15
        }, 1000, Phaser.Easing.Linear.In);
        this.blueBricksTween = this.game.add.tween(this.blueBricks).to({
            x: 125
        }, 3000, Phaser.Easing.Linear.In).to({
            x: 15
        }, 3000, Phaser.Easing.Linear.In);



        // lives variable
        this.lives = 3;
        this.livesText = this.game.add.text(600, 325, 'Lives: 3', {
            fontSize: '32px',
            fill: 'white'
        });



        //particle emitters
        this.emitter = this.game.add.emitter(0, 0, 100);
        this.emitter.makeParticles('particle');
        this.emitter.gravity = 200;

        this.emitterBlue = this.game.add.emitter(0, 0, 100);
        this.emitterBlue.makeParticles('blueParticle');
        this.emitterBlue.gravity = 200;

        this.emitterRed = this.game.add.emitter(0, 0, 100);
        this.emitterRed.makeParticles('redParticle');
        this.emitterRed.gravity = 200;

        this.emitterPink = this.game.add.emitter(0, 0, 100);
        this.emitterPink.makeParticles('pinkParticle');
        this.emitterPink.gravity = 200;

        this.emitterGreen = this.game.add.emitter(0, 0, 100);
        this.emitterGreen.makeParticles('greenParticle');
        this.emitterGreen.gravity = 200;


        //highscore local storage
        if (localStorage.getItem("highscore") === null) {
            this.highScoreText.content = 'HIGHSCORE: ' + localStorage.getItem("highscore");
            //...
        } else {
            // no previous high score to display, so display nothing
            this.highScoreText.content = 'HIGHSCORE: ';
        }

        //this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.game.input.onDown.add(this.releaseBall, this);



    },

    update: function() {

        this.game.physics.arcade.collide(this.ball, this.player, this.ballHitPaddle, null, this);
        this.game.physics.arcade.collide(this.ball, this.player, this.particleBurst, null, this);
        this.game.physics.arcade.collide(this.ball, this.redBricks, this.killBrickR, null, this);
        this.game.physics.arcade.collide(this.ball, this.blueBricks, this.killBrickB, null, this);
        this.game.physics.arcade.collide(this.ball, this.thirdLayer, this.killThirdLayer, null, this);
        this.game.physics.arcade.collide(this.ball, this.fourthLayer, this.killFourthLayer, null, this);

        //player movement



        this.player.x = this.game.input.x;

        if (this.player.x < 24) {
            this.player.x = 24;
        } else if (this.player.x > this.game.width - 24) {
            this.player.x = this.game.width - 24;
        }

        if (this.ballOnPaddle) {
            this.ball.body.x = this.player.x;
        }



        //restart test

        if (this.ball.y >= this.game.world.height) {

            this.ballLost();
        }



        //brick respawn

        if (this.blueBricks.countLiving() === 0 && this.redBricks.countLiving() === 0 && this.thirdLayer.countLiving() === 0 && this.fourthLayer.countLiving() === 0) {


            this.brickReset();

        }

        //difficulty change
        /*if(this.score > 230) {
            
            //this.changeDifficulty();
            this.brickReset();

        }*/



        //ball placement at beginning of game
        if (this.ballOnPlayer) {
            this.ball.body.x = this.player.x;
        }

        //animated score test
        if (this.scoreBuffer > 0) {
            //this.incrementScore();
            this.scoreBuffer--;
        }



    },

    //score animation test
    /*createScoreAnimation: function(x, y, messsage, score) {
        console.log("create score anim");
      
        this.scoreFont = "16px Arial";
        
        this.scoreAnimation = this.game.add.text(x, y, '+10', {font: this.scoreFont, fill: "white",  stroke: "#ffffff", strokeThickness: 1});
        this.scoreAnimation.anchor.setTo(0.5, 0);
        this.scoreAnimation.angle +=10;
        this.scoreAnimation.align = 'center';
        
        this.scoreTween2 = this.game.add.tween(this.scoreAnimation).to({x: 50, y: 325}, 400, Phaser.Easing.Exponential.In, true);
        
        this.scoreTween2.onComplete.add(function() {
            this.scoreAnimation.destroy();
            this.scoreTween.start();
            this.scoreBuffer += this.score;
        }, this);
    },*/

    releaseBall: function(ball) {
        console.log("release ball");
        if (this.ballOnPlayer) {
            this.ball.body.velocity.y = -250;
            this.ball.body.velocity.x = -150;
            this.ballOnPlayer = false;

        }

    },


    changeDifficulty: function() {
        //this.ball.body.velocity.x = 300;
        //this.ball.body.velocity.y = 200;
        //this.blueBricks.body.velocity.x = 100;
        this.redBricksTween.start();
        this.fourthLayerBrickTween.start();
        this.thirdLayerBrickTween.start();
        this.blueBricksTween.start();
        // this.level2 = this.game.add.text(300, 300, 'LEVEL 2!!!!', {fontSize: '32px', fill: 'white'});

    },

    killBrickB: function(ball, blueBricks) {

        blueBricks.kill();
        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
        this.scoreTween.start();
        this.scoreTextTween.start();

        this.emitterBlue.x = this.ball.x;
        this.emitterBlue.y = this.ball.y;
        this.emitterBlue.start(true, 2000, null, 10)



    },

    killBrickR: function(ball, redBricks) {

        redBricks.kill();
        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
        this.scoreTween.start();
        this.scoreTextTween.start();

        this.emitterRed.x = this.ball.x;
        this.emitterRed.y = this.ball.y;
        this.emitterRed.start(true, 2000, null, 10)



    },


    killThirdLayer: function(ball, pinkBricks) {

        pinkBricks.kill();
        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
        this.scoreTween.start();
        this.scoreTextTween.start();

        this.emitterPink.x = this.ball.x;
        this.emitterPink.y = this.ball.y;
        this.emitterPink.start(true, 2000, null, 10)
    },

    killFourthLayer: function(ball, greenBricks) {
        console.log("fourth layer working");
        greenBricks.kill();
        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
        this.scoreTween.start();
        this.scoreTextTween.start();

        this.emitterGreen.x = this.ball.x;
        this.emitterGreen.y = this.ball.y;
        this.emitterGreen.start(true, 2000, null, 10)
    },

    brickReset: function() {

        this.ballOnPlayer = true;
        this.ball.body.velocity.set(0);
        this.ball.x = this.player.x + 16;
        this.ball.y = this.player.y - 16;
        //this.ball.reset(this.game.world.centerX, this.player.y - 16);
        //this.ballOnPlayer = true;

        this.ball.reset(this.player.body.x + 16, this.player.y - 16);

        this.player.reset(this.game.world.centerX, 375);

        this.redBricks.callAll('revive');
        this.blueBricks.callAll('revive');
        this.fourthLayer.callAll('revive');
        this.thirdLayer.callAll('revive');


    },


    particleBurst: function(pointer) {

        this.emitter.x = pointer.x;
        this.emitter.y = pointer.y;
        this.emitter.start(true, 2000, null, 10)
    },



    ballLost: function() {
        this.lives--;
        this.livesText.text = 'Lives: ' + this.lives;

        if (this.lives === 0) {

            this.ball.kill();

            this.game.state.start('GameOver');

            if (this.score > localStorage.getItem("highscore")) {
                localStorage.setItem("highscore", this.score);
            }
            this.highScoreText.content = 'HIGHSCORE: ' + localStorage.getItem("highscore");

            //this.gameOver();

        } else {

            this.ball.reset(this.game.world.centerX, this.player.y - 16);
            this.ballOnPlayer = true;

            this.ball.reset(this.player.body.x + 16, this.player.y - 16);

            this.player.reset(this.game.world.centerX, 375);
        }

    },

    ballHitPaddle: function(ball, player) {

        console.log("working");

        var diff = 0;

        if (ball.body.x < player.body.x) {
            //  Ball is on the left-hand side of the paddle
            diff = player.x - ball.x;
            ball.body.velocity.x = (-10 * diff);
        } else if (ball.body.x > player.body.x) {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x - player.x;
            ball.body.velocity.x = (10 * diff);
        } else {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.body.velocity.x = 2 + Math.random() * 8;
        }

    },



    render: function()

    {

        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
        // this.game.debug.body(this.player);
        // this.game.debug.body(this.greenBrick);
        // this.game.debug.body(this.blueBrick);
        // this.game.debug.body(this.redBrick);
        // this.game.debug.body(this.ball);
        //this.game.debug.spriteInfo(this.player, 32, 32);
        // this.game.debug.spriteInfo(this.ball, 32, 32);



    }

};