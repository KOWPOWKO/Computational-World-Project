class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.loadWorld();
    };
    clearEntities() {
        this.game.entities = [this];
    };
    loadWorld() {
        this.game.addEntity(new Sun(this.game,0,0));
        this.game.addEntity(new Hero(this.game,0,0));

    }
 
}

class Fire {
	constructor(game){
		this.game = game;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./resources/fire.png"), 0, 0, 22.2, 12, 6, 1.5);
	};

	update(){

	};
	
	draw(ctx){
		this.animator.drawFrame(this.game.clockTick, ctx, 0,   400);

	};
};