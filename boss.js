class DragonBoss {
    constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/boss.png");
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
        this.coin = ASSET_MANAGER.getAsset("./resources/powerUps/coin.png");

        this.animation = []
        
        
        this.loadProperties();
        this.loadAnimation();
        this.updateBB();
        this.updateAttackBB();
    };

    loadProperties() {
        console.log('in');
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 25;
        this.GROUND = 480;
        this.ATTACK_SPEED = 5;
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
        this.load = true;
    }
    
    updateAttackBB() {
        this.lastAttackBB = this.attackBB;
        if(this.facing == this.LEFT) {
            this.attackBB = new BoundingBox(this.BB.x-10, this.BB.y, 70, this.BB.height);
        } else {
            this.attackBB = new BoundingBox(this.BB.x+this.BB.width, this.BB.y, 70, this.BB.height);
        }   
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+5, this.y, (this.animation[0].width*4)-10, (this.animation[0].height*4));
    }



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

    horizontalUpdate() {
        if (PARAMS.PAUSE == false) {
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
                    that.SPEED = 0;
                } else {
                    that.SPEED = 25;
                }
            } 
            if(entity.BB && that.attackBB.collide(entity.BB) && that.previousAttack >= that.ATTACK_SPEED) {
                if (entity instanceof CastleBounds) {
                    that.SPEED = 0;
                    entity.health -= 10;
                    that.previousAttack = 0;
                }else {
                    that.SPEED = 25;
                }
            }    
       
        })
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
                this.animation[0].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,4);    
            } else {
                this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,4);
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
            console.log(this.MAX_HEALTH);
            ctx.drawImage(this.healthbar, this.BB.x, this.y-7, this.BB.width * (this.health / this.MAX_HEALTH), 5);
        }
    };
};
