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
        const LEFT = 0;
        const RIGHT = 1;

        //player
        
        //this.game.addEntity(new Character_2(this.game,0,0));

        this.game.addEntity(new Hero(this.game,0,0));
   
        //enemies
        this.game.addEntity(new Mage(this.game,0,RIGHT));
        this.game.addEntity(new Mage(this.game,1280,LEFT));
        this.game.addEntity(new Snake(this.game,-400, RIGHT));
        this.game.addEntity(new Snake(this.game,1500, LEFT));
        this.game.addEntity(new Ogre(this.game,-100, RIGHT));
        this.game.addEntity(new Ogre(this.game,1200, LEFT));
        //this.game.addEntity(new Skeleton(this.game,-100, RIGHT));
        //this.game.addEntity(new Skeleton(this.game,1200, LEFT));

        //background props
        this.game.addEntity(new BirdBrown(this.game,-325,RIGHT));
        this.game.addEntity(new BirdBrown(this.game,1412,LEFT));
        this.game.addEntity(new chest(this.game,530,535));


        //background
        this.game.addEntity(new Sun(this.game, 180, 150));
        this.game.addEntity(new Castle(this.game, 0, 0));

    }
    update(){
        if(this.game.click){
            if(this.game.click && this.game.click.x > 100 && this.game.click.x > 200){
                this.game.addEntity(new Character_2(this.game,0,0));
            }
            else{
                this.game.addEntity(new Hero(this.game,0,0));
            }
        }
    }
    draw(ctx) {

    }
 
}

