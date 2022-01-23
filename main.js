var gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./resources/defender.png");
ASSET_MANAGER.queueDownload("./resources/boss.png");
ASSET_MANAGER.queueDownload("./resources/coin.png");
ASSET_MANAGER.queueDownload("./resources/enemies.png");
ASSET_MANAGER.queueDownload("./resources/bird.png");

ASSET_MANAGER.downloadAll(function() {


	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
    gameEngine.init(ctx);
    gameEngine.addEntity(new Hero(gameEngine,0,0,"./resources/defender.png"));
    gameEngine.addEntity(new DragonBoss(gameEngine,0,0,"./resources/boss.png"));
    gameEngine.addEntity(new Coin(gameEngine,0,0,"./resources/coin.png"));
    gameEngine.addEntity(new BirdBrown(gameEngine,0,0,"./resources/bird.png"));
    gameEngine.addEntity(new SmallFireBall(gameEngine,0,0,"./resources/boss.png"));
    gameEngine.addEntity(new FireBall(gameEngine,0,0,"./resources/boss.png"));
    gameEngine.addEntity(new Mage(gameEngine,0,0,"./resources/enemies.png"));
    gameEngine.addEntity(new Snake(gameEngine,0,0,"./resources/enemies.png"));
    // this.hero = new Hero();
    // hero.draw(ctx);
    gameEngine.start();
});