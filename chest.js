class ItemAssets {
    constructor() {
        this.coinDisplay = ASSET_MANAGER.getAsset("./resources/powerUps/coinDisplay.png");
        this.exit = ASSET_MANAGER.getAsset("./resources/background/exit.png");
        this.slowEnemies = ASSET_MANAGER.getAsset("./resources/powerUps/timeWatch.png");
        this.damageIncrease = ASSET_MANAGER.getAsset("./resources/powerUps/damageIncrease.gif");
        this.doubleSpeed = ASSET_MANAGER.getAsset("./resources/powerUps/times2.png");
        this.doubleSize = ASSET_MANAGER.getAsset("./resources/powerUps/arrow.png");
        this.invincibility = ASSET_MANAGER.getAsset("./resources/powerUps/star.png");
        this.arrowShooter = ASSET_MANAGER.getAsset("./resources/powerUps/powerUp1.png");
        this.airSlash = ASSET_MANAGER.getAsset("./resources/powerUps/slash.png");
        this.healthIncrease = ASSET_MANAGER.getAsset("./resources/powerUps/healthIncrease.png");
        this.speedIncrease = ASSET_MANAGER.getAsset("./resources/powerUps/speedDisplay.png");
        this.coolDown = ASSET_MANAGER.getAsset("./resources/powerUps/cooldown.png");
        this.shield = ASSET_MANAGER.getAsset("./resources/powerUps/shield.png");
        this.sonicWave = ASSET_MANAGER.getAsset("./resources/powerUps/sonicwave.png");
        this.lazerBeam = ASSET_MANAGER.getAsset("./resources/powerUps/lazerbeam.png");

    }
}

