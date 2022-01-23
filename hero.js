class Hero {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/defender.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.speed = 200;
        
        this.animations = [];
        this.loadAnimation(spritesheet);
    };
    update() {

    };
    loadAnimation(spritesheet) {
        // Idle
        this.animations[0] = new Animator(this.spritesheet,88,1200,80,104,10,0.1,0,false,true);
        // Walking
        this.animations[1] = new Animator(this.spritesheet,88,907,96,104,10,0.1,1.5,true,true);
        // Run
        this.animations[2] = new Animator(this.spritesheet,88,811,104,96,10,0.1,-5.2,true,true);
        // Attacking
        this.animations[3] = new Animator(this.spritesheet,88,315,128,120,10,0.1,0.5,false,true);
        // Blocking
        this.animations[4] = new Animator(this.spritesheet,631,575,88,104,1,0.15,18,false,true);
        // Die
        this.animations[5] = new Animator(this.spritesheet,84,178,144,120,9,0.15,-1,false,true);
        // Damaged
        this.animations[6] = new Animator(this.spritesheet,84,178,96,120,1,0.15,-1,false,true);
        // Jump
        this.animations[7] = new Animator(this.spritesheet,89,1098,96,104,10,0.15,-0.5,false,true);

        
    }

    draw(ctx) {
        this.animations[0].drawFrameReverse(this.game.clockTick,ctx,0,0,1);
        this.animations[1].drawFrameReverse(this.game.clockTick,ctx,0,128*2,1);
        this.animations[6].drawFrameReverse(this.game.clockTick,ctx,128,128*5,1);
        this.animations[2].drawFrameReverse(this.game.clockTick,ctx,0,128,1);

        this.animations[3].drawFrameReverse(this.game.clockTick,ctx,0,128*3,1);
        this.animations[4].drawFrameReverse(this.game.clockTick,ctx,0,128*4,1);
        this.animations[5].drawFrameReverse(this.game.clockTick,ctx,0,128*5,1);
        this.animations[7].drawFrameReverse(this.game.clockTick,ctx,0,128*5,1);
    };
};