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
            if (this.game.click && this.game.click.x >=  530 && this.game.click.x <= 800
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
            ctx.font = ctx.font.replace(/\d+px/, "24px");
            ctx.fillStyle = "Black";
            ctx.fillText("CONTROLS: ", 50,50);
            ctx.fillText("OBJECTIVE: ", 1000,50);
            if(this.game.mouse && this.game.mouse.x >= 530 && this.game.mouse.x <= 800 && this.game.mouse.y >= 680 && this.game.mouse.y <= 705){
                ctx.fillStyle = "Grey";
		        ctx.fillText("CLICK TO START GAME", 535,700);
                }
            else{
                ctx.fillStyle = "Red";
		        ctx.fillText("CLICK TO START GAME", 535,700);
            }
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

class Inventory {
    constructor(game) {

    }

    update() {

    }

    draw(ctx) {
        
    }
}

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


