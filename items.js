class Coin {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/coin.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.animation = []
        this.loadAnimation(spritesheet);
    };
    update() {

    };
    loadAnimation(spritesheet) {
        // Coin
        this.animation[0] = new Animator(this.spritesheet,58,50,64,64,11,0.15,11.2,false,true);

        
    }

    draw(ctx) {
        this.animation[0].drawFrame(this.game.clockTick,ctx,250,100,1);      
        
    };
};

class SmallFireBall {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/boss.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.animation = []
        this.loadAnimation(spritesheet);
    };
    update() {

    };
    loadAnimation(spritesheet) {
        // Coin
        this.animation[0] = new Animator(this.spritesheet,390,308,24,16,3,0.15,3,false,true);
    }

    draw(ctx) {
        this.animation[0].drawFrame(this.game.clockTick,ctx,300,0,1);      
        
    };
};

class FireBall {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/boss.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.animation = []
        this.loadAnimation(spritesheet);
    };
    update() {

    };
    loadAnimation(spritesheet) {
        // Coin
        this.animation[0] = new Animator(this.spritesheet,58,300,56,32,3,0.15,7,false,true);
    }

    draw(ctx) {
        this.animation[0].drawFrame(this.game.clockTick,ctx,350,0,1);      
        
    };
};

class BirdBrown {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/bird.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.animation = []
        this.loadAnimation(spritesheet);
    };
    update() {

    };
    loadAnimation(spritesheet) {
        // Coin
        this.animation[0] = new Animator(this.spritesheet,8,13,72,56,6,0.15,14.7,false,true);
    }

    draw(ctx) {
        this.animation[0].drawFrame(this.game.clockTick,ctx,200,0,1);      
        
    };
};