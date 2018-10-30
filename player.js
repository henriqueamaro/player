var game = new Phaser.Game(1400, 800,Phaser.AUTO, '',
{
	preload: preload,
	create: create,
	update: update
});
//criando uma variavel 
var player;
var platforms;

//carrega os arquivos do jogo
function preload(){
	
	game.load.image('fundo', 'assets/fundo.png');
	game.load.image('ground', 'assets/platforms.png');
	game.load.spritesheet('jogador', 'assets/dude.png', 32, 48);
}

function create() {
		
	game.physics.startSystem(Phaser.Physics.ARCADE);		
    game.add.sprite(0, 0, 'fundo');

	
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
		
	
	player = game.add.sprite(32, game.world.height - 150, 'jogador');
    
	game.physics.arcade.enable(player);
    
	player.body.bounce.y = 0.1;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;
	
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	cursors = game.input.keyboard.createCursorKeys();
	
}

function update(){
	  
	  var hitPlatform = game.physics.arcade.collide
	(player, platforms);
	
	    player.body.velocity.x = 0;
	
    if (cursors.left.isDown){		
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown){		
        player.body.velocity.x = 150;
        player.animations.play('right');
	}
    else{
        player.animations.stop();
        player.frame = 4;
}
	
    	if (cursors.up.isDown 
		&& 
		player.body.touching.down 
		&& 
		hitPlatform)
		{
			player.body.velocity.y = -350;
		}
	
}

