class TimeStop {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.x = 25;
        this.y = 600;
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/timeWatch.png");
        this.loadProperties();
        this.removeFromWorld = false;
    };

    loadProperties() {
        this.duration = 10;
        this.elapsed = 0;
        this.startTimer = false;
    }
    
    update () {
        if (this.startTimer == true) {this.elapsed += this.game.clockTick;}
        if(this.elapsed >= this.duration) {
            this.removeFromWorld = true;
            PARAMS.BUY = true;
        }
    };

    draw(ctx) {
        if(this.elapsed < this.duration) {
            ctx.drawImage(this.spritesheet,this.x,this.y);
            ctx.fillText("Time: " + Math.round(this.duration - this.elapsed), this.x + 20, this.y + 110); 
        } else if(this.elapsed >= this.duration) {
            
        }
    };
};
class DamageIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/damageIncrease.gif");

    };
    
    update () {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class SpeedIncrease {
    constructor(game, x, y) {
        this.x = 25;
        this.y = 600;
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/times2.png");
        this.loadProperties();
        this.removeFromWorld = false;
    };

    loadProperties() {
        
    }
    
    update () {
        
    };

    draw(ctx) {
        
    };
};
class SizeIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/arrow.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class Invincibility {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/star.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};

class GreenGuyArrow {
    constructor(game, x, y, facing) {
        Object.assign(this, {game, x, y, facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/greenguyarrow.png");
        this.loadProperties();
        this.updateBB();
        this.loadAnimation();
    };

    loadAnimation() {
        this.animation = new Animator(this.spritesheet,0,0,50,80,1,0.1,0,false,true);
    }
    
    loadProperties() {
        this.LEFT = 0;
        this.RIGHT = 1;

        this.SPEED = 300;
        this.removeFromWorld = false;
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.facing == this.LEFT) {
            this.BB = new BoundingBox(this.x, this.y, 50, 80);
        } else if (this.facing == this.RIGHT) {
            this.BB = new BoundingBox(this.x, this.y, 50, 80);
        }
    }

    collisionUpdate() {
        var that = this;
        this.game.entities[1].forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof SmallFireBall) {
                    entity.removeFromWorld = true;
                    that.removeFromWorld = true;
                } else {
                    entity.health -= 25;
                    that.removeFromWorld = true;
                }
            } 
        })

    }

    update () {
        const TICK = this.game.clockTick;
        this.updateBB();
        if (PARAMS.PAUSE == false) {
            if (this.facing == this.LEFT) {
                this.x -= this.SPEED * TICK;
            } else {
                this.x += this.SPEED * TICK; 
            } 
        }
        this.collisionUpdate();
    };

    draw(ctx) {
        if (this.facing == this.LEFT) {
            this.animation.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,1);
        } else if (this.facing == this.RIGHT) {
            this.animation.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
        }
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}

class ArrowShooterInvetory {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/powerUp1.png");
        this.loadAnimation();
    }

    loadAnimation() {
        this.animation = new Animator(this.spritesheet,0,0,127,108,1,0.1,0,false,true);
    }


    update() {

    }

    draw(ctx) {
  
    }
}
class ArrowShooter {
    constructor(game, x, y, facing) {
        Object.assign(this, {game, x, y, facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/powerUp1.png");
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
        this.loadProperties();
        this.updateBB();
        this.loadAnimation();
    };

    loadAnimation() {
        this.animation = new Animator(this.spritesheet,0,0,127,108,1,0.1,0,false,true);
    }
    
    loadProperties() {
        this.LEFT = 0;
        this.RIGHT = 1;

        this.timeElapsed = 0;
        this.attackCoolDown = 1.5;
        this.dead = false;
        this.MAX_HEALTH = 200;
        this.health = this.MAX_HEALTH;
        this.removeFromWorld = false;

    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.facing == this.LEFT) {
            this.BB = new BoundingBox(this.x+5, this.y, 107, 100);
        } else if (this.facing == this.RIGHT) {
            this.BB = new BoundingBox(this.x+15, this.y, 105, 100);
        }
        
    }

    collisionUpdate() {
        var that = this;
        this.game.entities[2].forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Ground && that.lastBB.bottom >= entity.BB.top && !that.knockback) {
                    that.y = entity.BB.top - that.BB.height;
                }
            } 
            
        })
        this.game.entities[1].forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof SmallFireBall) {
                    that.health -= 10;
                    entity.removeFromWorld = true;
                } else {
                    that.health -= 10;
                    if (entity.facing == that.LEFT) {
                        entity.x += 50;
                    } else if (entity.facing == that.RIGHT) {
                        entity.x -= 50;
                    } 
                }
            } 
        })
    }

    update () {
        const TICK = this.game.clockTick;
        this.y += 1;
        
        if (PARAMS.PAUSE == false) {
            if (this.health <= 0) {
                this.health = 0;
                this.dead = true;
                this.removeFromWorld = true;
            }
            if (this.timeElapsed < this.attackCoolDown) {
                this.timeElapsed += TICK;
            } else {
                this.timeElapsed = 0;
                this.state = this.ATTACKING;
                this.game.addEntityForeground(new GreenGuyArrow(this.game,this.x,this.y+15,this.facing));
            }
        }
            


        this.updateBB();
        this.collisionUpdate();
    };

    draw(ctx) {
        if (this.facing == this.LEFT) {
            this.animation.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,1);
        } else if (this.facing == this.RIGHT) {
            this.animation.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
        }
        ctx.drawImage(this.healthbarred, this.BB.x, this.y-10, this.BB.width, 5);
        ctx.drawImage(this.healthbar, this.BB.x, this.y-10, this.BB.width * (this.health / this.MAX_HEALTH), 5);
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};
class HealthIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/healthIncrease.png");
        this.removeFromWorld = false;
    };
    
    update () {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};

