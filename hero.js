class Hero {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/hero/defender.png");
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
        this.healthbarblue = ASSET_MANAGER.getAsset("./resources/background/healthblue.png");
        this.loadProperties();
        this.updateBB();
        this.animations = [];
        this.loadAnimation();
    
    };

    
    updateAttackBB() {
        this.lastAttackBB = this.attackBB;
        if(this.facing == this.LEFT) {
            this.attackBB = new BoundingBox(this.x-50, this.y-3, 50, 119);
        } else {
            this.attackBB = new BoundingBox(this.x+75, this.y-3, 50, 119);
        }   
    }



    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y-3, 75, 119);
    }

    loadAnimation() {

        for (var i = 0; i < 5; i++) { // 3 states (0 = IDLE, 1 = WALKING, 2 = RUNNING)
            this.animations.push([]);
        }

        // Idle
        this.animations[0] = new Animator(this.spritesheet,88,1200,80,104,10,0.1,0,false,true);
        // Walking
        this.animations[1] = new Animator(this.spritesheet,88,907,96,104,10,0.1,1.5,true,true);
        // Run
        this.animations[2] = new Animator(this.spritesheet,88,811,104,96,8,0.1,-5.2,true,true);
        // Damaged
        this.knockbackAnim = new Animator(this.spritesheet,84,178,96,120,1,0.15,-1,false,true);
        // Blocking
        this.blockAnim = new Animator(this.spritesheet,631,575,88,104,1,0.15,18,false,true);
        // Attacking
        this.attackAnim = new Animator(this.spritesheet,88,315,128,120,10,0.03,0.5,false,false);
        // Jumping
        this.jumpAnim = new Animator(this.spritesheet,89,1098,96,104,10,0.05,-0.5,false,true);

        // Die
        this.deadAnim= new Animator(this.spritesheet,84,178,144,120,9,0.15,-1,false,false);
        /*
        
        // Damaged
        this.animations[6] = new Animator(this.spritesheet,84,178,96,120,1,0.15,-1,false,true);
        // Jump
        this.jumpAnim = new Animator(this.spritesheet,89,1098,96,104,10,0.15,-0.5,false,true);
        */
    }

    loadProperties() {
        //facing
        this.LEFT = 0;
        this.RIGHT = 1;
        this.MIDDLE = 640;

        //states
        this.IDLE = 0;
        this.WALKING = 1;
        this.RUNNING = 2;
        this.BLOCKING = 4;

        //attackingState
        this.canAttack = true;
        this.ATTACKING = false;
        this.BLOCK = false;

        //jumpingState
        this.JUMPING = true;
        this.HITMAXPEAK = false;

        //special abilities
        this.kSlot = false;
        this.lSlot = false;
        this.kFill;
        this.lFill;
        this.lFillElapsed = 0;
        this.lFillMax = 1;

        //basic restrictions
        this.GROUND = 455;
        this.MAX_RUN = 200;
        this.MAX_WALK = 100;
        this.ACCELERATION = 10;
        this.GRAVITY = 400;
        this.MAX_HEALTH = 500;
        this.MAX_SHIELD = 500;
        this.MAX_KNOCKBACK = 100;
        
        //initial
        this.dead = false;
        this.finishDead = false;
        this.x = 585;
        this.y = this.GROUND - 600;
        this.state = this.IDLE;
        this.facing = this.RIGHT;
        this.velocity = {x: 0,y: 0};
        this.health = this.MAX_HEALTH;
        this.shield = 0;
        this.hasBeenAttacked = false;
        this.knockback = false;
        this.knockbackCounter = this.MAX_KNOCKBACK;
        this.previousAttack = 0;
        this.coolDown = 1;
        this.attackSpeed = 0.5 * this.coolDown;
        this.speedMultiplier = 1;
        this.increaseH = 0;
        this.damage = 25;
       
        
        this.myInventory = new Inventory(this.game);
        this.outsideCastle = false;
    }
    

    horizontalUpdate() { 
        var actionCheck = (this.knockbackCounter == this.MAX_KNOCKBACK && !this.BLOCK);
        if (this.game.left && !this.game.right && actionCheck) {
            this.facing = this.LEFT;
            if (this.game.run ) {
                this.state = this.RUNNING;
                this.game.attack = false;
                if (Math.abs(this.velocity.x) <= this.MAX_RUN) {
                    this.velocity.x -= this.ACCELERATION; 
                } else {
                    this.velocity.x = this.velocity.x = (this.MAX_RUN) * (-1);
                }
            } else {
                this.state = this.WALKING;
                if (Math.abs(this.velocity.x) <= this.MAX_WALK) {
                    this.velocity.x -= this.ACCELERATION; 
                } else {
                    this.velocity.x = (this.MAX_WALK) * (-1);
                }
            }
 
           
        } else if (this.game.right && !this.game.left && actionCheck) {
            this.facing = this.RIGHT;
            if (this.game.run) {
                this.state = this.RUNNING;
                this.game.attack = false;
                if (Math.abs(this.velocity.x) <= this.MAX_RUN) {
                    this.velocity.x += this.ACCELERATION; 
                } else {
                    this.velocity.x = this.velocity.x = (this.MAX_RUN);
                }
            } else {
                this.state = this.WALKING;
                if (Math.abs(this.velocity.x) <= this.MAX_WALK) {
                    this.velocity.x += this.ACCELERATION; 
                } else {
                    this.velocity.x = this.MAX_WALK;
                }
            }
        } 
        else {
            this.velocity.x = 0;
            this.state = this.IDLE;
        }  
    } 

    noJumpUpdate() {
       // if (!this.game.down) {
            this.horizontalUpdate();
            if (this.game.up && (this.knockbackCounter == this.MAX_KNOCKBACK && !this.BLOCK)) {
                this.JUMPING = true;
                this.jumpAnim.elapsedTime = 0;
                
            } 
      //  }
        //else if (this.game.down && !this.game.up) {
        //    this.dead = true;
        //}
    }

    jumpUpdate() {
        this.horizontalUpdate();
        if (!this.HITMAXPEAK) {
            this.velocity.y -= 50;
            if (Math.abs(this.velocity.y) >= 1000) {
                this.HITMAXPEAK = true;
            } 
            if (this.y <= 220) {
                this.velocity.y = 0;
                this.HITMAXPEAK = true;
            }
        } else {
            if (this.velocity.y <= 0) {
                this.velocity.y += 21;
            } else this.velocity.y += 20;
            
        }
    }

    noAttackUpdate() {
        if(this.game.attack) {
            ASSET_MANAGER.playAsset("./resources/sound/swordAttack.wav");
            this.attackAnim.elapsedTime = 0;
            this.ATTACKING = true;
            this.game.attack = false;
            this.canAttack = false;
        }

    }

    attackUpdate() {
        if (this.attackAnim.isDone()) {
            this.ATTACKING = false;
            
            this.attackAnim.elapsedTime = 0;
            this.previousAttack = 0; 
        }
    }
    blockUpdate() {
        if(this.game.down) {
            this.BLOCK = true;
        } 
        else {
            this.BLOCK = false;
        }
    }

    XYupdate(TICK) {
        this.x += this.velocity.x * this.speedMultiplier * TICK;
        this.y += this.velocity.y * this.speedMultiplier * TICK;
    }


    collisionUpdate() {
        var that = this;


        this.game.entities[3].forEach(function (entity) {
            if(entity instanceof ArrowShooterInvetory) {
                if (that.kSlot == false) {
                    that.kFill = entity;
                    that.kSlot = true;                    
                }
                else if (that.lSlot == false) {
                    that.lFill = entity;
                    at.lSlot = true;
                }
                entity.removeFromWorld = true;
            }
            if(entity instanceof AirSlashInvetory) {
                if (that.lSlot == false) {
                    that.lFill = entity;
                    that.lSlot = true;   
                   // entity.removeFromWorld = true;
                 }
                 entity.removeFromWorld = true;
            }
            if(entity instanceof LazerInvetory) {
                entity.removeFromWorld = true;
                if (that.lSlot == false) {
                    that.lFill = entity;
                    that.lSlot = true;                    
                //entity.removeFromWorld = true;
                }
                entity.removeFromWorld = true;
            }
            if(entity instanceof SonicWaveInvetory) {
                if (that.lSlot == false) {
                    that.lFill = entity;
                    that.lSlot = true;                    
                //entity.removeFromWorld = true;
                }
                entity.removeFromWorld = true;
            }
            if(entity instanceof CoolDown && entity.removeFromWorld == false) {
                if (that.coolDown > 0.3) {
                    that.coolDown -= 0.2;
                }
                entity.removeFromWorld = true;
            }
            if(entity instanceof HealthPotion) {
                //entity.startTimer = true;
                if(that.health < that.MAX_HEALTH) that.health += 50;
                if(that.health > that.MAX_HEALTH) that.health = that.MAX_HEALTH;

                entity.removeFromWorld = true;
            } 
            if(entity instanceof HealthIncrease) {
                //entity.startTimer = true;
                that.increaseH += 10;
                that.MAX_HEALTH = that.MAX_HEALTH + that.increaseH;
                if(that.health < that.MAX_HEALTH) that.health = that.MAX_HEALTH;

                entity.removeFromWorld = true;
            } 
            if(entity instanceof DamageIncrease) {
                that.damage += 10;

                entity.removeFromWorld = true;
            } 
            if(entity instanceof SpeedSkill && entity.removeFromWorld == false) {
                //entity.startTimer = true;
                if (that.speedMultiplier < 5) {
                    that.speedMultiplier += 1;
                }
                entity.removeFromWorld = true;
            } 
            if(entity instanceof Shield) {
                that.shield = that.MAX_SHIELD;
                entity.removeFromWorld = true;
            } 
        })

        this.game.entities[2].forEach(function (entity) {
            if (entity instanceof CastleBounds) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    that.outsideCastle = false;
                } else {
                    that.outsideCastle = true;
                }
            }

            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Ground && that.lastBB.bottom >= entity.BB.top ) { //ground logic
                    that.y = entity.BB.top - that.BB.height;
                    that.velocity.y = 0;
                    that.GRAVITY = 0;
                    that.JUMPING = false;
                    that.HITMAXPEAK = false;
                    that.game.up = false;
                }             
            }
        })

        this.game.entities[1].forEach(function (entity) {
            if (!that.ATTACKING) {
                entity.hasBeenAttacked = false;
            }
            if(entity.BB && that.attackBB.collide(entity.BB) && that.ATTACKING) { //attacking enemies
                if ((entity instanceof Mage || entity instanceof Snake || entity instanceof Ogre || entity instanceof Skeleton || entity instanceof DragonBoss) && (entity.dead == false) && (entity.hasBeenAttacked == false)) {
                    if (entity.health > 0) {
                        entity.health -= that.damage;
                        entity.hasBeenAttacked = true;
                        if(!(entity instanceof DragonBoss))
                            entity.knockback = true;
                        //playSound("bruh.mp3");
                        ASSET_MANAGER.playAsset("./resources/sound/enemyHurt.mp3");
                    } 

                }
            }
            if(entity.BB && that.BB.collide(entity.BB)) { //run into enemies
                if (entity instanceof SmallFireBall||entity instanceof FireBall) {
                    if (that.health <= 0) {
                        that.health = 0;
                        that.dead = true;
                    } 
                    if (that.BLOCK == false && PARAMS.INVINCIBILITY == false) {
                        ASSET_MANAGER.playAsset("./resources/sound/playerHurt.mp3");
                        if (that.shield > 0) {
                            that.shield -= entity instanceof SmallFireBall ? 10 : 20;
                        } else if (that.shield <= 0){
                            that.shield = 0;
                            that.health -= entity instanceof SmallFireBall ? 10 : 20;
                        }
                        that.knockback = entity instanceof FireBall;
                    } else if (that.BLOCK == true) {
                        ASSET_MANAGER.playAsset("./resources/sound/shieldBlock.wav");
                    }
                    
                    entity.removeFromWorld = true;
                }

                if ((entity instanceof Mage || entity instanceof Snake || entity instanceof Ogre) && (entity.dead == false) && (entity.hasBeenAttacked == false)) {
                    if (entity.health > 0) {
                        entity.hasBeenAttacked = true;
                        entity.knockback = true;
                    } 

                } else if (entity instanceof Skeleton || entity instanceof DragonBoss && (entity.dead == false) && (entity.hasBeenAttacked == false)) {
                    if (entity.health > 0) {
                        that.knockback = true;
                    } 
                }
            }
            if(entity.attackBB && that.BB.collide(entity.attackBB) && entity.previousAttack >= entity.ATTACK_SPEED) { //enemies attacking
                if((entity instanceof Mage || entity instanceof Snake || entity instanceof Ogre || entity instanceof Skeleton || entity instanceof DragonBoss) && (entity.dead == false) && (entity.hasBeenAttacked == false)) {
                    if(that.BLOCK) {
                        ASSET_MANAGER.playAsset("./resources/sound/shieldBlock.wav");
                        that.knockback = true;
                    } else {
                        if (that.health <= 0) {
                            that.health = 0;
                            that.dead = true;
                        } 
                        else if (!that.hasBeenAttacked) {
                            ASSET_MANAGER.playAsset("./resources/sound/playerHurt.mp3");
                            that.hasBeenAttacked = true;
                            that.knockback = true;

                            if (that.shield > 0 && PARAMS.INVINCIBILITY == false) {
                                that.shield -= 25;
                            } else if (that.shield <= 0 && PARAMS.INVINCIBILITY == false){
                                that.shield = 0;
                                that.health -= 25;
                            }
                        }
                        
                    }
                    entity.previousAttack = 0;
                }
                
            }
        })

        this.game.entities[0].forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) {
            if ((entity instanceof Coin) && (entity.hasBeenCollected == false)) {
                    entity.hasBeenCollected = true;
                    PARAMS.SCORE += 1;
                }
            }
        })
        
    }

    specialUpdate() {
        if (this.game.specialK) {
            if (this.outsideCastle == true) {
                if (this.kSlot == true) {
                    if (this.kFill instanceof ArrowShooterInvetory) {
                        this.game.addEntityForeground(new ArrowShooter(this.game,this.x,this.y,this.facing));

                    }
                    this.kSlot = false;
                }
            }
        }
        if (this.game.specialL) {
            if (this.lSlot == true) {
                if (this.lFill instanceof ArrowShooterInvetory) {
                    this.game.addEntityForeground(new ArrowShooter(this.game,this.x,this.y,this.facing));
                    this.lSlot = false;
                }
                else if (this.lFill instanceof AirSlashInvetory) {
                    this.lFillMax = 1;
                    this.game.specialL = false;
                    if (this.lFillElapsed >= this.lFillMax) {
                        this.lFill.canShoot = true;
                    }
                    if (this.lFill.canShoot == true) {
                        this.game.addEntityForeground(new AirSlash(this.game,this.x,this.y,this.facing));
                        this.lFill.canShoot = false;
                        this.lFillElapsed = 0;
                    }
                }
                else if (this.lFill instanceof LazerInvetory) {
                    this.lFillMax = 3;
                    this.game.specialL = false;
                    if (this.lFillElapsed >= this.lFillMax) {
                        this.lFill.canShoot = true;
                    }
                    if (this.lFill.canShoot == true) {
                        this.game.addEntityForeground(new Lazer(this.game,this.x,this.y,this.facing));
                        this.lFill.canShoot = false;
                        this.lFillElapsed = 0;
                    }
                }
                else if (this.lFill instanceof SonicWaveInvetory) {
                    this.lFillMax = 3;
                    this.game.specialL = false;
                    if (this.lFillElapsed >= this.lFillMax) {
                        this.lFill.canShoot = true;
                    }
                    if (this.lFill.canShoot == true) {
                        this.game.addEntityForeground(new SonicWave(this.game,this.x,this.y,this.facing));
                        this.lFill.canShoot = false;
                        this.lFillElapsed = 0;
                    }
                    
                } 
            }
        }
        // if (this.game.specialL) {
        //     this.game.addEntityForeground(new AirSlash(this.game,this.x,this.y,this.facing));
        // }
    }

    checkInventoryFull() {
        if (this.lSlot == true && this.kSlot == true) {
            PARAMS.INV_FULL = true;
        } else {
            PARAMS.INV_FULL = false;
        }
    }

    update() {
        
        const TICK = this.game.clockTick;
        this.previousAttack += TICK;
        this.lFillElapsed += TICK;
        
       
        
        

        if (this.dead == false && PARAMS.PAUSE == false) {
            PARAMS.TIME += this.game.clockTick;
            this.blockUpdate(); 
            if(this.y <= this.GROUND || this.JUMPING) {
                this.velocity.y += 20;
            } else {
                this.velocity.y = 0;
                this.y = this.GROUND;
            }
            if(this.knockback) {
                this.JUMPING = false;
                this.knockbackUpdate();
            }

            
            if (this.previousAttack > (this.attackSpeed * this.coolDown)) {
                this.canAttack = true;
                
            } else {
                this.game.attack = false;
            }

            
            if(!this.ATTACKING && (this.state != this.RUNNING) && (this.canAttack == true)) {                    
                this.noAttackUpdate(); 
            }
            else if (this.ATTACKING) {
                this.attackUpdate();    
                this.previousAttack = 0;
            }
    
            if (!this.JUMPING) {
                this.noJumpUpdate();
            } 
            else if (this.JUMPING) {
                this.jumpUpdate();
            }
            this.specialUpdate();
            this.XYupdate(TICK);
            this.updateBB();
            this.updateAttackBB();
            this.collisionUpdate();
            this.checkInventoryFull();
    
            if(this.health <= 0) {
                this.health = 0;
                this.dead = true;
            }
        } else if (this.dead == true) {
            ASSET_MANAGER.playAsset("./resources/sound/game-lose-2.mp3");
            if(this.deadAnim.isDone()) {
                this.finishDead = true;
            }
        }

        
    }

    knockbackUpdate() {
        if(this.knockbackCounter > 0) {
            if(this.x >= this.MIDDLE) {
                this.x -= (this.knockbackCounter/2)/8;
                this.y -= (this.knockbackCounter/2)/8;
            }
            else if (this.x <= this.MIDDLE) {
                this.x +=(this.knockbackCounter/2)/8;;
                this.y -=(this.knockbackCounter/2)/8;;
            }
            this.knockbackCounter -=5;
        }
        else if (this.knockbackCounter <= 0) {
            this.knockbackCounter = this.MAX_KNOCKBACK;
            this.knockback = false;
            this.hasBeenAttacked = false;
        }
    }

    draw(ctx) {
        
        if (this.dead == false) {
            if (this.facing == this.LEFT) {
                if (this.JUMPING == true && this.ATTACKING == false) {
                    this.jumpAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
                } 
                else if (this.ATTACKING == true) {
                    this.attackAnim.drawFrame(this.game.clockTick,ctx,this.x - 48,this.y - 25,1.2);     
                } 
                else if (this.knockback) {
                    this.knockbackAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y-20,1.2);
                } 
                else if (this.BLOCK) {
                    this.blockAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
                }            
                else {
                    if (this.state == this.WALKING) {
                        this.animations[this.state].drawFrame(this.game.clockTick,ctx,this.x-20,this.y,1.2);
                    } 
                    else if (this.state == this.RUNNING) {
                        this.animations[this.state].drawFrame(this.game.clockTick,ctx,this.x-30,this.y,1.2);
                    } 
                    else {
                        this.animations[this.state].drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
                    }
                    
                }
            } 
            else if (this.facing == this.RIGHT){
                if (this.JUMPING == true && this.ATTACKING == false) {
                    this.jumpAnim.drawFrameReverse(this.game.clockTick,ctx,this.x-28,this.y,1.2);
                } 
                else if (this.ATTACKING == true) {
                    this.attackAnim.drawFrameReverse(this.game.clockTick,ctx,this.x-30,this.y - 25,1.2); 
                } 
                else if (this.knockback) {
                    this.knockbackAnim.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y-20,1.2);
                }
                else if (this.BLOCK) {
                    this.blockAnim.drawFrameReverse(this.game.clockTick,ctx,this.x-30,this.y,1.2);
                } 
                else if (this.state == this.RUNNING) {
                    this.animations[this.state].drawFrameReverse(this.game.clockTick,ctx,this.x-30,this.y,1.2);
                } 
                else {
                    this.animations[this.state].drawFrameReverse(this.game.clockTick,ctx,this.x-20,this.y,1.2);
                }
            }
        } else if (this.dead == true) {
            this.deadAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
            
        }

        if (this.kSlot == true) {
            this.kSlotSheet = this.kFill.spritesheet;
            this.kSlotAnimation = this.kFill.animation;
            this.kSlotAnimation.drawFrame(this.game.clockTick,ctx,this.myInventory.BB.x,this.myInventory.BB.y,0.5);
        } 
        
        if (this.lSlot == true) {
            this.lSlotSheet = this.lFill.spritesheet;
            this.lSlotAnimation = this.lFill.animation;
            this.lSlotAnimation.drawFrame(this.game.clockTick,ctx,this.myInventory.BB2.x,this.myInventory.BB2.y,0.5);
        }
        

        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            //ctx.strokeRect(this.BB.x + attackX, this.BB.y + 3, this.BB.width + attackWidth, this.BB.height);
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

            if(this.ATTACKING == true) {
                ctx.strokeRect(this.attackBB.x, this.attackBB.y, this.attackBB.width, this.attackBB.height);
            }
        }
        ctx.drawImage(this.healthbarred, this.BB.x, this.BB.y - 10, this.BB.width+this.increaseH, 5);
        ctx.drawImage(this.healthbar, this.BB.x, this.BB.y - 10, this.BB.width * (this.health / this.MAX_HEALTH)+this.increaseH, 5);
        ctx.drawImage(this.healthbarblue, this.BB.x, this.BB.y - 3, this.BB.width * (this.shield/ this.MAX_SHIELD), 5);
        //ctx.lineWidth = 6; 
        ctx.fillStyle = "White";
        ctx.fillText("Skill Point = " + PARAMS.SKILL_POINTS, 25, 30);     
        ctx.fillText("Coins = " +PARAMS.SCORE, 25, 50);  
        ctx.fillText("Time: " + Math.round(PARAMS.TIME), 25, 70); 

        ctx.fillStyle = "Green";
        ctx.fillText("PLAYER STATS" , 25, 90);
        ctx.fillText("*Cooldown: " + this.coolDown, 25, 110);
        ctx.fillText("*Speed: " + this.speedMultiplier, 25, 130);
        ctx.fillText("*Max Health: " + this.MAX_HEALTH, 25, 150);
        ctx.fillText("*Damage: " + this.damage, 25, 170);
        //ctx.fillText("*: " + PARAMS.INV_FULL, 25, 190);


        ctx.fillStyle = "Black";
        ctx.fillText("Round", 1164, 70);   
        ctx.fillText(PARAMS.ROUND + "/" + PARAMS.TOTAL, 1175, 90);  
         
    };
};


//////////////////////////////////////////////////////////////////

