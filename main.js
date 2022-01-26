var gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./resources/bird.png");
ASSET_MANAGER.queueDownload("./resources/boss.png");
ASSET_MANAGER.queueDownload("./resources/castle.png");
ASSET_MANAGER.queueDownload("./resources/castlefull.png");
ASSET_MANAGER.queueDownload("./resources/coin.png");
ASSET_MANAGER.queueDownload("./resources/defender.png");
ASSET_MANAGER.queueDownload("./resources/character2.png");
ASSET_MANAGER.queueDownload("./resources/monstor2.png");
ASSET_MANAGER.queueDownload("./resources/monstor2rev.png");
ASSET_MANAGER.queueDownload("./resources/enemies.png");
ASSET_MANAGER.queueDownload("./resources/ground.png");
ASSET_MANAGER.queueDownload("./resources/sun.png");
ASSET_MANAGER.queueDownload("./resources/background.jpg");
//ASSET_MANAGER.queueDownload("./resources/.png");
//ASSET_MANAGER.queueDownload("./resources/.png");
//ASSET_MANAGER.queueDownload("./resources/.png");


ASSET_MANAGER.downloadAll(function() {
    var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    gameEngine.init(ctx);

    /*
    ---IMPORTANT-----------------------------------------------------------------------
    PROTOTYPE Version 1.0

    Tony {
    *I really like the drawFrameY method in animator. I would like to see a 
    drawFrameYReverse in order to get the facing right for entities that use drawFrameY.

    *For adding new enemies, please use Enemie_Name_here(gameEngine,int x, int facing);

    *The facing integer must be either LEFT or RIGHT as defined by the constants above.

        -Every enemie should have it's individual ground level applied so you dont need to
         pass a y variable (see Mage class for example).

    *The canvas width and height is now: 1280 x 720

    NOTE: we don't need to pass spritesheets from main to entity because we already get the
    spritesheets within the class constructor using the asset manager.
    }
    ---IMPORTANT-----------------------------------------------------------------------


    gameEngine.addEntity(new Hero(gameEngine,0,0,"./resources/defender.png"));
    gameEngine.addEntity(new DragonBoss(gameEngine,0,0,"./resources/boss.png"));
    gameEngine.addEntity(new Coin(gameEngine,0,0,"./resources/coin.png"));
    
    gameEngine.addEntity(new SmallFireBall(gameEngine,0,0,"./resources/boss.png"));
    gameEngine.addEntity(new FireBall(gameEngine,0,0,"./resources/boss.png"));
    gameEngine.addEntity(new Mage(gameEngine,0,0,"./resources/enemies.png"));
    gameEngine.addEntity(new Snake(gameEngine,0,0,"./resources/enemies.png"));
    */
    
    
    gameEngine.init(ctx);
		
	new SceneManager(gameEngine);

	gameEngine.start();
});