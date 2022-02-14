class Sun {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/background/sun.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1100, 0, this.x, this.y);
    };
}

class StartingScreen {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
       // this.spritesheet = ASSET_MANAGER.getAsset("./resources/background/background.png");
        this.title = ASSET_MANAGER.getAsset("./resources/background/castledefenderlogo.png");
        this.loadGame = false;
        this.loaded = false;
        this.removeFromWorld = false;

    };
    
    update () {
        if(this.game.click){
            if (this.game.click && this.game.click.x >=  530 && this.game.click.x <= 750
                && this.game.click.y >= 680 && this.game.click.y <= 705) {
               this.loadGame =true;
               this.game.click = false;
            }
        }
    };

    draw(ctx) {
        if(!this.loadGame){
            ctx.fillStyle = "White";
            ctx.fillRect(0,0, 1280, 720);
            ctx.font = ctx.font.replace(/\d+px/, "18px");
            ctx.fillStyle = "Red";
		    ctx.fillText("CLICK TO START GAME", 535,700);
            //this.game.addEntityBackground(new Castle(this.game, 0, 0));
            ctx.drawImage(this.title, 463, 0,320,320);
        } 
    };
}

class Fire {
	constructor(game){
		this.game = game;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./resources/background/fire.png"), 0, 0, 22.2, 12, 6, 1.5);
	};

	update(){

	};
	
	draw(ctx){
		this.animator.drawFrame(this.game.clockTick, ctx, 0,   400);

	};
};

class GameOver {
    constructor(game) {
        this.game = game;
        this.restart = false;
    }

    update() {
        if (this.game.click) {
            if (this.game.click && this.game.click.x >= 530 && this.game.click.x <= 730 
                && this.game.click.y >= 350 && this.game.click.y <= 410) {
                this.restart = true;
                this.game.click = false;
            }
        }
    }

    draw(ctx) {
        if (this.restart == false) {
            ctx.font = ctx.font.replace(/\d+px/, "60px");
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(0,0, 1280, 720);
    
            ctx.fillStyle = "Red";
            ctx.fillText("GAME OVER", 450,60);
    
            ctx.fillStyle = "Black";
            ctx.fillRect(530,350, 200, 60);
    
      

            ctx.font = ctx.font.replace(/\d+px/, "40px");
            ctx.fillStyle = "Red";
            ctx.fillText("RESTART", 540,400);
        } 
        
        
    }
}

class Win {
    constructor(game,camera) {
        this.game = game;
        this.camera = camera;
        this.restart = false;
    }

    update() {
        if (this.game.click) {
            if (this.game.click && this.game.click.x >= 530 && this.game.click.x <= 730 
                && this.game.click.y >= 350 && this.game.click.y <= 410) {
                this.restart = true;
                this.game.click = false;
                this.camera.roundNumber = 0;
                this.camera.END = false;
            }
        }
    }

    draw(ctx) {
        if (this.restart == false) {
            ctx.font = ctx.font.replace(/\d+px/, "60px");
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(0,0, 1280, 720);
    
            ctx.fillStyle = "Blue";
            ctx.fillText("Winner!", 540,60);
    
            ctx.fillStyle = "White";
            ctx.fillRect(530,350, 200, 60);
    
      

            ctx.font = ctx.font.replace(/\d+px/, "40px");
            ctx.fillStyle = "Blue";
            ctx.fillText("RESTART", 540,400);
            ctx.font = ctx.font.replace(/\d+px/, "10px");
        } 
        
        
    }
}

class ItemAssets {
    constructor() {
        this.coinDisplay = ASSET_MANAGER.getAsset("./resources/powerUps/coinDisplay.png");
        this.slowEnemies = ASSET_MANAGER.getAsset("./resources/powerUps/timeWatch.png");
        this.damageIncrease = ASSET_MANAGER.getAsset("./resources/powerUps/damageIncrease.gif");
        this.doubleSpeed = ASSET_MANAGER.getAsset("./resources/powerUps/times2.png");
        this.doubleSize = ASSET_MANAGER.getAsset("./resources/powerUps/arrow.png");
        this.invincibility = ASSET_MANAGER.getAsset("./resources/powerUps/star.png");
        this.arrowShooter = ASSET_MANAGER.getAsset("./resources/powerUps/powerUp1.png");
        this.airSlash = ASSET_MANAGER.getAsset("./resources/powerUps/slash.png");
        this.healthIncrease = ASSET_MANAGER.getAsset("./resources/powerUps/healthIncrease.png");
    }

}

