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
// class Coin {
//     constructor(game,x,y,spritesheet) {
//         Object.assign(this,{game,x,y,spritesheet});
//         this.spritesheet = ASSET_MANAGER.getAsset("./resources/coin.png");
//         this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/coin.png");
//         //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
//         this.y = 0;
//         this.x = 0;
//         this.animation = [];
//         this.loadAnimation(spritesheet);
//     };
//     update() {

//     };
//     loadAnimation(spritesheet) {
//         // Coin
//         this.animation[0] = new Animator(this.spritesheet,58,50,64,64,11,0.15,11.2,false,true);

        
//     }

//     draw(ctx) {
//         this.animation[0].drawFrame(this.game.clockTick,ctx,50,10,1);      
        
//     };
// };
class Score {
    constructor(game, x, y, score) {
        Object.assign(this, { game, x, y, score });

        this.game.camera.score += this.score;

        this.velocity = -2 * PARAMS.BITWIDTH;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 1) this.removeFromWorld = true;
        this.y += this.game.clockTick * this.velocity * PARAMS.SCALE;
    };

    drawMinimap(ctx, mmX, mmY) {
    }

   draw(ctx) {
        ctx.fillStyle = "White";
        ctx.fillText(this.score, this.x + (this.score < 1000 ? PARAMS.BLOCKWIDTH / 8 : 0), this.y);    
    };
};

class SmallFireBall {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/boss.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.animation = [];
        this.loadProperties();
        this.loadAnimation();
    };
    loadAnimation() {
        // Coin
        this.animation[0] = new Animator(this.spritesheet,390,308,24,16,3,0.15,3,false,true);
    };
    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.4;
        this.HEIGHT = 5;
    };
    update() {
        if (this.facing == this.LEFT) {
            this.animation.drawFrame(this.game.clockTick,ctx,this.x,this.y,0.5); 
        } else {
            this.animation.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,0.5);   
        } 
    };
    draw(ctx) {
        this.animation[0].drawFrame(this.game.clockTick,ctx,300,0,1);      
        
    };
};

class FireBall {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/boss.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.y = 0;
        this.x = 0;
        this.loadProperties();
        this.loadAnimation();
    };
    loadAnimation() {
        // Coin
        this.animation = new Animator(this.spritesheet,58,300,56,32,3,0.15,7,false,true);
    };
    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.4;
        this.HEIGHT = 5;
    };
    update() {

    };
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick,ctx,350,0,1);      
        
    };
};

class AirSlash {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/airSlash.png");
        this.y = 0;
        this.x = 0;
        this.loadProperties();
        this.loadAnimation();
    };
    loadAnimation() {
        this.animation = new Animator(this.spritesheet,8,90,56,112,1,1,0,false,true);
    };
    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.4;
        this.HEIGHT = 5;
    };
    update() {
        if (this.facing == this.LEFT) {
            this.animation.drawFrame(this.game.clockTick,ctx,this.x,this.y,0.5); 
        } else {
            this.animation.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,0.5);   
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
        if (this.facing == this.LEFT) {

                this.x -= this.SPEED;

        } else if (this.facing == this.RIGHT) {

                this.x += this.SPEED;
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