var Brickbreaker = Brickbreaker || {};


Brickbreaker.Menu = function(){};

Brickbreaker.Menu.prototype = {
    
    
    preload: function() {
        
        
    },
    
    create: function() {
        
            var scope = {
   // version: require('./data/version.json.js'),
    setup: {
        ballSize: 15,
        initSpeed: 4,
        palletSpeed: 4,
        speed: {
            x: 250,
            y: 150
        },
        outBorder: 10,
        offset: 15,
        palletSize: {
            width: 80,
            height: 10
        }
    },
    options: {
        width: 700,
        height: 500
    },
    /*settings: {
        score: 0,
        muted: false
    },*/
    };
        this.game.stage.background = 'backGround';
        
        this.backGround = this.game.add.sprite(0.5, 0.5, 'backGround');
        
        this.backGround.scale.setTo(1.5, 1.5);

        
     

        
        this.mainMenuLogo = this.game.add.sprite(100, this.game.centerY, 'mainMenuLogo');
        
        this.game.physics.arcade.enable(this.mainMenuLogo);
        this.mainMenuLogo.body.velocity.x = 100;
        this.mainMenuLogo.body.velocity.y = 100;
        this.mainMenuLogo.body.collideWorldBounds = true;
        this.mainMenuLogo.body.bounce.setTo(1);
        this.mainMenuLogo.body.immovable = true;
        
        var enter = this.game.add.text(305, 350, 'START', {fontSize: '32px', fill: 'white'});
        
        this.game.add.tween(this.mainMenuLogo).to({
                    y:50
        }, 1000, Phaser.Easing.Bounce.Out)
        .delay(250)
        .start();
        
        //this.mainMenuLogoTween = this.add.tween(this.mainMenuLogo.scale).to({ x: 1, y: 1.5}, 350, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 350, Phaser.Easing.Linear.In).delay(800).start().loop(true);
        

        
      this.ballGr = this.game.add.graphics(0, 0);
        this.colors = [0xFF00FF, 0x000FFF, 0xFFFFFF];

        
        this.ballGr.beginFill(this.colors[Math.floor(Math.random()*this.colors.length)]);
        this.ballGr.drawCircle(0, 0, scope.setup.ballSize);
        
        this.ball = scope.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this.ballGr.generateTexture());
        this.ball.anchor.set(0.5);
        //graphics.destory();
        this.game.physics.arcade.enable(this.ball);

        this.ball.body.velocity.x = 250;
        this.ball.body.velocity.y = 150;
        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;
        
       // this.onDown = null;
        
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        //this.state.start('Game');
       // this.game.input.onDown.add(this.startGame, null, this);
         
        
    },
    
    update: function(){
        
    
        if(this.enterKey.isDown) {
                    
            this.state.start('Game');
        }
       
    
},
    

    
};