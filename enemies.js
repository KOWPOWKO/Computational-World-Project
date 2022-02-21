
class Snake {
    constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/enemies.png");
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
        this.coin = ASSET_MANAGER.getAsset("./resources/powerUps/coin.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);

        this.loadProperties();
        this.updateBB();
        this.updateAttackBB();
        this.animation = [];
        this.loadAnimation();
        this.score = 0;
        this.timeStop = new TimeStop();
    };
    
    updateAttackBB() {
        this.lastAttackBB = this.attackBB;
        if(this.facing == this.LEFT) {
            this.attackBB = new BoundingBox(this.BB.x-10, this.BB.y, 10, 48);
        } else {
            this.attackBB = new BoundingBox(this.BB.x+this.BB.width, this.BB.y, 10, 48);
        }   
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+15, this.y + 2, 40, 48);
    }

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 75;
        this.GROUND = 525;
        this.ATTACK_SPEED = 1;
        this.y = this.GROUND;

        //states
        this.dead = false;
        this.MAX_HEALTH = 50;
        this.health = this.MAX_HEALTH;
        this.hasBeenAttacked = false;
        this.knockback = false;
        this.MAX_KNOCKBACK = 50;
        this.knockbackCounter = 0;
        this.previousAttack = 0;
    }
    

    loadAnimation() {
        // Walk
        this.animation[0] = new Animator(this.spritesheet,34,314,16,16,2,0.2,15,false,true);
    }

    knockbackUpdate() {
        if(this.knockbackCounter < this.MAX_KNOCKBACK) {
            if (this.facing == this.RIGHT) {
                this.x -= 10;
                this.y -= 2;
            } else if (this.facing == this.LEFT) {
                this.x += 10;
                this.y -= 2;
            }
            this.knockbackCounter += 10;
        } else if (this.knockbackCounter >= this.MAX_KNOCKBACK) {
            this.knockbackCounter = 0;
            this.knockback = false;
        }
    }

    horizontalUpdate() {
        if (this.facing == this.LEFT && !this.knockback) {
                this.x -= this.SPEED * this.game.clockTick;

        } else if (this.facing == this.RIGHT && !this.knockback) {
                this.x += this.SPEED * this.game.clockTick;
        }
    }

    collisionUpdate(TICK) {
        var that = this;
        that.previousAttack += TICK;
        this.game.entities[2].forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Ground && that.lastBB.bottom >= entity.BB.top && !that.knockback) {
                    that.y = entity.BB.top - that.BB.height;
                }
                if (entity instanceof CastleBounds) {
                if (that.facing == that.RIGHT) {
                    that.x = entity.BB.left - (that.BB.width * 3);
                } else if (that.facing == that.LEFT) {
                    that.x = entity.BB.right + that.BB.width;
                }
            }
            } 
            if(entity.BB && that.attackBB.collide(entity.BB) && that.previousAttack >= that.ATTACK_SPEED) {
                if (entity instanceof CastleBounds) {
                    if (that.facing == that.RIGHT) {
                        that.x = entity.BB.left - (that.BB.width * 3);
                    } else if (that.facing == that.LEFT) {
                        that.x = entity.BB.right + that.BB.width;
                    }
                    entity.health -= 10;
                    that.previousAttack = 0;
                }
            }    
       
        })
    }

    update() {
        const TICK = this.game.clockTick;
        this.y += 1;
        if (this.dead) {
            this.removeFromWorld = true;
            this.game.addEntityForeground(new Coin(this.game, this.x, this.y-18)); 
        } else {
            this.horizontalUpdate();
        }
        
        if (this.knockback) {
            this.knockbackUpdate(TICK);
            this.game.addEntityBackground(new Coin(this.game, 300, 300));
        }

        if (this.health <= 0 && !this.knockback) {
            this.health = 0;
            this.dead = true;
            this.coinX = this.x+10;
        }
        

        this.updateBB();
        this.updateAttackBB();
        this.collisionUpdate(TICK);
    };

    draw(ctx) {
        
        if(!this.dead) {
            if (this.facing == this.LEFT) {
                this.animation[0].drawFrameY(this.game.clockTick,ctx,this.x,this.y,3); 
            } else {
                this.animation[0].drawFrameReverseY(this.game.clockTick,ctx,this.x+20,this.y,3);   
            }   
            if (PARAMS.DEBUG) { 
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
                if(this.previousAttack >= this.ATTACK_SPEED) {
                    ctx.strokeStyle = 'Red';
                    ctx.strokeRect(this.attackBB.x, this.attackBB.y, this.attackBB.width, this.attackBB.height);
                }

                
            }
    
            
            ctx.drawImage(this.healthbarred, this.BB.x, this.y-7, this.BB.width, 5);
            ctx.drawImage(this.healthbar, this.BB.x, this.y-7, this.BB.width * (this.health / this.MAX_HEALTH), 5);
        }
    };
};


