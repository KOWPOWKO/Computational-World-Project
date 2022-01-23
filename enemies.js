class Snake {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.speed = 200;
        this.animation = []
        this.loadAnimation(spritesheet);
    };
    update() {

    };
    loadAnimation(spritesheet) {
        // Walk
        this.animation[0] = new Animator(this.spritesheet,34,314,16,16,2,0.2,15,false,true);

        
    }

    draw(ctx) {
        this.animation[0].drawFrameY(this.game.clockTick,ctx,500,100,3);     
    };
};

class Mage {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.speed = 200;
        this.animation = []
        this.loadAnimation(spritesheet);
    };
    update() {

    };
    loadAnimation(spritesheet) {
        // Walk
        this.animation[0] = new Animator(this.spritesheet,278,74,16,16,2,0.2,14,false,true);

        
    }

    draw(ctx) {
        this.animation[0].drawFrameY(this.game.clockTick,ctx,500,0,3);     
    };
};