class DragonBoss {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/boss.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.speed = 200;
        this.animation = []
        this.loadAnimation(spritesheet);
    };
    update() {
        this.x += this.speed*this.game.clockTick;
        if (this.x > 1024) this.x = -100;
    };
    loadAnimation(spritesheet) {
        // Walk
        this.animation[0] = new Animator(this.spritesheet,316,16,64,56,3,0.15,8,false,true);
        // Attack
        this.animation[1] = new Animator(this.spritesheet,16,84,72,56,3,0.2,0,false,true);
        // Ram
        this.animation[2] = new Animator(this.spritesheet,91,144,128,80,3,0.2,24,false,true);
        // Charge up
        this.animation[3] = new Animator(this.spritesheet,61,228,72,56,3,0.5,6.5,false,true);
        // die
        this.animation[4] = new Animator(this.spritesheet,337,228,72,62,3,0.5,3,false,true);

        
    }

    draw(ctx) {
        this.animation[0].drawFrame(this.game.clockTick,ctx,100,0,1);     
        this.animation[1].drawFrame(this.game.clockTick,ctx,100,400,1);   
        this.animation[2].drawFrame(this.game.clockTick,ctx,100,100,1);   
        this.animation[3].drawFrame(this.game.clockTick,ctx,100,200,1);   
        this.animation[4].drawFrame(this.game.clockTick,ctx,100,300,1);     
        
    };
};