class Chest {
	constructor(game,x,y,open){
        Object.assign(this,{game,x,y,open});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/background/chest.png");
        this.itemAssets = new ItemAssets();
        this.animations = [];
        this.loadAnimation();

        this.reset1 = false;
        this.reset2 = false;
        this.reset3 = false;
        this.reset4 = false;
        this.reset5 = false;
        this.reset6 = false;
        this.reset7 = false;
        this.reset8 = false;
        this.reset9 = false;
        this.reset10 = false;
        this.reset11 = false;
        this.reset12 = false;
        this.reset13 = false;

		this.open = false;
        this.powerUp = false;
        this.specialAbil = false;
		this.skillP = false;
        this.itemShopOpen = false;
        this.elapsed = 0;

        //this.test = 0;
        //this.count = 0;
	};
    loadAnimation(){
        this.animations[0] = new Animator(this.spritesheet,0, 0, 47, 36, 1, .5,0,false,true);
        this.openAnim = new Animator(this.spritesheet,0, 0, 47, 36, 4, .5,0,false,true);
    }
	update(){
        this.elapsed += this.game.clockTick;

        

		if (this.game.click) {
            this.screen = true;
            if (this.game.click && this.game.click.x > 520 && this.game.click.x < 590 && this.game.click.y > 534 && this.game.click.y < 571){
                this.open = true;
                this.p1 = true;
                this.p2 = true;
                this.p3 = true;
                this.test = 0;
            }
            if(this.p1 && this.game.click.x > 420 && this.game.click.x < 495 && this.game.click.y > 15 && this.game.click.y < 90 ){
                this.test = 1;
                this.powerUp = true;
                this.p2 = false;
                this.p3 = false;
            }
            if(this.p2 && this.game.click && this.game.click.x > 570 && this.game.click.x < 645 && this.game.click.y > 15 && this.game.click.y < 110){
                this.test = 1;
                this.specialAbil = true;
                this.p1 = false;
                this.p3 = false;
            }
            if(this.p3 && this.game.click.x > 720 && this.game.click.x < 795&& this.game.click.y > 15 && this.game.click.y < 110){
                this.test = 1;
                this.skillP = true;
                this.p1 = false;
                this.p2 = false;
            }

            if (this.open || this.specialAbil || this.powerUp || this.skillP) {
                this.itemShopOpen = true;
                PARAMS.PAUSE = true;
            } else {
                this.itemShopOpen = false;
                PARAMS.PAUSE = false;
            }

            //***POWER UP***
            //USER SELECTED TIME STOP
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 240 && this.game.click.x <= 276 
                && this.game.click.y >= 130 && this.game.click.y <= 166 ) {
                    if(PARAMS.SCORE < 1) this.reset1 = true;
                    if(PARAMS.SCORE >= 1) this.reset1 = false;

                    this.timePower = true;
                    this.count1 = 0;
                    this.game.click = false;
            }  
            //USER SELECTED ARROW SHOOTER
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 400 && this.game.click.x <= 436
                && this.game.click.y >= 130 && this.game.click.y <= 166 ) {
                    if(PARAMS.SCORE < 2) this.reset2 = true;
                    if(PARAMS.SCORE >= 2) this.reset2 = false;
                    this.arrowShooter = true;
                    this.count2 = 0;
                    this.game.click = false;
            }  
            //USER SELECTED DOUBLE SPEED
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 575 && this.game.click.x <= 700
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 3) this.reset3 = true;
                    if(PARAMS.SCORE >= 3) this.reset3 = false;
                    this.dSpeed = true;
                    this.count3 = 0;
                    this.game.click = false;
            } 
            //USER SELECTED DOUBLE SIZE
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 710 && this.game.click.x <= 840
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 4) this.reset4 = true;
                    if(PARAMS.SCORE >= 4) this.reset4 = false;
                    this.dSize = true;
                    this.count4 = 0;
                    this.game.click = false;
            }
            //USER SELECTED INVINCIBILITY
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 860 && this.game.click.x <= 920
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 5) this.reset5 = true;
                    if(PARAMS.SCORE >= 5) this.reset5 = false;
                    this.star = true;
                    this.count5 = 0;
                    this.game.click = false;
             }  
             //***SPECIAL ABILITY***
             //USER SELECTED SHIELD POTION
             if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 240 && this.game.click.x <= 276 
                && this.game.click.y >= 130 && this.game.click.y <= 166 ) {
                    if(PARAMS.SCORE < 1) this.reset6 = true;
                    if(PARAMS.SCORE >= 1) this.reset6 = false;
                    this.shieldAbility = true;
                    this.count6 = 0;
                    this.game.click = false;
            }   
            //USER SELECTED AIR SLASH   
            if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 400 && this.game.click.x <= 436
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 2) this.reset7 = true;
                    if(PARAMS.SCORE >= 2) this.reset7 = false;
                    this.slashAbility = true;
                    this.count7 = 0;
                    this.game.click = false;
            } 
            //USER SELECTED LAZER BEAM
            if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 710 && this.game.click.x <= 746
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 3) this.reset8 = true;
                    if(PARAMS.SCORE >= 3) this.reset8 = false;
                    this.laserB = true;
                    this.count8 = 0;
                    this.game.click = false;
            } 
            //USER SELECTED SONIC WAVE
            if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 880 && this.game.click.x <= 916
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 4) this.reset9 = true;
                    if(PARAMS.SCORE >= 4) this.reset9 = false;
                    this.waveS = true;
                    this.count9 = 0;
                    this.game.click = false;
            } 
            //***SKILL POINTS***
             //USER SELECTED INCREASE HEALTH
            if(this.test === 1 && this.p3 && this.game.click && this.game.click.x >= 240 && this.game.click.x <= 276
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 1) this.reset10 = true;
                    if(PARAMS.SCORE >= 1) this.reset10 = false;
                    this.health =  true;
                    this.count10 = 0;
                    this.game.click = false;
            } 
             //USER SELECTED INCREASE DAMAGE
             if(this.test === 1 && this.p3 && this.game.click && this.game.click.x >= 400 && this.game.click.x <= 436
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 2) this.reset11 = true;
                    if(PARAMS.SCORE >= 2) this.reset11 = false;
                    this.damage =  true;
                    this.count11 = 0;
                    this.game.click = false;
            } 
             //USER SELECTED INCREASE SPEED
             if(this.test === 1 && this.p3 && this.game.click && this.game.click.x >= 710 && this.game.click.x <= 746
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 3) this.reset12 = true;
                    if(PARAMS.SCORE >= 3) this.reset12 = false;
                    this.speed =  true;
                    this.count12 = 0;
                    this.game.click = false;
            } 
             //USER SELECTED INCREASE COOLDOWN
             if(this.test === 1 && this.p3 && this.game.click && this.game.click.x >= 860 && this.game.click.x <= 896
                && this.game.click.y >= 130 && this.game.click.y <= 166) {
                    if(PARAMS.SCORE < 4) this.reset13 = true;
                    if(PARAMS.SCORE >= 4) this.reset13 = false;
                    this.coolD =  true;
                    this.count13 = 0;
                    this.game.click = false;
            }             
        }
    };
	draw(ctx){   
        ctx.fillStyle = "Black";
        ctx.font.replace(/\d+px/, "10px");
		ctx.fillText("ITEM SHOP", 500,595);

		if(this.open){
            ctx.drawImage(this.itemAssets.exit,795,1);
            if(this.game.click){
                if(this.game.click && this.game.click.x >= 795 && this.game.click.x <= 817 && this.game.click.y >= 1 && this.game.click.y <= 23 ){
                    this.open = false;
                }
            }
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
           //this.open = false;
		}
        //powerup 
        if(this.powerUp){
            this.open = false
            ctx.drawImage(this.itemAssets.exit,1000,5);
            if(this.game.click){
                if(this.game.click && this.game.click.x >= 1000 && this.game.click.x <= 1022 && this.game.click.y >= 5 && this.game.click.y <= 27 ){
                    this.powerUp = false;
                    this.open = true;
                    this.p1 = true;
                    this.p2 = true;
                    this.p3 = true;
                }
            }
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(230 ,0, 800, 165);
            ctx.fillStyle = "White";
            //TIME WATCH powerUP
            ctx.drawImage(this.itemAssets.slowEnemies,240,20);
            ctx.fillText("Slow Enemies", 240,130);
            ctx.drawImage(this.itemAssets.coinDisplay,240,130);
            ctx.fillText("=  1", 285,154)
        
            //Arrow shooter powerup
            ctx.drawImage(this.itemAssets.arrowShooter,400,15);
            ctx.fillText("Arrow Shooter", 400,130);
            ctx.drawImage(this.itemAssets.coinDisplay,400,130);
            ctx.fillText("=  2", 440,154);

            //DOUBLE SPEED POWERUP
            ctx.drawImage(this.itemAssets.doubleSpeed,575,25);
            ctx.fillText("Double speed", 560,130);
            ctx.drawImage(this.itemAssets.coinDisplay,560,130);
            ctx.fillText("=  3", 600,154)
            
            //DOUBLE SIZE POWERUP
            ctx.drawImage(this.itemAssets.doubleSize, 710,20);
            ctx.fillText("Double Size", 710,130);
            ctx.drawImage(this.itemAssets.coinDisplay,710,130);
            ctx.fillText("=  4", 747,154);
            
            //INVINCIBILITY POWERUP
            ctx.drawImage(this.itemAssets.invincibility, 860,20);
            ctx.fillText("Invincibility", 860,130);
            ctx.drawImage(this.itemAssets.coinDisplay,860,130);
            ctx.fillText("=  5", 900,154);

            ctx.fillText("POWER UPS", 570,20);
            
        }

        if(this.specialAbil){
            this.open = false;
            ctx.drawImage(this.itemAssets.exit,1000,5);
            if(this.game.click){
                if(this.game.click && this.game.click.x >= 1000 && this.game.click.x <= 1022 && this.game.click.y >= 5 && this.game.click.y <= 27 ){
                    this.specialAbil = false;
                    this.open = true;
                    this.p1 = true;
                    this.p2 = true;
                    this.p3 = true;
                }
            }

           // this.specialAbil = false;
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(230 ,0, 800, 165);
            ctx.fillStyle = "White";
            //SHIELD SPECIAL ABILITY
            ctx.drawImage(this.itemAssets.shield,240,15);
            ctx.fillText("Shield Potion", 240,130);
            ctx.drawImage(this.itemAssets.coinDisplay,240,130);
            ctx.fillText("=  1", 285,154);

            //AIR SLASH SPECIAL ABILITY
            ctx.drawImage(this.itemAssets.airSlash,420,15);
            ctx.fillText("AIR   SLASH", 400,130);
            ctx.drawImage(this.itemAssets.coinDisplay,400,130);
            ctx.fillText("=  2", 440,154);
			ctx.fillText("SPECIAL ABILITY", 520,20);

            //laser beam special ability
            ctx.drawImage(this.itemAssets.lazerBeam,685,40);
            ctx.fillText("Laser Beam", 710,130);
            ctx.drawImage(this.itemAssets.coinDisplay,710,130);
            ctx.fillText("=  3", 747,154)

            //sonic wave special ability
            ctx.drawImage(this.itemAssets.sonicWave,860,16);
            ctx.fillText("Sonic wave", 880,130);
            ctx.drawImage(this.itemAssets.coinDisplay,880,130);
            ctx.fillText("=  4", 920,154)
        }

        if(this.skillP){
            this.open = false;
            ctx.drawImage(this.itemAssets.exit,1000,5);
            if(this.game.click){
                if(this.game.click && this.game.click.x >= 1000 && this.game.click.x <= 1022 && this.game.click.y >= 5 && this.game.click.y <= 27 ){
                    this.skillP = false;
                    this.open = true;
                    this.p1 = true;
                    this.p2 = true;
                    this.p3 = true;
                }
            }
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(230 ,0, 800, 165);
            ctx.fillStyle = "White";
            //Increase health SKILL POINT
            ctx.drawImage(this.itemAssets.healthIncrease,240,10);
            ctx.fillText("Health Increase", 240,130);
            ctx.drawImage(this.itemAssets.coinDisplay,240,130);
            ctx.fillText("=  1", 285,154)
            ctx.fillText("SKILL POINT", 570,20);

            //Increase Damage SKILL POINT
            ctx.drawImage(this.itemAssets.damageIncrease,400,15);
            ctx.fillText("Increase Damage", 400,130);
            ctx.drawImage(this.itemAssets.coinDisplay,400,130);
            ctx.fillText("=  2", 440,154)

            //Increase speed SKILL POINT
            ctx.drawImage(this.itemAssets.speedIncrease,710,20);
            ctx.fillText("Increase Speed", 710,130);
            ctx.drawImage(this.itemAssets.coinDisplay,710,130);
            ctx.fillText("=  3", 747,154)

            //cooldown SKILL POINT
            ctx.drawImage(this.itemAssets.coolDown,860,20);
            ctx.fillText("Cool Down", 860,130);
            ctx.drawImage(this.itemAssets.coinDisplay,860,130);
            ctx.fillText("=  4", 900,154)

        }

        
        if(!this.reset1 && PARAMS.SCORE >= 1 && this.timePower  && this.count1 === 0 ){
            this.game.addEntityInventory(new TimeStop(this.game,80,80));
            this.count1++;
            PARAMS.SCORE = PARAMS.SCORE-1; 
        }
        if(!this.reset2 && this.arrowShooter && PARAMS.SCORE >= 2 && this.count2 === 0){
            this.game.addEntityForeground(new ArrowShooter(this.game,80,80));
            this.count2++;
            PARAMS.SCORE = PARAMS.SCORE-2;
        }
        if(!this.reset3 && this.dSpeed && PARAMS.SCORE  >= 3  && this.count3 === 0){
            this.game.addEntityInventory(new SpeedIncrease(this.game,80,80));
            this.count3++;
            PARAMS.SCORE = PARAMS.SCORE-3;
        }
        if(!this.reset4 && this.dSize && PARAMS.SCORE  >= 4 && this.count4 === 0){
            this.game.addEntityForeground(new SizeIncrease(this.game,80,80));
            this.count4++;
            PARAMS.SCORE = PARAMS.SCORE-4;
        }
        if(!this.reset5 && this.star && PARAMS.SCORE  >= 5 && this.count5 === 0){
            this.count5++;
            this.game.addEntityForeground(new Invincibility(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-5;
        }
        if(!this.reset6 && this.shieldAbility && PARAMS.SCORE  >= 1 && this.count6 === 0){
            this.count6++;
            this.game.addEntityInventory(new Shield(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-1;
        }
        if(!this.reset7 && this.slashAbility && PARAMS.SCORE  >= 2 && this.count7 === 0){
            this.count7++;
            this.game.addEntityForeground(new AirSlash(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-2;
        }
        if(!this.reset8 && this.laserB && PARAMS.SCORE  >= 3 && this.count8 === 0){
            this.count8++;
            this.game.addEntityForeground(new Lazer(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-3;
        }
        if(!this.reset9 && this.waveS && PARAMS.SCORE  >= 4 && this.count9 === 0){
            this.count9++;
            this.game.addEntityForeground(new SonicWave(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-4;
        }
        if(!this.reset10 && this.health && PARAMS.SCORE  >= 1 && this.count10 === 0){
            this.count10++;
            this.game.addEntityInventory(new HealthIncrease(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-1;
        }
        if(!this.reset11 && this.damage && PARAMS.SCORE  >= 2 && this.count11 === 0){
            this.count11++;
            this.game.addEntityForeground(new DamageIncrease(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-2;
        }
        if(!this.reset12 && this.speed && PARAMS.SCORE  >= 3 && this.count12 === 0){
            this.count12++;
            this.game.addEntityForeground(new SpeedSKiilP(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-3;
        }
        if(!this.reset13 && this.coolD && PARAMS.SCORE  >= 4 && this.count13 === 0){
            this.count13++;
            this.game.addEntityInventory(new CoolDown(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-4;
        }
        
		if(!this.open){
		this.animations[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
        
		}
	};
};
