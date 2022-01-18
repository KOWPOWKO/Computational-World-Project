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
        this.hero = new Hero(this.game,0,0)
        
    }

}