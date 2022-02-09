class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.LEFT = 0;
        this.RIGHT = 1;
        this.monsters = [20,10];
        this.roundMonster = [];
        this.roundMonterProgress = 0;
        this.title = true;
        this.loadGame = false;
        //this.game.click = false;
        //this.update();
        this.loadWorld();
        
    };
    clearEntities() {
        this.game.entities = [this];
    };

    loadWorld() {
        //player        
       // this.startingScreen();
       this.game.addEntityBackground(new StartingScreen(this.game));
        
        this.game.addEntityForeground(new Coin(this.game,50,0));
        //this.game.addEntity(new Character_2(this.game,0,0));
        this.game.addEntityForeground(new Hero(this.game,0,0));
        //this.game.addEntityEnemies(new DragonBoss(this.game,1240,0));
        this.setRoundMonters();
        //background props
        this.game.addEntityEnemies(new BirdBrown(this.game,-325,this.RIGHT));
        this.game.addEntityEnemies(new BirdBrown(this.game,1412,this.LEFT));

        //background
        this.game.addEntityBackground(new Ground(this.game, 0, 0));
        this.game.addEntityBackground(new CastleBounds(this.game, 0, 0));
        this.game.addEntityBackground(new chest(this.game,530,535));
        
        
        //this.game.addEntityBackground(new Coin(this.game,50,0));
        this.game.addEntityBackground(new Score(this.game));
        this.game.addEntityBackground(new Sun(this.game, 180, 150));
        this.game.addEntityBackground(new Castle(this.game, 0, 0));
        

    }
    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        
    }
    draw(ctx) {
        
    }
    // startingScreen(){
    //     if(this.title){
    //        this.game.addEntityBackground(new Castle(this.game, 0, 0));
    //         if(this.game.click){
    //         this.loadGame = true;
    //         this.title = false;
    //         }
            
    //     }
    // }

    setRoundMonters() {
        this.roundMonster.push([2,1]);
        this.roundMonster.push([2,0]);
        this.roundMonster.push([3,1]);
        this.roundMonster.push([3,0]);
        while(this.monsters[0] > 0 || this.monsters[1] > 0 ) {
            let enemy = Math.round(Math.random());
            if(enemy === 0 && this.monsters[0] > 0) {
                this.monsters[0] --;
                this.roundMonster.push([0,Math.round(Math.random())]);
            } else if (enemy === 1 && this.monsters[1] > 0) {
                this.monsters[1] --;
                this.roundMonster.push([1,Math.round(Math.random())]);
            }
        }

        this.roundMonterProgress = this.roundMonster.length-1;
    }

    spawnEnemy(){
        console.log(this.roundMonterProgress);
        if (this.roundMonterProgress >= 0) {
            var currentMonster = this.roundMonster[this.roundMonterProgress];
            if (currentMonster[0] === 0) {
                this.game.addEntityEnemies(new Snake(this.game,currentMonster[1] == 1 ? -50 : 1320,currentMonster[1]));
            } else if (currentMonster[0] === 1) {
                this.game.addEntityEnemies(new Mage(this.game,currentMonster[1] == 1 ? -50 : 1320,currentMonster[1]));
            } else if (currentMonster[0] === 2) {
                //this.game.addEntityEnemies(new Ogre(this.game,currentMonster[1] == 1 ? -50 : 1320,currentMonster[1]));
            } else if (currentMonster[0] === 3) {
                //this.game.addEntityEnemies(new Skeleton(this.game,currentMonster[1] == 1 ? -50 : 1320,currentMonster[1]));
            }
            this.roundMonterProgress--;
        }
        
    } 
}

