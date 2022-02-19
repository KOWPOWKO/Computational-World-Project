class DragonBoss {
    constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/boss.png");
        this.y = 0;

        this.animation = []
        this.loadProperties()
        this.loadAnimation();
    };

    loadAnimation() {
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

        
    };

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.2;
        this.GROUND = 440;
        this.y = this.GROUND;
    };

    update() {
        if (this.facing == this.LEFT) {
            if (this.x >= 780) {
                this.x -= this.SPEED;
            }
        } else if (this.facing == this.RIGHT) {
            if (this.x <= 440) {
                this.x += this.SPEED;
            }
        }
    };

    draw(ctx) {
        if (this.facing == this.LEFT) {
            this.animation[0].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,2); 
        } else {
            this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,2);   
        }   
        
    };
};