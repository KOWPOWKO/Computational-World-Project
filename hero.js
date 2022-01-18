class Hero {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./BlueKnightSpriteSheet.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.speed = 200;
        this.loadAnimation(spritesheet);
    };
    update() {
        this.x += this.speed*this.game.clockTick;
        if (this.x > 1024) this.x = -100;
    };
    loadAnimation(spritesheet) {
        this.idleAnimation = [];
        this.idleAnimation[0] = new Animator(this.spritesheet,88,1200,80,104,10,0.1,0,false,true);
        
        this.walkAnimation = [];
        this.walkAnimation[0] = new Animator(this.spritesheet,88,907,96,104,10,0.1,1.5,true,true);

        this.attackAnimation = [];
        this.attackAnimation[0] = new Animator(this.spritesheet,88,315,128,120,10,0.03,0.5,false,true);
        

        
    }

    draw(ctx) {
        this.idleAnimation[0].drawFrame(this.game.clockTick,ctx,0,0,1);
        this.walkAnimation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
        this.attackAnimation[0].drawFrame(this.game.clockTick,ctx,0,0,1);

        var offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = 128;
        offscreenCanvas.hieght = 128;
        var offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.save();
        offscreenCtx.scale(-1,1);
        this.walkAnimation[0].drawFrame(this.game.clockTick,offscreenCtx,-100,0,1);
        offscreenCtx.restore();
        ctx.drawImage(offscreenCanvas,this.x,100);
    };
};