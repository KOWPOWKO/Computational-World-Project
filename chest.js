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
        this.healthPotion = ASSET_MANAGER.getAsset("./resources/powerUps/healthPotion.png");
        this.nuke = ASSET_MANAGER.getAsset("./resources/powerUps/nuke.png");
        this.cDefense = ASSET_MANAGER.getAsset("./resources/powerUps/castleDefense.png");
        this.cart = ASSET_MANAGER.getAsset("./resources/background/cart.png");

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
        this.reset14 = false;

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

        function playSound(soundfile){
            document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
        }

		if (this.game.click) {
            this.screen = true;
            if (!PARAMS.PAUSE && this.game.click && this.game.click.x > 520 && this.game.click.x < 590 && this.game.click.y > 534 && this.game.click.y < 571){
                this.open = true;
                this.p1 = true;
                this.p2 = true;
                this.p3 = true;
                this.test = 0;
            }
            if(this.p1 && this.game.click.x > 420 && this.game.click.x < 495 && this.game.click.y > 15 && this.game.click.y < 90 ){
                this.game.click.x = 0;
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
                this.game.click.x = 0;
            }
            if(this.p3 && this.game.click.x > 720 && this.game.click.x < 795&& this.game.click.y > 15 && this.game.click.y < 110){
                this.test = 1;
                this.skillP = true;
                this.p1 = false;
                this.p2 = false;
                this.game.click.x = 0;
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
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 201 && this.game.click.x <= 242 
                && this.game.click.y>=135 && this.game.click.y <= 160 ) {
                    if(PARAMS.SCORE < 10) {
                    this.reset1 = true;
                    playSound("notEnough.mp3"); // Location to your sound file

                    }
                    if(PARAMS.SCORE >= 10) {
                        this.reset1 = false;
                        playSound("register.mp3"); // Location to your sound file

                    }

                    this.timePower = true;
                    this.count1 = 0;
                    this.game.click = false;
            }  
            //USER SELECTED HEALTH POTION
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 376 && this.game.click.x <= 407 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 15) {
                        this.reset2 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 15) {
                            this.reset2 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.potionH = true;
                    this.count2 = 0;
                    this.game.click = false;
            }  
            //USER SELECTED SHIELD POTION
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 546 && this.game.click.x <= 587 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 20) {
                        this.reset3 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 20) {
                            this.reset3 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.shieldAbility = true;
                    this.count3 = 0;
                    this.game.click = false;
            } 
            //USER SELECTED Castle Defense
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 731 && this.game.click.x <= 772 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 25) {
                        this.reset4 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 25) {
                            this.reset4 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.castleD = true;
                    this.count4 = 0;
                    this.game.click = false;
            }
            //USER SELECTED ARROW SHOOTER
            if(this.test === 1 && this.p1 && this.game.click && this.game.click.x >= 916 && this.game.click.x <= 957 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 30) {
                        this.reset5 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 30) {
                            this.reset5 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.arrowShooter = true;
                    this.count5 = 0;
                    this.game.click = false;
             }  
             //***SPECIAL ABILITY***
             //USER SELECTED AIR SLASH
             if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 201 && this.game.click.x <= 242 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 20) {
                        this.reset6 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 20) {
                            this.reset6 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.slashAbility = true;
                    this.count6 = 0;
                    this.game.click = false;
            }   
            //USER SELECTED LASER BEAM  
            if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 376 && this.game.click.x <= 407 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 30) {
                        this.reset7 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 30) {
                            this.reset7 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.laserB = true;
                    this.count7 = 0;
                    this.game.click = false;
            } 
            //USER SELECTED SONIC WAVE
            if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 546 && this.game.click.x <= 587 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 40) {
                        this.reset8 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 40) {
                            this.reset8 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.waveS = true;
                    this.count8 = 0;
                    this.game.click = false;
            } 
            //USER SELECTED INVINCIBILITY
            if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 731 && this.game.click.x <= 772 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 50) {
                        this.rese9 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 50) {
                            this.reset9 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.invincibility = true;
                    this.count9 = 0;
                    this.game.click = false;
            } 
            //USER SELECTED NUKE
            if(this.test === 1 && this.p2 && this.game.click && this.game.click.x >= 916 && this.game.click.x <= 957 
                && this.game.click.y>=135 && this.game.click.y <= 160) {
                    if(PARAMS.SCORE < 70) {
                        this.reset10 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SCORE >= 70) {
                            this.reset10 = false;
                            playSound("register.mp3"); // Location to your sound file
    
                        }
                    this.nuke = true;
                    this.count10 = 0;
                    this.game.click = false;
            } 
            //***SKILL POINTS***
             //USER SELECTED INCREASE HEALTH
            if(this.test === 1 && this.p3 && this.game.click && this.game.click.x >= 240 && this.game.click.x <= 350
                && this.game.click.y >= 135 && this.game.click.y <= 160) {
                    if(PARAMS.SKILL_POINTS < 1) {
                        this.reset11 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SKILL_POINTS >= 1) {
                            this.reset11 = false;
                            playSound("upgrade.mp3"); // Location to your sound file
    
                        }
                    this.health =  true;
                    this.count11 = 0;
                    this.game.click = false;
            } 
             //USER SELECTED INCREASE DAMAGE
             if(this.test === 1 && this.p3 && this.game.click && this.game.click.x >= 400 && this.game.click.x <= 510
                && this.game.click.y >= 135 && this.game.click.y <= 160) {
                    if(PARAMS.SKILL_POINTS < 1) {
                        this.reset12 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SKILL_POINTS >= 1) {
                            this.reset12 = false;
                            playSound("upgrade.mp3"); // Location to your sound file
    
                        }
                    this.damage =  true;
                    this.count12 = 0;
                    this.game.click = false;
            } 
             //USER SELECTED INCREASE SPEED
             if(this.test === 1 && this.p3 && this.game.click && this.game.click.x >= 710 && this.game.click.x <= 820
                && this.game.click.y >= 135 && this.game.click.y <= 160) {
                    if(PARAMS.SKILL_POINTS < 1) {
                        this.reset13 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SKILL_POINTS >= 1) {
                            this.reset13 = false;
                            playSound("upgrade.mp3"); // Location to your sound file
    
                        }
                    this.speed =  true;
                    this.count13 = 0;
                    this.game.click = false;
            } 
             //USER SELECTED INCREASE COOLDOWN
             if(this.test === 1 && this.p3 && this.game.click && this.game.click.x >= 860 && this.game.click.x <= 970
                && this.game.click.y >= 135 && this.game.click.y <= 160) {
                    if(PARAMS.SKILL_POINTS < 1) {
                        this.reset14 = true;
                        playSound("notEnough.mp3"); // Location to your sound file
    
                        }
                        if(PARAMS.SKILL_POINTS >= 1) {
                            this.reset14 = false;
                            playSound("upgrade.mp3"); // Location to your sound file
    
                        }
                    this.coolD =  true;
                    this.count14 = 0;
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
            ctx.drawImage(this.itemAssets.exit,1060,5);
            if(this.game.click){
                if(this.game.click && this.game.click.x >= 1060 && this.game.click.x <= 1082 && this.game.click.y >= 5 && this.game.click.y <= 27 ){
                    this.powerUp = false;
                    this.open = true;
                    this.p1 = true;
                    this.p2 = true;
                    this.p3 = true;
                }
            }
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(190 ,0, 900, 165);
            ctx.fillStyle = "White";
            //TIME WATCH powerUP
            ctx.drawImage(this.itemAssets.slowEnemies,220,20);
            ctx.fillText("Slow Enemies", 220,130);
            ctx.drawImage(this.itemAssets.coinDisplay,250,133);
            ctx.fillText("=  10", 295,157)
            ctx.strokeRect(195, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 201 && this.game.mouse.x <= 242 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 202,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 202,155);
            }
            ctx.fillStyle = "White";
            //HEALTH POTION powerup
            ctx.drawImage(this.itemAssets.healthPotion,385,15);
            ctx.fillText("Health Potion", 385,130);
            ctx.drawImage(this.itemAssets.coinDisplay,425,133);
            ctx.fillText("=  15", 470,157);
            ctx.strokeRect(370, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 376 && this.game.mouse.x <= 407 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 377,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 377,155);
            }
            ctx.fillStyle = "White";
            //SHIELD POTION POWERUP
            ctx.drawImage(this.itemAssets.shield,575,21);
            ctx.fillText("Shield Potion", 560,130);
            ctx.drawImage(this.itemAssets.coinDisplay,595,133);
            ctx.fillText("=  20", 640,157)
            ctx.strokeRect(540, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 546 && this.game.mouse.x <= 587 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 547,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 547,155);
            }
            ctx.fillStyle = "White";
            
            //CASTLE DEFENSE POWERUP
            ctx.drawImage(this.itemAssets.cDefense, 750,20);
            ctx.fillText("Castle Defense", 740,130);
            ctx.drawImage(this.itemAssets.coinDisplay,780,133);
            ctx.fillText("=  25", 825,157);
            ctx.strokeRect(725, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 731 && this.game.mouse.x <= 772 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 732,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 732,155);
            }
            ctx.fillStyle = "White";
            
            //ARROW SHOOTER POWERUP
            ctx.drawImage(this.itemAssets.arrowShooter, 945,12);
            ctx.fillText("Arrow Shooter", 930,130);
            ctx.drawImage(this.itemAssets.coinDisplay,965,133);
            ctx.fillText("=  30", 1005,157);
            ctx.strokeRect(910, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 916 && this.game.mouse.x <= 957 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 917,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 917,155);
            }
            ctx.fillStyle = "White";

            ctx.fillText("POWER UPS", 570,20);
            
        }

        if(this.specialAbil){
            this.open = false;
            ctx.drawImage(this.itemAssets.exit,1060,5);
            if(this.game.click){
                if(this.game.click && this.game.click.x >= 1060 && this.game.click.x <= 1082 && this.game.click.y >= 5 && this.game.click.y <= 27 ){
                    this.specialAbil = false;
                    this.open = true;
                    this.p1 = true;
                    this.p2 = true;
                    this.p3 = true;
                }
            }

           // this.specialAbil = false;
            ctx.fillStyle = rgba(0, 0, 0, 0.5);
            ctx.fillRect(190 ,0, 900, 165);
            ctx.fillStyle = "White";

            //AIR SLASH SPECIAL ABILITY
            ctx.drawImage(this.itemAssets.airSlash,220,15);
            ctx.fillText("AIR   SLASH", 210,130);
            ctx.drawImage(this.itemAssets.coinDisplay,250,133);
            ctx.fillText("=  20", 295,157)
            ctx.strokeRect(195, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 201 && this.game.mouse.x <= 242 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 202,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 202,155);
            }
            ctx.fillStyle = "White";

            //LASER BEAM SPECIAL ABILITY
            ctx.drawImage(this.itemAssets.lazerBeam,365,40);
            ctx.fillText("Laser Beam", 390,130);
            ctx.drawImage(this.itemAssets.coinDisplay,425,133);
            ctx.fillText("=  30", 470,157);
            ctx.strokeRect(370, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 376 && this.game.mouse.x <= 407 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 377,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 377,155);
            }
            ctx.fillStyle = "White";

            ctx.drawImage(this.itemAssets.sonicWave,540,20);
            ctx.fillText("Sonic Wave", 560,130);
            ctx.drawImage(this.itemAssets.coinDisplay,595,133);
            ctx.fillText("=  40", 640,157)
            ctx.strokeRect(540, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 546 && this.game.mouse.x <= 587 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 547,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 547,155);
            }
            ctx.fillStyle = "White";

            //laser beam special ability
            ctx.drawImage(this.itemAssets.invincibility,760,20);
            ctx.fillText("Invincibility", 760,130);
            ctx.drawImage(this.itemAssets.coinDisplay,780,133);
            ctx.fillText("=  50", 825,157);
            ctx.strokeRect(725, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 731 && this.game.mouse.x <= 772 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 732,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 732,155);
            }
            ctx.fillStyle = "White";
            //sonic wave special ability
            ctx.drawImage(this.itemAssets.nuke,910,13);
            ctx.fillText("NUKE", 950,130);
            ctx.drawImage(this.itemAssets.coinDisplay,965,133);
            ctx.fillText("=  70", 1005,157);
            ctx.strokeRect(910, 136 , 50, 27);
            if(this.game.mouse && this.game.mouse.x >= 916 && this.game.mouse.x <= 957 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Red";
                ctx.fillText("BUY", 917,155);
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("BUY", 917,155);
            }
            ctx.fillStyle = "White";
            ctx.fillText("SPECIAL ABILITY", 540,20);
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
            //ctx.drawImage(this.itemAssets.coinDisplay,240,130);
            ctx.fillText("SKILL POINT", 570,20);
            ctx.strokeRect(235, 136 , 120, 27);
            if(this.game.mouse && this.game.mouse.x >= 239 && this.game.mouse.x <= 350 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Gold";
                ctx.fillText("UPGRADE: 1", 240,154)
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("UPGRADE: 1", 240,154)
            }
            ctx.fillStyle = "White";


            //Increase Damage SKILL POINT
            ctx.drawImage(this.itemAssets.damageIncrease,400,15);
            ctx.fillText("Increase Damage", 400,130);
            //ctx.drawImage(this.itemAssets.coinDisplay,400,130);
            ctx.strokeRect(395, 136 , 120, 27);
            if(this.game.mouse && this.game.mouse.x >= 399 && this.game.mouse.x <= 510 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Gold";
                ctx.fillText("UPGRADE: 1", 400,154)
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("UPGRADE: 1", 400,154)
            }
            ctx.fillStyle = "White";

            //Increase speed SKILL POINT
            ctx.drawImage(this.itemAssets.speedIncrease,710,20);
            ctx.fillText("Increase Speed", 710,130);
            //ctx.drawImage(this.itemAssets.coinDisplay,710,130);
            ctx.strokeRect(705, 136 , 120, 27);
            if(this.game.mouse && this.game.mouse.x >= 709 && this.game.mouse.x <= 820 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Gold";
                ctx.fillText("UPGRADE: 1", 710,154)
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("UPGRADE: 1", 710,154)
            }
            ctx.fillStyle = "White";

            //cooldown SKILL POINT
            ctx.drawImage(this.itemAssets.coolDown,860,20);
            ctx.fillText("Cool Down", 860,130);
            //ctx.drawImage(this.itemAssets.coinDisplay,860,130);
            ctx.strokeRect(855, 136 , 120, 27);
            if(this.game.mouse && this.game.mouse.x >= 859 && this.game.mouse.x <= 970 && this.game.mouse.y>=135 && this.game.mouse.y <= 160){
                ctx.fillStyle = "Gold";
                ctx.fillText("UPGRADE: 1", 860,154)
            }
            else{
                ctx.fillStyle = "White";
                ctx.fillText("UPGRADE: 1", 860,154)
            }
            ctx.fillStyle = "White";

        }

        
        if(!this.reset1 && PARAMS.SCORE >= 10 && this.timePower  && this.count1 === 0 & PARAMS.BUY){
            this.game.addEntityInventory(new TimeStop(this.game,25,250));
            this.count1++;
            PARAMS.SCORE = PARAMS.SCORE-10; 
            PARAMS.BUY = false;
        }
        if(!this.reset2 && this.potionH && PARAMS.SCORE >= 15 && this.count2 === 0){
            this.game.addEntityInventory(new HealthPotion(this.game,25,250));
            this.count2++;
            PARAMS.SCORE = PARAMS.SCORE-15;
        }
        if(!this.reset3 && this.shieldAbility && PARAMS.SCORE  >= 20  && this.count3 === 0){
            this.game.addEntityInventory(new Shield(this.game,100,250));
            this.count3++;
            PARAMS.SCORE = PARAMS.SCORE-20;
            PARAMS.BUY2 = false;
        }
        if(!this.reset4 && this.castleD && PARAMS.SCORE  >= 25 && this.count4 === 0){
            this.game.addEntityInventory(new CastleShield(this.game,80,80));
            this.count4++;
            PARAMS.SCORE = PARAMS.SCORE-25;
        }
        if(!this.reset5 && this.arrowShooter && PARAMS.SCORE  >= 30 && this.count5 === 0){
            if (PARAMS.INV_FULL == false) {
                this.count5++;
                this.game.addEntityInventory(new ArrowShooterInvetory(this.game,80,80));
                PARAMS.SCORE = PARAMS.SCORE-30;
            }
        }
        if(!this.reset6 && this.slashAbility && PARAMS.SCORE  >= 20 && this.count6 === 0){
            this.count6++;
            this.game.addEntityForeground(new AirSlashInvetory(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-20;
        }
        if(!this.reset7 && this.laserB && PARAMS.SCORE  >= 30 && this.count7 === 0){
            this.count7++;
            this.game.addEntityForeground(new Lazer(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-30;
        }
        if(!this.reset8 && this.waveS && PARAMS.SCORE  >= 40 && this.count8 === 0){
            this.count8++;
            this.game.addEntityForeground(new SonicWave(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-40;
        }
        if(!this.reset9 && this.invincibility && PARAMS.SCORE  >= 50 && this.count9 === 0){
            this.count9++;
            this.game.addEntityForeground(new Invincibility(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-50;
        }
        if(!this.reset10 && this.nuke && PARAMS.SCORE  >= 70 && this.count10 === 0){
            this.count10++;
            this.game.addEntityInventory(new NUKE(this.game,80,80));
            PARAMS.SCORE = PARAMS.SCORE-70;
        }
        if(!this.reset11 && this.health && PARAMS.SKILL_POINTS  >= 1 && this.count11 === 0){
            this.count11++;
            this.game.addEntityInventory(new HealthIncrease(this.game,80,80));
            PARAMS.SKILL_POINTS = PARAMS.SKILL_POINTS-1;
        }
        if(!this.reset12 && this.damage && PARAMS.SKILL_POINTS  >= 1 && this.count12 === 0){
            this.count12++;
            this.game.addEntityInventory(new DamageIncrease(this.game,80,80));
            PARAMS.SKILL_POINTS = PARAMS.SKILL_POINTS-1;
        }
        if(!this.reset13 && this.speed && PARAMS.SKILL_POINTS  >= 1 && this.count13 === 0){
            this.count13++;
            this.game.addEntityInventory(new SpeedSkill(this.game,80,80));
            PARAMS.SKILL_POINTS = PARAMS.SKILL_POINTS-1;
        }
        if(!this.reset14 && this.coolD && PARAMS.SKILL_POINTS  >= 1 && this.count14 === 0){
            this.count14++;
            this.game.addEntityInventory(new CoolDown(this.game,80,80));
            PARAMS.SKILL_POINTS = PARAMS.SKILL_POINTS-1;
        }
        
		if(!this.open){
		this.animations[0].drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
        
		}
        if(this.open || this.specialAbil || this.powerUp || this.skillP){
            ctx.fillStyle = "Black";
            ctx.fillText("ITEMS PURCHASED", 25,220); 
            ctx.fillText("____________________", 25,225); 
            ctx.drawImage(this.itemAssets.cart,200,200);
        }

	};
};
