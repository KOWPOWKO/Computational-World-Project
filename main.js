var gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./resources/defender.png");
ASSET_MANAGER.queueDownload("./resources/sun.PNG");
ASSET_MANAGER.queueDownload("./resources/bird.PNG");
ASSET_MANAGER.downloadAll(function() {


	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
    gameEngine.init(ctx);
    //gameEngine.addEntity(new Hero(gameEngine,0,0,"./resources/defender.png"));
     //gameEngine.addEntity(new Bird(gameEngine,0,0,"./resources/bird.PNG"));
    // this.hero = new Hero();
    // hero.draw(ctx);
    gameEngine.init(ctx);

    new SceneManager(gameEngine);
    gameEngine.start();
});