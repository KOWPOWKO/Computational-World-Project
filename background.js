class Sun {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/sun.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1100, 0, this.x, this.y);
    };
}
class Ground {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/ground.png");

    };

    update () {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 570, 1280, 150);
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
		this.animator = new Animator(ASSET_MANAGER.getAsset("./resources/fire.png"), 0, 0, 22.2, 12, 6, 1.5);
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
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/chest.png");
        this.animations = [];
        this.loadAnimation();
		this.open = false;
		
	};
    loadAnimation(){
        this.animations[0] = new Animator(this.spritesheet,0, 0, 47, 36, 1, .5,0,false,true);
        this.openAnim = new Animator(this.spritesheet,0, 0, 47, 36, 4, .5,0,false,true);
    }
	update(){
		if (this.game.click) {
            if (this.game.click && this.game.click.x > 520 && this.game.click.x < 590 && this.game.click.y > 534 && this.game.click.y < 571) {
            this.open = true;
			}
        }
    };
	draw(ctx){   
		if(this.open){
			this.openAnim.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
			ctx.fillStyle = "Grey";
        	ctx.fillRect(465,0, 300, 300);
			ctx.fillStyle = "Black";
			ctx.fillText("ITEM SHOP", 590,10);
			this.open = false;
		}
		else{
		this.animations[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
		}
	};
};