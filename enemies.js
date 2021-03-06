
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
                this.x -= this.SPEED * PARAMS.SLOW * this.game.clockTick;

        } else if (this.facing == this.RIGHT && !this.knockback) {
                this.x += this.SPEED * PARAMS.SLOW * this.game.clockTick;
        }
    }
    playRandom() {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        var songNumber = getRandomInt(2);
        
        if (songNumber == 0) {
            ASSET_MANAGER.playAsset("./resources/sound/castleHurt.mp3");
            
        }
        if (songNumber == 1) {
            ASSET_MANAGER.playAsset("./resources/sound/bruh.mp3");
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
                    if (entity.shield > 0) {
                        entity.shield -= 10;
                    } else if (entity.shield <= 0){
                        entity.shield = 0;
                        entity.health -= 10;
                    }
                    that.previousAttack = 0;
                    that.playRandom();
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
            if (PARAMS.PAUSE == false) {
                this.horizontalUpdate();
            }
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
        function playSound(soundfile){
            document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
        }
        
        if(this.dead){// Your condition
            ASSET_MANAGER.playAsset("./resources/sound/collectCoin.mp3");
            ASSET_MANAGER.playAsset("./resources/sound/enemyDieThree.mp3");
        }
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
        this.animation = [];
        this.loadProperties();
        this.loadAnimation();
        this.updateBB();
        
        
        this.elapsed = 0;
        

    };
    
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + 3, this.animation[0].width*this.scale, this.animation[0].height*this.scale);
        if(this.facing == this.RIGHT) {
            this.rangeBB = new BoundingBox(this.x+this.animation[0].width*this.scale, this.y, this.stopRange, this.animation[0].width*this.scale);
        } else {
            this.rangeBB = new BoundingBox((this.x-this.stopRange), this.y, this.stopRange, this.animation[0].width*this.scale);
        }
        
    }

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 35;
        this.baseSpeed = 35;
        this.GROUND = 507;
        this.y = this.GROUND;
        this.x;
        this.scale = 4;
        //states
        this.attackCoolDown = 3;
        this.dead = false;
        this.MAX_HEALTH = 75;
        this.health = this.MAX_HEALTH;
        this.hasBeenAttacked = false;
        this.knockback = false;
        this.MAX_KNOCKBACK = 50;
        this.knockbackCounter = 0;
        this.stopRange = 100;

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
            this.x -= this.SPEED * PARAMS.SLOW * this.game.clockTick;

        } else if (this.facing == this.RIGHT && !this.knockback) {
                this.x += this.SPEED * PARAMS.SLOW * this.game.clockTick;
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
            if(entity.BB && that.rangeBB.collide(entity.BB)) {
                if (entity instanceof CastleBounds || entity instanceof Hero) {
                    that.SPEED = 0;
                } else if (!(entity instanceof Coin)) {
                    that.SPEED = that.baseSpeed;
                }
            }
            
        });

        this.game.entities[0].forEach(function (entity) {
            if(entity.BB && that.rangeBB.collide(entity.BB)) {
                if (entity instanceof Hero) {
                    that.SPEED = 0;
                } else if (!(entity instanceof Coin)) {
                    that.SPEED = that.baseSpeed;
                }
            }
            
        });

    }

    update() {     
        const TICK = this.game.clockTick;
        this.y += 1;
        if (this.dead) {
            this.removeFromWorld = true;
            this.game.addEntityForeground(new Coin(this.game, this.x, this.y)); 
            
        } else {
            if (PARAMS.PAUSE == false) {
                this.horizontalUpdate();

                if (this.timeElapsed < this.attackCoolDown) {
                    this.timeElapsed += TICK;
                } else {
                    this.timeElapsed = 0;
                    this.state = this.ATTACKING;
                    this.game.addEntityEnemies(new SmallFireBall(this.game,this.x,this.y,this.facing));
     
                    ASSET_MANAGER.playAsset("./resources/sound/fireballSound.wav");
                }
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
        function playSound(soundfile){
            document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
        }

        if(this.dead){// Your condition
            ASSET_MANAGER.playAsset("./resources/sound/collectCoin.mp3");
            ASSET_MANAGER.playAsset("./resources/sound/enemyDieThree.mp3");
        }
    };

    draw(ctx) {

        if(!this.dead) {
            if (this.facing == this.LEFT) {
                this.animation[0].drawFrameY(this.game.clockTick,ctx,this.x,this.y,this.scale); 
            } else {
                this.animation[0].drawFrameReverseY(this.game.clockTick,ctx,this.x,this.y,this.scale);  
            }

            if (PARAMS.DEBUG) { 
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
                ctx.strokeRect(this.rangeBB.x, this.rangeBB.y, this.rangeBB.width, this.rangeBB.height);
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
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
        this.coin = ASSET_MANAGER.getAsset("./resources/powerUps/coin.png");
        this.animation = [];

        this.loadProperties();
        this.loadAnimation();
        this.updateBB();
        this.updateAttackBB();
    };

    updateAttackBB() {
        this.lastAttackBB = this.attackBB;
        if(this.facing == this.LEFT) {
            this.attackBB = new BoundingBox(this.BB.x-20, this.BB.y, 20, this.BB.height);
        } else {
            this.attackBB = new BoundingBox(this.BB.x+this.BB.width, this.BB.y, 20, this.BB.height);
        }   
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+5, this.y, (this.animation[0].width*4)-10, (this.animation[0].height*4));
    }

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.baseSpeed = 25;
        this.SPEED = 25;
        this.GROUND = 480;
        this.ATTACK_SPEED = 1;
        this.y = this.GROUND;

        //states
        this.dead = false;
        this.MAX_HEALTH = 150;
        this.health = this.MAX_HEALTH;
        this.hasBeenAttacked = false;
        this.knockback = false;
        this.MAX_KNOCKBACK = 50;
        this.knockbackCounter = 0;
        this.previousAttack = 0;
        this.baseSpeed = 25;
    }
    

    loadAnimation() {
        // Walk
        this.animation[0] = new Animator(this.spritesheet, 4, 9, 20, 18, 10, 0.25,0.25,false,true);
    }

    horizontalUpdate() {
        if (this.facing == this.LEFT && !this.knockback) {
            this.x -= this.SPEED * PARAMS.SLOW * this.game.clockTick;

        } else if (this.facing == this.RIGHT && !this.knockback) {
                this.x += this.SPEED * PARAMS.SLOW * this.game.clockTick;
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
                } else if (!(entity instanceof Coin)) {
                    that.SPEED = that.baseSpeed;
                }
            } 
            if(entity.BB && that.attackBB.collide(entity.BB) && that.previousAttack >= that.ATTACK_SPEED) {
                if (entity instanceof CastleBounds) {
                    that.SPEED = 0;
                    
                    if (entity.shield > 0) {
                        entity.shield -= 10;
                    } else if (entity.shield <= 0){
                        entity.shield = 0;
                        entity.health -= 10;
                    }
                    that.previousAttack = 0;
                }else {
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

    update() {
        const TICK = this.game.clockTick;
        this.y += 1;
        if (this.dead) {
            this.removeFromWorld = true;
            this.game.addEntityForeground(new Coin(this.game, this.x, this.y-18)); 
        } else {
            if (PARAMS.PAUSE == false) {
                this.horizontalUpdate();
            }
            
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

        function playSound(soundfile){
            document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
        }

        if(this.dead){// Your condition
            ASSET_MANAGER.playAsset("./resources/sound/collectCoin.mp3");
            ASSET_MANAGER.playAsset("./resources/sound/enemyDieThree.mp3");
        }
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
            ctx.drawImage(this.healthbar, this.BB.x, this.y-7, this.BB.width * (this.health / this.MAX_HEALTH), 5);
        }
    };
};

class Skeleton {
	constructor(game,x,facing) {
        Object.assign(this,{game,x,facing});
		this.spritesheet = ASSET_MANAGER.getAsset("./resources/enemies/skeleton.png");
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
        this.coin = ASSET_MANAGER.getAsset("./resources/powerUps/coin.png");
        this.animation = [];

        this.loadProperties();
        this.loadAnimation();
        this.updateBB();
        this.updateAttackBB();
    };

    updateAttackBB() {
        this.lastAttackBB = this.attackBB;
        if(this.facing == this.LEFT) {
            this.attackBB = new BoundingBox(this.BB.x-this.atttackRange, this.BB.y, this.atttackRange, this.BB.height);
        } else {
            this.attackBB = new BoundingBox(this.BB.x+this.BB.width, this.BB.y, this.atttackRange, this.BB.height);
        }   
    }

    updateBB() {
        this.lastBB = this.BB;
        if(this.facing == this.LEFT) {
            this.BB = new BoundingBox(this.x+60, this.y, (this.animation[0].width*4)-60, (this.animation[0].height*4));
        } else {
            this.BB = new BoundingBox(this.x, this.y, (this.animation[0].width*4)-60, (this.animation[0].height*4));
        }   
        
    }

    loadProperties() {
        //facings
        this.LEFT = 0;
        this.RIGHT = 1;

        //restrictions
        this.SPEED = 25;
        this.GROUND = 480;
        this.ATTACK_SPEED = 1;
        this.y = this.GROUND;

        //states
        this.dead = false;
        this.MAX_HEALTH = 175;
        this.health = this.MAX_HEALTH;
        this.hasBeenAttacked = false;
        this.knockback = false;
        this.atttackRange = 30;
        this.MAX_KNOCKBACK = 50;
        this.knockbackCounter = 0;
        this.previousAttack = 0;
        this.baseSpeed = 25;
    }
    

    loadAnimation() {
        // Walk
        this.animation[0] = new Animator(this.spritesheet, 59, 85, 47.5, 70, 8, 0.25,1.1,false,true);
    }

    horizontalUpdate() {
        if (this.facing == this.LEFT && !this.knockback) {
            this.x -= this.SPEED * PARAMS.SLOW * this.game.clockTick;

        } else if (this.facing == this.RIGHT && !this.knockback) {
                this.x += this.SPEED * PARAMS.SLOW * this.game.clockTick;
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
                } else if (!(entity instanceof Coin)) {
                    that.SPEED = that.baseSpeed;
                }
            } 
            if(entity.BB && that.attackBB.collide(entity.BB) && that.previousAttack >= that.ATTACK_SPEED) {
                if (entity instanceof CastleBounds) {
                    if (entity.shield > 0) {
                        entity.shield -= 10;
                    } else if (entity.shield <= 0){
                        entity.shield = 0;
                        entity.health -= 10;
                    }
                    that.previousAttack = 0;
                    that.SPEED = 0;
                } else {
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
            if (PARAMS.PAUSE == false) {
                this.horizontalUpdate();
            }
            
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

        function playSound(soundfile){
            document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
        }

        if(this.dead){// Your condition
            ASSET_MANAGER.playAsset("./resources/sound/collectCoin.mp3");
            ASSET_MANAGER.playAsset("./resources/sound/enemyDieThree.mp3");
        }
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
            ctx.drawImage(this.healthbar, this.BB.x, this.y-7, this.BB.width * (this.health / this.MAX_HEALTH), 5);
        }
    };
};
/*

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
        this.animation[0] = new Animator(this.spritesheet, 59, 85, 47.5, 70, 8, 0.25,1.1,false,true);
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
        function playSound(soundfile){
            document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
        }
        if(this.dead){// Your condition
            ASSET_MANAGER.playAsset("./resources/sound/collectCoin.mp3");
            ASSET_MANAGER.playAsset("./resources/sound/enemyDieThree.mp3");
        }
    }
	
    draw(ctx) {
        
        if(!this.dead) {
            if (this.facing == this.LEFT) {
                this.animation[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,3); 
            } else {
                this.animation[1].drawFrame(this.game.clockTick,ctx,this.x+20,this.y,3);   
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
};*/