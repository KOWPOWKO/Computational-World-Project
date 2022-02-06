class Sun {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/background/sun.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1100, 0, this.x, this.y);
        ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/title.png"), 100,100,320,320);
    };
}

// class Bird { 
//     constructor(game,x,y,spritesheet) {
//         this.game = game;
//         this.spritesheet = ASSET_MANAGER.getAsset("./resources/bird.PNG");
//         this.animator = new Animator(this.spritesheet, 0, 0, 86, 68, 6, 0.4);
//         this.x = 0;
// 		this.y = 0;
//         this.speed = 200;
//     };

//     update() {
//         this.x += -this.speed * this.game.clockTick;
// 		if(this.x < -250) this.x = 1024;
//     };

//     draw(ctx) {
//         this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
//     };
// };

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
class chest {
	constructor(game,x,y,open){
        Object.assign(this,{game,x,y,open});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/background/chest.png");
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
            if (this.game.click && this.game.click.x > 520 && this.game.click.x < 590 && this.game.click.y > 534 && this.game.click.y < 571) {
                if(this.game.click && this.game.click.x > 420 && this.game.click.x < 495 && this.game.click.y > 15 && this.game.click.y < 90){
                    this.powerUp = true;
                }
                this.open = true;
            }
            // if(this.game.click && this.game.click.x > 420 && this.game.click.x < 495 && this.game.click.y > 15 && this.game.click.y < 90){
            //     this.powerUp = true;
            //     this.open = true;
            
            if(this.game.click && this.game.click.x > 570 && this.game.click.x < 645 && this.game.click.y > 15 && this.game.click.y < 90){
                this.specialAbil = true;
                this.open = true;
            }
            if(this.game.click && this.game.click.x > 720 && this.game.click.x < 795&& this.game.click.y > 15 && this.game.click.y < 90){
                this.skillP = true;
                this.open = true;
            }
        }
    };
	draw(ctx){   
        ctx.fillStyle = "Black";
		ctx.fillText("ITEM SHOP", 526,585);

		if(this.open){
			this.openAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
			ctx.fillStyle = rgba(0, 0, 0, 0.5);
        	ctx.fillRect(410,0, 400, 150);
            ctx.fillStyle = "Red";
            ctx.fillRect(420,15, 75, 75);
            ctx.fillStyle = "Blue";
            ctx.fillRect(570,15, 75, 75);
            ctx.fillStyle = "Green";
            ctx.fillRect(720,15, 75, 75);
            ctx.fillStyle = "White";
			ctx.fillText("ITEM SHOP", 580,10);
            ctx.fillText("Power-ups", 430,110);
            ctx.fillText("Special Abilities", 575,110);
            ctx.fillText("Skill Point", 735,110);
            if(this.powerUp){
                this.powerUp = false;
                ctx.fillStyle = "Red";
        	    ctx.fillRect(410,0, 400, 150);
                ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/healthIncrease.png"),420,5);
            }

            if(this.specialAbil){
                this.specialAbil = false;
                ctx.fillStyle = "Blue";
        	    ctx.fillRect(410,0, 400, 150);
              //  ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/healthIncrease.png"),420,5);
            }
            
            // ctx.fillText("Health Increase", 440,110);
            // ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/coinDisplay.png"),440,120);
            // ctx.fillText("=  50", 480,140);
            // //ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/powerUp1.png"),590,20);
            // ctx.fillText("Arrow Shooter", 590,110);
            // ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/coinDisplay.png"),580,120);
            // ctx.fillText("=  100", 620,140);
            // ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/arrow.png"), 710,32);
            // ctx.fillText("Double Size", 720,110);
            // ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/coinDisplay.png"),705,120);
            // ctx.fillText("=  300", 745,140);
                 
                this.open = false;
			
		}
        // if(this.powerUp1){
        //     ctx.drawImage(ASSET_MANAGER.getAsset("./resources/powerUps/powerUp1.png"),300,20);
        //     ctx.fillText("Arrow Shooter", 470,100);
        //     this.powerUp1 = false;
        // }
		else{
		this.animations[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
		}
	};
};
