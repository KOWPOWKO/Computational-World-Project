class Hero {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/hero/defender.png");
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
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

        //basic restrictions
        this.GROUND = 455;
        this.MAX_RUN = 200;
        this.MAX_WALK = 100;
        this.ACCELERATION = 10;
        this.GRAVITY = 400;
        this.MAX_HEALTH = 500;
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
        this.hasBeenAttacked = false;
        this.knockback = false;
        this.knockbackCounter = this.MAX_KNOCKBACK;
        this.previousAttack = 0;
        this.attackSpeed = 1;
        
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
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    }

    collisionUpdate() {
        var that = this;

        this.game.entities[2].forEach(function (entity) {
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
                if ((entity instanceof Mage || entity instanceof Snake) && (entity.dead == false) && (entity.hasBeenAttacked == false)) {
                    if (entity.health > 0) {
                        entity.health -= 25;
                        entity.hasBeenAttacked = true;
                        entity.knockback = true;
                    } 

                }
            }
            if(entity.BB && that.BB.collide(entity.BB)) { //run into enemies
                if ((entity instanceof Mage || entity instanceof Snake) && (entity.dead == false) && (entity.hasBeenAttacked == false)) {
                    if (entity.health > 0) {
                        entity.hasBeenAttacked = true;
                        entity.knockback = true;
                    } 

                }
            }
            if(entity.attackBB && that.BB.collide(entity.attackBB) && entity.previousAttack >= entity.ATTACK_SPEED) { //enemies attacking
                if((entity instanceof Mage || entity instanceof Snake) && (entity.dead == false) && (entity.hasBeenAttacked == false)) {
                    if(that.BLOCK) {
                        that.knockback = true;
                    } else {
                        if (that.health <= 0) {
                            that.health = 0;
                            that.dead = true;
                        } 
                        else if (!that.hasBeenAttacked) {
                            that.hasBeenAttacked = true;
                            that.knockback = true;
                            that.health -= 25
                        }
                        entity.previousAttack = 0;
                    }
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

    update() {
        const TICK = this.game.clockTick;
        this.previousAttack += TICK;
        if (this.dead == false) {
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

            if (this.previousAttack > this.attackSpeed) {
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
            this.XYupdate(TICK);
            this.updateBB();
            this.updateAttackBB();
            this.collisionUpdate();
    
            if(this.health <= 0) {
                this.health = 0;
                this.dead = true;
            }
        } else if (this.dead == true) {
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
                    this.blockAnim.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,1.2);
                } 
                else {
                    this.animations[this.state].drawFrameReverse(this.game.clockTick,ctx,this.x-20,this.y,1.2);
                }
            }
        } else if (this.dead == true) {
            this.deadAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
        }
        

        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            //ctx.strokeRect(this.BB.x + attackX, this.BB.y + 3, this.BB.width + attackWidth, this.BB.height);
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            
            ctx.font = "20px Arial";
            ctx.fillStyle = "red"
            ctx.fillText("Height: " + this.y + "px", 10, 20);

            if(this.ATTACKING == true) {
                ctx.strokeRect(this.attackBB.x, this.attackBB.y, this.attackBB.width, this.attackBB.height);
            }
        }
        ctx.drawImage(this.healthbarred, this.BB.x, this.BB.y - 10, this.BB.width, 5);
        ctx.drawImage(this.healthbar, this.BB.x, this.BB.y - 10, this.BB.width * (this.health / this.MAX_HEALTH), 5);
        //ctx.lineWidth = 6; 
        ctx.fillStyle = "White";
       // ctx.lineWidth = 2;
		ctx.fillText("=", 150, 40);     
        ctx.fillText(PARAMS.SCORE, 170, 40);   
    };
};