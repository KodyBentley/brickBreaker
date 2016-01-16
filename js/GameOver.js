var Brickbreaker = Brickbreaker || {};


Brickbreaker.GameOver = function(){};

Brickbreaker.GameOver.prototype = {



create: function() {
    
    this.game.stage.backgroundColor = 'black';
    
        
        this.text = this.game.add.text(350, 200, 'GAMEOVER!', {fontSize: '32px', fill: 'white'});
        this.game.physics.arcade.enable(this.text);

        this.text.anchor.setTo(0.5, 0.5);
                                
    
        var enter = this.game.add.text(350, 350, 'Press enter to try again.', {fontSize: '32px', fill: 'white'});
        this.game.physics.arcade.enable(enter);

        enter.anchor.setTo(0.5, 0.5);

        
       /* this.game.add.tween(this.text).to({
                    y:50
                    
        }, 1000, Phaser.Easing.Bounce.Out)
        .delay(250)
        .start();*/
    
    
    
         this.highScoreText = this.game.add.text(350, 150, 'HIGHSCORE: ' + localStorage.getItem("highscore"), {fontSize: '32px', fill: 'white'});
         this.game.physics.arcade.enable(this.highScoreText);

        this.highScoreText.anchor.setTo(0.5,0.5);

    
        this.text.alpha = 0.1;
    
        this.game.add.tween(this.text).to( { alpha: 1 }, 2000, "Linear", true);
    
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

   
    
    
},
    
update: function() {
    
    //this.text.angle += 1;
    
    if(this.enterKey.isDown) {
                    
            this.state.start('Game');
        }
    
    
}
};