class Mage {
    constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/enemies.png");
    
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
       // this.coinDisplay = ASSET_MANAGER.getAsset("./resources/powerUps/coinDisplay.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        
        this.loadProperties();
        this.updateBB();
        this.animation = [];
        this.loadAnimation();
        this.elapsed = 0;
        

    };
    
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + 3, 60, 64);
    }

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 35;
        this.GROUND = 507;
        this.y = this.GROUND;
        this.x;

        //states
        this.dead = false;
        this.MAX_HEALTH = 100;
        this.health = this.MAX_HEALTH;
        this.hasBeenAttacked = false;
        this.knockback = false;
        this.MAX_KNOCKBACK = 50;
        this.knockbackCounter = 0;

    }

    loadAnimation() {

        this.animation[0] = new Animator(this.spritesheet,278,74,16,16,2,0.2,14,false,true);
        this.animation[1] = new Animator(this.spritesheet,369,15,13,13,1,0.2,0,false,true);
    }

    knockbackUpdate() {
        if(this.knockbackCounter < this.MAX_KNOCKBACK) {
            if (this.facing == this.RIGHT) {
                this.x -= 10;
                this.y -= 2;
            } else if (this.facing == this.LEFT) {
                this.x += 10;
                this.y -= 2;
            }
            this.knockbackCounter += 10;
        } else if (this.knockbackCounter >= this.MAX_KNOCKBACK) {
            this.knockbackCounter = 0;
            this.knockback = false;
        }
    }

    horizontalUpdate() {
        if (this.facing == this.LEFT && !this.knockback) {
            if (this.x >= 780) {
                this.x -= this.SPEED * this.game.clockTick;
            }
        } else if (this.facing == this.RIGHT && !this.knockback) {
            if (this.x <= 440) {
                this.x += this.SPEED * this.game.clockTick;
            }
        }
    }
    collisionUpdate() {
        var that = this;
        this.game.entities[2].forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Ground && that.lastBB.bottom >= entity.BB.top && !that.knockback) {
                    that.y = entity.BB.top - that.BB.height;
                }
                if (entity instanceof CastleBounds) {
                    if (that.facing == that.RIGHT) {
                        that.x = entity.BB.left - (that.BB.width);
                    } else if (that.facing == that.LEFT) {
                        that.x = entity.BB.right + that.BB.width;
                    }
                }
            }
            
        })
    }

    update() {
        const TICK = this.game.clockTick;
        this.y += 1;
        if (this.dead) {
            this.removeFromWorld = true;
            this.game.addEntityForeground(new Coin(this.game, this.x, this.y)); 
        } else {
            this.horizontalUpdate();

            if (this.timeElapsed < 0.5) {
                this.timeElapsed += TICK;
            } else {
                this.timeElapsed = 0;
                this.state = this.ATTACKING;
            }
        }
        
        if (this.knockback) {
            this.knockbackUpdate();
        }

        if (this.health <= 0 && !this.knockback) {
            this.health = 0;
            this.dead = true;
        }

        this.updateBB();

        this.collisionUpdate();
    };

    draw(ctx) {

        if(!this.dead) {
            if (this.facing == this.LEFT) {
                this.animation[0].drawFrameY(this.game.clockTick,ctx,this.x,this.y,4); 
            } else {
                this.animation[0].drawFrameReverseY(this.game.clockTick,ctx,this.x,this.y,4);  
            }

            if (PARAMS.DEBUG) { 
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            }

            ctx.drawImage(this.healthbarred, this.BB.x, this.y-10, this.BB.width, 5);
            ctx.drawImage(this.healthbar, this.BB.x, this.y-10, this.BB.width * (this.health / this.MAX_HEALTH), 5);
        }
    };
};

class Ogre {
	constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
		this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/monstor2.png");
        this.spritesheet_2 = ASSET_MANAGER.getAsset("./resources/enemies/monstor2rev.png");
        this.animation = [];
        this.loadProperties();
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

class Skeleton {
	constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
		this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/skeleton.png");
       // this.spritesheet_2 = ASSET_MANAGER.getAsset("./resources/monstor2rev.png");
        this.animation = [];
        this.loadProperties();
        this.loadAnimation();
    };

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 0.1;
        this.GROUND = 235;
        this.y = this.GROUND;
    }

    loadAnimation() {
        // Walk
        this.animation[0] = new Animator(this.spritesheet, 59, 85, 48, 70, 8, 0.25,0.3,false,true);
      //  this.animation[1] = new Animator(this.spritesheet_2, 0, 0, 20, 28, 10, 0.4,0,false,true);
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