var Brickbreaker = Brickbreaker || {};

//loading the game assets

Brickbreaker.Preload = function() {};

Brickbreaker.Preload.prototype = {

    preload: function() {

        //show loading screen

        /*this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        
        this.preloadBar.anchor.setTo(0.5);
        
        this.preloadBar.scale.setTo(3);
        
        this.load.setPreloadSprite(this.preloadBar);*/

        this.load.image('player', 'assets/images/player.png');

        this.load.image('greenBrick', 'assets/images/greenBrick.png');

        this.load.image('blueBrick', 'assets/images/blueBrick.png');

        this.load.image('redBrick', 'assets/images/redBrick.png');

        this.load.image('mainMenuLogo', 'assets/images/mainMenuLogo.png');

        this.load.image('backGround', 'assets/images/backGround.png');

        this.load.image('ball', 'assets/images/ball.png');

        this.game.load.image('space', 'assets/images/space.png');
        this.game.load.image('player', 'assets/images/player.png');
        this.game.load.image('particle', 'assets/images/particle.png');
        this.game.load.image('blueParticle', 'assets/images/blueParticle.png');
        this.game.load.image('redParticle', 'assets/images/redParticle.png');
        this.game.load.image('pinkBrick', 'assets/images/pinkBrick.png');
        this.game.load.image('pinkParticle', 'assets/images/pinkParticle.png');
        this.game.load.image('greenParticle', 'assets/images/greenParticle.png');



    },

    create: function() {

        this.state.start('Menu');



    }

};