class SpeedSkill {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/speedDisplay.png");
        this.removeFromWorld = false;
    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};

class CoolDown {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/cooldown.png");
        this.removeFromWorld = false;
    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class Shield {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/shield.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class CastleShield {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/castleDefense.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class HealthPotion {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/healthPotion.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class SonicWave {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/sonicwave.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class Lazer {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/lazerbeam.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class NUKE {
    constructor(game){
		this.game = game;
		this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/nuke.png");
		this.spritesheet2 = ASSET_MANAGER.getAsset("./resources/background/explosion.png");
		this.x = 400;
		this.y = 0;
		this.speed = 300;
        this.finished = false;
	};

	update(){
		this.y+= this.speed * this.game.clockTick;
		//if(this.y> 769) this.y = 0;
	};
	
	draw(ctx){
		// this.spritesheet.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		// this.animator.drawFrame(this.game.clockTick, ctx, this.x+100, this.y);
		ctx.drawImage(this.spritesheet,this.x, this.y);
		if(this.y> 769) {
            ctx.drawImage(this.spritesheet2,50, 0);
            this.finished = true;
        }
	};
};
class AirSlash {
    constructor(game,x,y,facing) {
        Object.assign(this,{game,x,y,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/airSlash.png");
        this.animation = [];
        this.loadProperties();
        this.loadAnimation();
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        if (this.facing == this.LEFT) {
            this.BB = new BoundingBox(this.x, this.y, 35,95);
        } else if (this.facing == this.RIGHT) {
            this.BB = new BoundingBox(this.x, this.y, 35, 95);
        }
    }
    loadAnimation() {
        this.animation[0] = new Animator(this.spritesheet,0,38,30,52,2,2,0,false,true);
    };
    loadProperties() {
            this.LEFT = 0;
            this.RIGHT = 1;
    
            this.SPEED = 300;
            this.removeFromWorld = false;
    };
    collisionUpdate() {
        var that = this;
        this.game.entities[1].forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof SmallFireBall) {
                    entity.removeFromWorld = true;
                    that.removeFromWorld = true;
                } else {
                    entity.health -= 25;
                    that.removeFromWorld = true;
                }
            } 
        })

    }
    update() {
        const TICK = this.game.clockTick;
        this.updateBB();
        if (PARAMS.PAUSE == false) {
            if (this.facing == this.LEFT) {
                this.x -= this.SPEED * TICK;
            } else {
                this.x += this.SPEED * TICK; 
            } 
        }
        this.collisionUpdate();
    };
    draw(ctx) {
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y-20, this.BB.width, this.BB.height);
        }
        if (this.facing == this.RIGHT) {
            this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y-20,2); 
        } else {
            this.animation[0].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y-20,2);   
        }  
    };
};
class AirSlashInvetory {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/slash.png");
        this.loadAnimation();
    }

    loadAnimation() {
        this.animation = new Animator(this.spritesheet,0,0,71,89,1,0.1,0,false,true);
    }


    update() {

    }

    draw(ctx) {
  
    }
}