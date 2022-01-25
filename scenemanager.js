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