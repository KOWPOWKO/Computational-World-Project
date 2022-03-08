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
        //facings
        this.MIDDLE = 640;
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 10;
        this.baseSpeed = 10;
        this.GROUND = 507;
        this.y = this.GROUND;
        this.x;
        this.scale = 4;
        //states
        this.ATTACK_SPEED = 2;
        this.dead = false;
        this.MAX_HEALTH = 1000;
        this.health = this.MAX_HEALTH;
        this.hasBeenAttacked = false;
        this.knockback = false;
        this.MAX_KNOCKBACK = 50;
        this.knockbackCounter = 0;


        this.abilityRamming = false;
        this.abilityChargingRamming = false;
        this.abilityChargingRammingTimer = 0;
        this.abilityRamTimer = 0;
        this.abilityRamCooldown = 25;


        this.attacking = false;
        this.rangeAttackCount = 0;
        this.rangeAttackTiming= 0;
        this.rangeAttackIntervals= 0.5;


        this.previousAttack = 0;
    }
    
    updateAttackBB() {
        this.lastAttackBB = this.attackBB;
        if (this.abilityRamming) {
            this.attackBB = this.BB;
        } else {
            if(this.facing == this.LEFT) {
                this.attackBB = new BoundingBox(this.BB.x-70, this.BB.y, 70, this.BB.height);
            } else {
                this.attackBB = new BoundingBox(this.BB.x+this.BB.width, this.BB.y, 70, this.BB.height);
            }   
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
        if (this.facing == this.LEFT && !this.knockback && !this.abilityChargingRamming) {
            this.x -= this.SPEED * PARAMS.SLOW * this.game.clockTick;

        } else if (this.facing == this.RIGHT && !this.knockback && !this.abilityChargingRamming) {
                this.x += this.SPEED * PARAMS.SLOW * this.game.clockTick;
        }
    }

    collisionUpdate(TICK) {
        var that = this;
        this.game.entities[2].forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Ground && that.lastBB.bottom >= entity.BB.top && !that.knockback) {
                    that.y = entity.BB.top - that.BB.height;
                }
                if (entity instanceof CastleBounds && !that.abilityRamming) {
                    that.SPEED = 0;
                } else if (!(entity instanceof Coin) && !that.abilityRamming) {
                    that.SPEED = that.baseSpeed;
                };
            } 
            if(entity.BB && that.attackBB.collide(entity.BB) && that.previousAttack >= that.ATTACK_SPEED) {
                if (entity instanceof CastleBounds) {
                    if(!that.abilityRamming)
                        that.SPEED = 0;
                    entity.health -= 10;
                    that.previousAttack = 0;
                }else if (!that.abilityRamming) {
                    that.SPEED = that.baseSpeed;
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

    rangeAttack(TICK) {
        if((this.previousAttack > this.ATTACK_SPEED+0.5 || this.attacking) && !this.abilityRamming) {
            this.rangeAttackTiming += TICK;
            if(this.rangeAttackTiming > this.rangeAttackIntervals && this.rangeAttackCount < 2) {
                if(this.facing == this.RIGHT) {
                    this.game.addEntityEnemies(new FireBall(this.game,this.x+this.BB.width-20,this.y+120,this.facing));
                } else {
                    this.game.addEntityEnemies(new FireBall(this.game,this.x,this.y+120,this.facing));
                }
                ASSET_MANAGER.playAsset("./resources/sound/fireballSound.wav");
                this.attacking = true;
                this.rangeAttackTiming = 0;
                this.rangeAttackCount ++;
                this.previousAttack = 0;
            }  else if (this.rangeAttackTiming > this.rangeAttackIntervals && this.rangeAttackCount < 4) {
                if(this.facing == this.RIGHT) {
                    this.game.addEntityEnemies(new SmallFireBall(this.game,this.x+this.BB.width-20,this.y+120,this.facing));
                } else {
                    this.game.addEntityEnemies(new SmallFireBall(this.game,this.x,this.y+120,this.facing));
                }
                ASSET_MANAGER.playAsset("./resources/sound/fireballSound.wav");
                this.rangeAttackTiming = 0;
                this.rangeAttackCount ++;
            } else if(this.rangeAttackTiming > this.rangeAttackIntervals && this.rangeAttackCount >= 4) {
                this.rangeAttackCount = 0;
                this.previousAttack = 0;
                this.attacking = false;
            }

        }
    }

    ramAttack(TICK) {
        if (this.abilityRamming && (this.x > 1200 || this.x < 0)) {
            this.abilityChargingRammingTimer = 0;
            this.previousAttack = 0;
            this.abilityRamTimer = 0;
            this.abilityRamming = false;
            this.SPEED = this.baseSpeed;
        }
        else if (this.abilityRamming) {
            this.previousAttack += TICK*40;
        }
        else if (this.abilityChargingRammingTimer > 2) {
            this.abilityChargingRamming = false;
            this.abilityChargingRammingTimer = 0;
            this.previousAttack = 0;
            this.abilityRamTimer = 0;
            this.abilityRamming = true;
            this.SPEED = 750;

        } else if ((!this.attacking && this.abilityRamTimer > this.abilityRamCooldown)|| this.abilityChargingRamming) {
            this.previousAttack = 0;
            this.abilityChargingRamming = true;
            this.abilityChargingRammingTimer += TICK;
        } 
    }

    update() {
        if (this.dead) {
            this.removeFromWorld = true;
            this.game.addEntityForeground(new Coin(this.game, this.x, this.y)); 
            
        } else {
            if (PARAMS.PAUSE == false) { 
                const TICK = this.game.clockTick;
                this.previousAttack += TICK;
                this.abilityRamTimer += TICK;
                this.y += 1;
                if (this.x < this.MIDDLE && !this.abilityRamming) {
                    this.facing = this.RIGHT;
                } else if (this.x > this.MIDDLE && !this.abilityRamming){
                    this.facing = this.LEFT;
                }
                if (this.dead) {
                    this.removeFromWorld = true;
                    this.game.addEntityForeground(new Coin(this.game, this.x, this.y-18)); 
                } else {
                    this.horizontalUpdate();
                }
                
                if (this.knockback) {
                    this.knockbackUpdate(TICK);
        
                }
        
                if (this.health <= 0 && !this.knockback) {
                    this.health = 0;
                    this.dead = true;
                    this.coinX = this.x+10;
                }
        
                this.updateBB();
                this.updateAttackBB();
                this.ramAttack(TICK);
        
                this.collisionUpdate(TICK);
                this.rangeAttack(TICK);
            }
        }

    };

    draw(ctx) {
        if(!this.dead) {
            if (this.facing == this.LEFT) {
                 
                if (this.abilityChargingRamming) {
                    this.animation[3].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,4); 
                } 
                else if (this.abilityRamming) {
                    this.animation[2].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y-50,4); 
                }
                else {
                    this.animation[0].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,4);  
                }
                    
    
                 
            } else {
                if (this.abilityChargingRamming) {
                    this.animation[3].drawFrame(this.game.clockTick,ctx,this.x,this.y,4); 
                } 
                else if (this.abilityRamming) {
                    this.animation[2].drawFrame(this.game.clockTick,ctx,this.x-240,this.y-50,4); 
                }
                else {
                    this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,4);
                }
                
                

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

