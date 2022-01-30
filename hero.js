class Hero {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/defender.png");

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
        this.animations[2] = new Animator(this.spritesheet,88,811,104,96,10,0.1,-5.2,true,true);
        // Attacking
        this.attackAnim = new Animator(this.spritesheet,88,315,128,120,10,0.03,0.5,false,false);
        // Jumping
        this.jumpAnim = new Animator(this.spritesheet,89,1098,96,104,10,0.05,-0.5,false,true);
        /*
        // Blocking
        this.animations[4] = new Animator(this.spritesheet,631,575,88,104,1,0.15,18,false,true);
        // Die
        this.animations[5] = new Animator(this.spritesheet,84,178,144,120,9,0.15,-1,false,true);
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

        //states
        this.IDLE = 0;
        this.WALKING = 1;
        this.RUNNING = 2;
        this.BLOCKING = 4;

        //attackingState
        this.ATTACKING = false;

        //jumpingState
        this.JUMPING = false;
        this.HITMAXPEAK = false;

        //basic restrictions
        this.GROUND = 452;
        this.MAX_RUN = 600;
        this.MAX_WALK = 200;
        this.ACCELERATION = 20;
        this.GRAVITY = 400;

        //initial
        this.dead = false;
        this.x = 585;
        this.y = this.GROUND - 600;
        this.state = this.IDLE;
        this.facing = this.RIGHT;
        this.velocity = {x: 0,y: 0};
    }

    horizontalUpdate() { //Updates left and right movement
        if (this.game.left && !this.game.right) {
            this.facing = this.LEFT;
            if (this.game.run) {
                this.state = this.RUNNING;
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
 
           
        } else if (this.game.right && !this.game.left) {
            this.facing = this.RIGHT;
            if (this.game.run) {
                this.state = this.RUNNING;
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
        //else if (this.game.down) {
        //    this.dead = true;
        //} 
        else {
            this.velocity.x = 0;
            this.state = this.IDLE;
        }  
    } 

    noJumpUpdate() {
       // if (!this.game.down) {
            this.horizontalUpdate();
            if (this.game.up) {
                this.velocity.y -= this.GRAVITY;
                this.JUMPING = true;
                this.jumpAnim.elapsedTime = 0;
                this.game.up = false;
            } 
      //  }
        //else if (this.game.down && !this.game.up) {
        //    this.dead = true;
        //}
    }

    jumpUpdate() {
        this.horizontalUpdate();
        if (!this.HITMAXPEAK) {
            this.velocity.y -= 100;
            if (Math.abs(this.velocity.y) >= 2750) {
                this.velocity.y = 0;
                this.HITMAXPEAK = true;
            }
        } else {
            if (this.y >= this.GROUND) {
                this.velocity.y = 0;
                this.y = this.GROUND;
                this.JUMPING = false;
                this.HITMAXPEAK = false;
            } else this.velocity.y += 10;
        }
    }

    noAttackUpdate() {
        if(this.game.attack) {
            this.attackAnim.elapsedTime = 0;
            this.ATTACKING = true;
            this.game.attack = false;
        }

    }

    attackUpdate() {
        if (this.attackAnim.isDone()) {
            this.ATTACKING = false;
            this.attackAnim.elapsedTime = 0;
        }
    }

    XYupdate(TICK) {
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    }

    gravityUpdate(TICK) {
        if (this.y < this.GROUND) {
            this.y += this.GRAVITY * TICK;
        } 
    }

    update() {
        const TICK = this.game.clockTick;
        this.gravityUpdate(TICK);

        if(!this.ATTACKING) {
            this.noAttackUpdate();
        } else if (this.ATTACKING) {
            this.attackUpdate();
            
        }

        if (!this.JUMPING) {
            this.noJumpUpdate();
        } else if (this.JUMPING) {
            this.jumpUpdate();
        }
        this.XYupdate(TICK); 
        this.updateBB();
        this.updateAttackBB();
  

        var that = this;
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.attackBB.collide(entity.BB) && that.ATTACKING) {
                if ((entity instanceof Mage) && !entity.dead) {
                    entity.dead = true;
                }
            }
        })
    }

    draw(ctx) {
        if (this.facing == this.LEFT) {
            if (this.JUMPING == true && this.ATTACKING == false) {
                this.jumpAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
            } else if (this.ATTACKING == true) {
                this.attackAnim.drawFrame(this.game.clockTick,ctx,this.x - 48,this.y - 25,1.2); 
            } else {
                this.animations[this.state].drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
            }
        } else if (this.facing == this.RIGHT){
            if (this.JUMPING == true && this.ATTACKING == false) {
                this.jumpAnim.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,1.2);
            } else if (this.ATTACKING == true) {
                this.attackAnim.drawFrameReverse(this.game.clockTick,ctx,this.x + 1 ,this.y - 25,1.2); 
            } else {
                this.animations[this.state].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,1.2);
            }
        }
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            //ctx.strokeRect(this.BB.x + attackX, this.BB.y + 3, this.BB.width + attackWidth, this.BB.height);
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

            if(this.ATTACKING == true) {
                ctx.strokeRect(this.attackBB.x, this.attackBB.y, this.attackBB.width, this.attackBB.height);
            }
        }
    };
};








class Character_2 {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/character2.png");

        this.loadProperties();
        this.animations = [];
        this.loadAnimation();
    };

    loadAnimation() {

        for (var i = 0; i < 5; i++) { // 3 states (0 = IDLE, 1 = WALKING, 2 = RUNNING)
            this.animations.push([]);
        }

        // Idle
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 180, 128, 1,0.1,0,false,true);
        // Walking
        this.animations[1] = new Animator(this.spritesheet,0, 0, 180, 128, 2,0.1,1.5,true,true);
        // Run
        this.animations[2] = new Animator(this.spritesheet,0, 0, 180, 128, 2,0.1,1.5,true,true);
        // Attacking
        this.attackAnim = new Animator(this.spritesheet,600, 0, 170, 128, 3,0.1,0.5,false,false);
        // Jumping
        this.jumpAnim = new Animator(this.spritesheet, 1230, 0, 178, 128,3,0.2,-0.5,false,true);
        /*
        // Blocking
        this.animations[4] = new Animator(this.spritesheet,631,575,88,104,1,0.15,18,false,true);
        // Die
        this.animations[5] = new Animator(this.spritesheet,1220,720,166,48,3,0.2, 1,false,true);
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

       //states
        this.IDLE = 0;
        this.WALKING = 1;
        this.RUNNING = 2;
        this.BLOCKING = 4;

        //attackingState
        this.ATTACKING = false;

        //jumpingState
        this.JUMPING = false;
        this.HITMAXPEAK = false;

        //basic restrictions
        this.GROUND = 420;
        this.MAX_RUN = 600;
        this.MAX_WALK = 200;
        this.ACCELERATION = 20;
        this.GRAVITY = 300;

        //initial
        this.dead = false;
        this.x = 585;
        this.y = this.GROUND - 600;
        this.state = this.IDLE;
        this.facing = this.RIGHT;
        this.velocity = {x: 0,y: 0};
    }

    horizontalUpdate() { //Updates left and right movement
        if (this.game.left && !this.game.right) {
            this.facing = this.LEFT;
            if (this.game.run) {
                this.state = this.RUNNING;
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
 
           
        } else if (this.game.right && !this.game.left) {
            this.facing = this.RIGHT;
            if (this.game.run) {
                this.state = this.RUNNING;
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
        //else if (this.game.down) {
        //    this.dead = true;
        //} 
        else {
            this.velocity.x = 0;
            this.state = this.IDLE;
        }  
    } 

    noJumpUpdate() {
       // if (!this.game.down) {
            this.horizontalUpdate();
            if (this.game.up) {
                this.velocity.y -= this.GRAVITY;
                this.JUMPING = true;
                this.jumpAnim.elapsedTime = 0;
                this.game.up = false;
            } 
      //  }
        //else if (this.game.down && !this.game.up) {
        //    this.dead = true;
        //}
    }

    jumpUpdate() {
        this.horizontalUpdate();
        if (!this.HITMAXPEAK) {
            this.velocity.y -= 100;
            if (Math.abs(this.velocity.y) >= 2750) {
                this.velocity.y = 0;
                this.HITMAXPEAK = true;
            }
        } else {
            if (this.y >= this.GROUND) {
                this.velocity.y = 0;
                this.y = this.GROUND;
                this.JUMPING = false;
                this.HITMAXPEAK = false;
            } else this.velocity.y += 10;
        }
    }

    noAttackUpdate() {
        if(this.game.attack) {
            this.attackAnim.elapsedTime = 0;
            this.ATTACKING = true;
            this.game.attack = false;
        }

    }

    attackUpdate() {
        if (this.attackAnim.isDone()) {
            this.ATTACKING = false;
            this.attackAnim.elapsedTime = 0;
        }
    }

    XYupdate(TICK) {
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    }

    gravityUpdate(TICK) {
        if (this.y < this.GROUND) {
            this.y += this.GRAVITY * TICK;
        } 
    }

    update() {
        const TICK = this.game.clockTick;
        this.gravityUpdate(TICK);

        if(!this.ATTACKING) {
            this.noAttackUpdate();
        } else if (this.ATTACKING) {
            this.attackUpdate();
        }

        if (!this.JUMPING) {
            this.noJumpUpdate();
        } else if (this.JUMPING) {
            this.jumpUpdate();
        }
        this.XYupdate(TICK); 
    }

    draw(ctx) {
        /*
        this.animations[0].drawFrameReverse(this.game.clockTick,ctx,0,0,1);
        this.animations[1].drawFrameReverse(this.game.clockTick,ctx,0,128*2,1);
        this.animations[6].drawFrameReverse(this.game.clockTick,ctx,128,128*5,1);
        this.animations[2].drawFrameReverse(this.game.clockTick,ctx,0,128,1);

        this.animations[3].drawFrameReverse(this.game.clockTick,ctx,0,128*3,1);
        this.animations[4].drawFrameReverse(this.game.clockTick,ctx,0,128*4,1);
        this.animations[5].drawFrameReverse(this.game.clockTick,ctx,0,128*5,1);
        this.animations[7].drawFrameReverse(this.game.clockTick,ctx,0,128*5,1);

        
        if (this.state == this.ATTACKING) {
            this.animations[this.ATTACKING].drawFrame(this.game.clockTick,ctx,this.x - 40,this.y - 35,1.5); 

        } else {
            this.animations[this.state].drawFrame(this.game.clockTick,ctx,this.x,this.y,1.5); 
        }
        */
        // if (this.facing == this.LEFT) {
        //     if (this.JUMPING == true && this.ATTACKING == false) {
        //         this.jumpAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
        //     } else if (this.ATTACKING == true) {
        //         this.attackAnim.drawFrame(this.game.clockTick,ctx,this.x - 48,this.y - 25,1.2); 
        //     } else {
        //         this.animations[this.state].drawFrame(this.game.clockTick,ctx,this.x,this.y,1.2);
        //     }
        // } else if (this.facing == this.RIGHT){
        //     if (this.JUMPING == true && this.ATTACKING == false) {
        //         this.jumpAnim.drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,1.2);
        //     } else if (this.ATTACKING == true) {
        //         this.attackAnim.drawFrameReverse(this.game.clockTick,ctx,this.x + 1 ,this.y - 25,1.2); 
        //     } else {
        //         this.animations[this.state].drawFrameReverse(this.game.clockTick,ctx,this.x,this.y,1.2);
        //     }
            
        // }

    };
};