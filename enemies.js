
class Snake {
    constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);

        this.loadProperties();
        this.animation = [];
        this.loadAnimation();
    };

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.75;
        this.GROUND = 525;
        this.y = this.GROUND;
    }
    

    loadAnimation() {
        // Walk
        this.animation[0] = new Animator(this.spritesheet,34,314,16,16,2,0.2,15,false,true);

        
    }

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
            this.animation[0].drawFrameY(this.game.clockTick,ctx,this.x,this.y,3); 
        } else {
            this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,3);   
        }   
    };
};


class Mage {
    constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies.png");
        this.healthbar = ASSET_MANAGER.getAsset("./resources/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/healthred.jpg");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        
        this.loadProperties();
        this.updateBB();
        this.animation = [];
        this.loadAnimation();
    };
    
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 60, 64);
    }

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.4;
        this.GROUND = 507;
        this.y = this.GROUND;

        //states
        this.dead = false;
        this.MAX_HEALTH = 50;
        this.health = this.MAX_HEALTH;
        this.hasBeenAttacked = false;

    }

    loadAnimation() {
        // Walk
        this.animation[0] = new Animator(this.spritesheet,278,74,16,16,2,0.2,14,false,true);
    }

    update() {
        if (this.dead) {
            this.removeFromWorld = true;
        } else {
            if (this.facing == this.LEFT) {
                if (this.x >= 780) {
                    this.x -= this.SPEED;
                }
            } else if (this.facing == this.RIGHT) {
                if (this.x <= 440) {
                    this.x += this.SPEED;
                }
            }
            if (this.health <= 0) {
                this.health = 0;
                this.dead = true;
            }
            this.updateBB();
        }

        
    };

    draw(ctx) {
        if(!this.dead) {
            if (this.facing == this.LEFT) {
                this.animation[0].drawFrameY(this.game.clockTick,ctx,this.x,this.y,4); 
            } else {
                this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,4);   
            }
    
            if (PARAMS.DEBUG) { 
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x, this.BB.y + 3, this.BB.width, this.BB.height);
            }
            ctx.drawImage(this.healthbarred, this.x+5, this.y-10, this.MAX_HEALTH, 5);
            ctx.drawImage(this.healthbar, this.x+5, this.y-10, this.health, 5);
        }
    };
};

class Ogre {
	constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
		this.spritesheet = ASSET_MANAGER.getAsset("./resources/monstor2.png");
        this.spritesheet_2 = ASSET_MANAGER.getAsset("./resources/monstor2rev.png");

        this.loadProperties();
        this.animation = [];
        this.loadAnimation();
    };

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.4;
        this.GROUND = 440;
        this.y = this.GROUND;
    }

    loadAnimation() {
        // Walk
        this.animation[0] = new Animator(this.spritesheet, 4, 0, 20, 28, 10, 0.4,0,false,true);
        this.animation[1] = new Animator(this.spritesheet_2, 0, 0, 20, 28, 10, 0.4,0,false,true);
    }

	update(){
		if (this.facing == this.LEFT) {
            if (this.x >= 780) {
                this.x -= this.SPEED;
            }
        } else if (this.facing == this.RIGHT) {
            if (this.x <= 440) {
                this.x += this.SPEED;
            }
        }
    }
	
	draw(ctx){
        if (this.facing == this.LEFT) {
            this.animation[0].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,5); 
        } else {
            this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,5);   
        }
    }
};