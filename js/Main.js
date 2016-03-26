var Brickbreaker = Brickbreaker || {};

Brickbreaker.game = new Phaser.Game(746, 420, Phaser.AUTO, '');

Brickbreaker.game.state.add('Boot', Brickbreaker.Boot);

Brickbreaker.game.state.add('Preload', Brickbreaker.Preload);

Brickbreaker.game.state.add('Menu', Brickbreaker.Menu);

Brickbreaker.game.state.add('Game', Brickbreaker.Game);

Brickbreaker.game.state.add('GameOver', Brickbreaker.GameOver);

Brickbreaker.game.state.start('Boot');