class chest {
	constructor(game,x,y,open){
        Object.assign(this,{game,x,y,open});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/background/chest.png");
        this.itemAssets = new ItemAssets();
        this.animations = [];
        this.loadAnimation();
		this.open = false;
        this.powerUp = false;
        this.specialAbil = true;
		this.skillP = true;
	};
    loadAnimation(){
        this.animations[0] = new Animator(this.spritesheet,0, 0, 47, 36, 1, .5,0,false,true);
        this.openAnim = new Animator(this.spritesheet,0, 0, 47, 36, 4, .5,0,false,true);
    }
	update(){
		if (this.game.click) {
            this.screen = true;
            if (this.game.click && this.game.click.x > 520 && this.game.click.x < 590 && this.game.click.y > 534 && this.game.click.y < 571) {
                this.open = true;
            }
            if(this.game.click.x > 420 && this.game.click.x < 495 && this.game.click.y > 15 && this.game.click.y < 90 ){
                this.powerUp = true;
                    if (this.game.click && this.game.click.x >= 100 && this.game.click.x <= 400 
                        && this.game.click.y >= 0 && this.game.click.y <= 100) {
                            this.timePower = true;
                    }
                
                //this.game.click = false;
            }
            if(this.game.click && this.game.click.x > 570 && this.game.click.x < 645 && this.game.click.y > 15 && this.game.click.y < 90){
                this.specialAbil = true;
                //this.open = true;
            }
            if(this.game.click && this.game.click.x > 720 && this.game.click.x < 795&& this.game.click.y > 15 && this.game.click.y < 90){
                this.skillP = true;
                //this.open = true;
            }
        }
    };
	draw(ctx){   
        ctx.fillStyle = "Black";
        ctx.font.replace(/\d+px/, "10px");
		ctx.fillText("ITEM SHOP", 500,595);

		if(this.open){
			this.openAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
			ctx.fillStyle = rgba(0, 0, 0, 0.5);
        	ctx.fillRect(410,0, 410, 150);
            ctx.fillStyle = "Red";
            ctx.fillRect(420,25, 75, 75);
            ctx.fillStyle = "Blue";
            ctx.fillRect(580,25, 75, 75);
            ctx.fillStyle = "Green";
            ctx.fillRect(730,25, 75, 75);
            ctx.fillStyle = "White";
			ctx.fillText("ITEM SHOP", 570,20);
            ctx.fillText("Power-ups", 420,120);
            ctx.fillText("Special Abilities", 560,120);
            ctx.fillText("Skill Point", 720,120);       
                 
                this.open = false;
		}

        if(this.powerUp){
            this.powerUp = false;
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(230 ,0, 800, 165);
            ctx.fillStyle = "White";
            //TIME WATCH powerUP
            ctx.drawImage(this.itemAssets.slowEnemies,240,20);
            //this.game.addEntityForeground(new TimeStop(this.game,240,20));
            ctx.fillText("Slow Enemies", 240,130);
            ctx.drawImage(this.itemAssets.coinDisplay,240,130);
            ctx.fillText("=  100", 285,154)
            if(this.timePower){
                ctx.drawImage(this.itemAssets.slowEnemies,400,400);
            }
            
            //Increase Damage powerUP
            ctx.drawImage(this.itemAssets.damageIncrease,400,15);
            ctx.fillText("Increase Damage", 400,130);
            ctx.drawImage(this.itemAssets.coinDisplay,400,130);
            ctx.fillText("=  100", 440,154)
            ctx.fillStyle = "White";
			ctx.fillText("POWER UPS", 570,20);

            ctx.drawImage(this.itemAssets.doubleSpeed,575,25);
            ctx.fillText("Double speed", 560,130);
            ctx.drawImage(this.itemAssets.coinDisplay,560,130);
            ctx.fillText("=  100", 600,154)
            ctx.fillStyle = "White";

            ctx.drawImage(this.itemAssets.doubleSize, 710,20);
            ctx.fillText("Double Size", 710,130);
            ctx.drawImage(this.itemAssets.coinDisplay,710,130);
            ctx.fillText("=  300", 747,154);

            ctx.drawImage(this.itemAssets.invincibility, 860,20);
            ctx.fillText("Invincibility", 860,130);
            ctx.drawImage(this.itemAssets.coinDisplay,860,130);
            ctx.fillText("=  300", 900,154);
        }

        if(this.specialAbil){
            this.specialAbil = false;
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(230 ,0, 800, 165);
            ctx.fillStyle = "White";
            //Arrow shooter powerup
            ctx.drawImage(this.itemAssets.arrowShooter,240,15);
            ctx.fillText("Arrow Shooter", 240,130);
            ctx.drawImage(this.itemAssets.coinDisplay,240,130);
            ctx.fillText("=  100", 285,154);

            ctx.drawImage(this.itemAssets.airSlash,400,15);
            ctx.fillText("Air Slash", 400,130);
            ctx.drawImage(this.itemAssets.coinDisplay,400,130);
            ctx.fillText("=  100", 440,154);
			ctx.fillText("SPECIAL ABILITY", 570,20);
        }

        if(this.skillP){
            this.skillP = false;
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(230 ,0, 800, 165);
            ctx.fillStyle = "White";
            //Increase health powerup
            ctx.drawImage(this.itemAssets.healthIncrease,240,10);
            ctx.fillText("Health Increase", 240,130);
            ctx.drawImage(this.itemAssets.coinDisplay,240,130);
            ctx.fillText("=  100", 285,154)
            ctx.fillText("SKILL POINT", 570,20);

            //Increase Damage powerUP
            ctx.drawImage(this.itemAssets.damageIncrease,400,15);
            ctx.fillText("Increase Damage", 400,130);
            ctx.drawImage(this.itemAssets.coinDisplay,400,130);
            ctx.fillText("=  100", 440,154)

        }
		if(!this.open){
		this.animations[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
		}
	};
};
