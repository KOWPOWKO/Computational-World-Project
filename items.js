class Coin {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/coin.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);

        
        this.loadProperties();
        this.updateBB();
        this.loadAnimation();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 64, 64);
    }

    loadAnimation() {
        // Coin
        this.animation = new Animator(this.spritesheet,58,50,64,64,11,0.15,11.2,false,true);
    };

    loadProperties() {
        this.hasBeenCollected = false;
    };

    update() {
        if (this.hasBeenCollected) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        if (!this.hasBeenCollected) {
            this.animation.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
        }
        
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
        
    };
};


class SmallFireBall {
    constructor(game,x,y,facing) {
        Object.assign(this,{game,x,y,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/boss.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.animation = [];
        this.loadProperties();
        this.loadAnimation();
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        if (this.facing == this.LEFT) {
            this.BB = new BoundingBox(this.x + 5, this.y + 5, 24, 16);
        } else if (this.facing == this.RIGHT) {
            this.BB = new BoundingBox(this.x + 5, this.y + 5, 24, 16);
        }
        
    };

    loadAnimation() {
        // Coin
        this.animation[0] = new Animator(this.spritesheet,390,308,24,16,3,0.15,3,false,true);
    };
    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;
        this.hasBeenAttacked = false;
        this.removeFromWorld = false;

        //restrictions
        this.SPEED = 120;
        this.HEIGHT = 5;
    };
    update() {
        this.updateBB();
        const TICK = this.game.clockTick;
        if (PARAMS.PAUSE == false) {
            if (this.facing == this.LEFT) {
                this.x -= this.SPEED * TICK;
            } else {
                this.x += this.SPEED * TICK; 
            } 
        }
        

        
    };
    draw(ctx) {
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }

        if (this.facing == this.RIGHT) {
            this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,2); 
        } else {
            this.animation[0].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,2);   
        } 

        
    };
};

class FireBall {
    constructor(game,x,y,facing) {
        Object.assign(this,{game,x,y,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/boss.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.loadProperties();
        this.loadAnimation();
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.animation.width, this.animation.height);    
            
    };

    loadAnimation() {
        // Coin
        this.animation = new Animator(this.spritesheet,58,300,56,32,3,0.15,7,false,true);
    };
    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;
        this.hasBeenAttacked = false;
        this.removeFromWorld = false;

        //restrictions
        this.SPEED = 120;
        this.HEIGHT = 5;
    };
    update() {
        this.updateBB();
        const TICK = this.game.clockTick;
        if (PARAMS.PAUSE == false) {
            if (this.facing == this.LEFT) {
                this.x -= this.SPEED * TICK;
            } else {
                this.x += this.SPEED * TICK; 
            } 
        }
        

        
    };
    draw(ctx) {
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }

        if (this.facing == this.LEFT) {
            this.animation.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,1);  
        } else {
            this.animation.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
        }         
    };
};

class BirdBrown {
    constructor(game,x,facing) {
        Object.assign(this,{game,x, facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/background/bird.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;

        this.loadProperties();
        this.loadAnimation();
    };

    loadAnimation() {
        this.animation = new Animator(this.spritesheet,8,13,72,56,6,0.15,14.7,false,true);
    };

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.4;
        this.HEIGHT = 5;
        this.y = this.HEIGHT;
    };

    update() {
        if (PARAMS.PAUSE == false) {
            if (this.facing == this.LEFT) {

                this.x -= this.SPEED;

        } else if (this.facing == this.RIGHT) {

                this.x += this.SPEED;
        }
        }
        
    };
    

    draw(ctx) { 
        if (this.facing == this.LEFT) {
            this.animation.drawFrame(this.game.clockTick,ctx,this.x,this.y,0.5); 
        } else {
            this.animation.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,0.5);   
        }  
        
    };
};