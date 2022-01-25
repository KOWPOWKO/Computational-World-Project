
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
        this.SPEED = 0.4;
        this.GROUND = 507;
        this.y = this.GROUND;
    }

    loadAnimation() {
        // Walk
        this.animation[0] = new Animator(this.spritesheet,278,74,16,16,2,0.2,14,false,true);
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
            this.animation[0].drawFrameY(this.game.clockTick,ctx,this.x,this.y,4); 
        } else {
            this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,4);   
        }

            
    };
};

class Ogre {
	constructor(game){
		this.game = game;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./resources/monstor2.png"), 4, 0, 20, 28, 10, 0.4);
		this.x = 0;
		this.y = 350;
		this.speed = 100;
	};

	update(){
		this.x += this.speed * this.game.clockTick;
		if(this.x > 1024) this.x = 0;
	};
	
	draw(ctx){
		this.animator.drawFrame(this.game.clockTick, ctx, this.x+100, this.y);
	};
};