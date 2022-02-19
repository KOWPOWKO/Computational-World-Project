class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.END = false;
        this.LEFT = 0;
        this.RIGHT = 1; 
        this.monsters = [[5,0],[5,2]];
        this.roundMonster = [];
        this.roundMonterProgress = 0;
        this.roundNumber = 0;
        this.title = true;
        this.loadGame = false;
        //this.game.click = false;
        //this.update();
        this.mainMenu();
        
        
    };
    clearEntities() {
        this.game.entities[0].forEach(function (entity) {
            entity.removeFromWorld = true;
        });
        this.game.entities[1].forEach(function (entity) {
            entity.removeFromWorld = true;
        });
        this.game.entities[2].forEach(function (entity) {
            entity.removeFromWorld = true;
        });
        this.game.entities[3].forEach(function (entity) {
            entity.removeFromWorld = true;
        });

    };

    mainMenu() {

        this.game.addEntityBackground(new StartingScreen(this.game, 0, 0));
        
    }

    gameOver() {
        PARAMS.SCORE = 0;
        this.game.addEntityBackground(new GameOver(this.game, 0, 0));
    }

    loadWorld() {
        //player        
       // this.startingScreen();
      
        this.clearEntities();
        this.game.addEntityForeground(new Coin(this.game,50,0));
        //this.game.addEntity(new Character_2(this.game,0,0));
        this.game.addEntityForeground(new Hero(this.game,0,0));
        //this.game.addEntityEnemies(new DragonBoss(this.game,1240,0));


        
        //background props
        this.game.addEntityBackground(new BirdBrown(this.game,-325,this.RIGHT));
        this.game.addEntityBackground(new BirdBrown(this.game,1412,this.LEFT));

        //background
        this.game.addEntityBackground(new Ground(this.game, 0, 0));
        this.game.addEntityBackground(new CastleBounds(this.game, 0, 0));
        this.game.addEntityBackground(new Chest(this.game,530,535));
        
        
        //this.game.addEntityBackground(new Coin(this.game,50,0));
        //this.game.addEntityBackground(new Score(this.game));
        this.game.addEntityBackground(new Sun(this.game, 180, 150));
        this.game.addEntityBackground(new Castle(this.game, 0, 0));
    }
    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

    
        console.log(this.roundNumber);
        /*
        if (this.loadGame == false) {
            this.loadWorld();
            this.loadGame = true;
        }
        */
        var that = this;
        
        this.game.entities[2].forEach(function (entity) {
            if(entity instanceof StartingScreen && (entity.loadGame == true) && (entity.loaded == false)) {
                that.loadGame = true;
                that.loadWorld();
                that.setRoundMonters();
                entity.loaded = true;
                entity.removeFromWorld = true;
            }
            if(entity instanceof CastleBounds && (entity.dead == true)) {
                that.loadGame = false;
                that.clearEntities();
                that.roundNumber = 0;
                that.loadGame
                that.gameOver();
            }
            if(entity instanceof GameOver && (entity.restart == true)) {
                that.loadGame = true;
                that.loadWorld();
                that.setRoundMonters();
                entity.removeFromWorld = true;
            }
        })

        this.game.entities[0].forEach(function (entity) {
            if (entity instanceof Hero && (entity.finishDead == true)) {
                that.loadGame = false;
                that.clearEntities();
                that.roundNumber = 0;
                that.gameOver();
            }
        })
        console.log(this.game.entities[1].length <= 0)
        console.log(this.roundMonterProgress <= 0)
        if (this.game.entities[1].length <= 0 && this.roundMonterProgress <= 0 && !this.END && this.loadGame) {
            console.log(this.game.entities[1]);
            this.roundNumber += 1;
            this.setRoundMonters();
        }
    }
    draw(ctx) {
        
    }


    setRoundMonters() {
        if(this.roundNumber <= this.monsters.length-1) {
            var snakeCount = this.monsters[this.roundNumber][0];
            var mageCount = this.monsters[this.roundNumber][1];
            while(snakeCount > 0 || mageCount > 0 ) {
                let enemy = Math.round(Math.random());
                if(enemy === 0 && snakeCount > 0) {
                    snakeCount --;
                    this.roundMonster.push([0,Math.round(Math.random())]);
                } else if (enemy === 1 && mageCount > 0) {
                    mageCount --;
                    this.roundMonster.push([1,Math.round(Math.random())]);
                }
            }
            this.roundMonterProgress = this.roundMonster.length-1;
        } else {
            this.loadGame = false;
            this.clearEntities();
            this.roundNumber = 0;
            this.END = true;
            this.game.addEntityBackground(new Win(this.game,this), 0, 0);
        }
    }

    spawnEnemy(){
        if (this.loadGame == true) {
            if (this.roundMonterProgress >= 0) {
                var currentMonster = this.roundMonster[this.roundMonterProgress];
                this.roundMonster.splice(this.roundMonterProgress, 1);
                if (currentMonster[0] === 0) {
                    this.game.addEntityEnemies(new Snake(this.game,currentMonster[1] == 1 ? -50 : 1320,currentMonster[1]));
                } else if (currentMonster[0] === 1) {
                    this.game.addEntityEnemies(new Mage(this.game,currentMonster[1] == 1 ? -50 : 1320,currentMonster[1]));
                } else if (currentMonster[0] === 2) {
                    //this.game.addEntityEnemies(new Ogre(this.game,currentMonster[1] == 1 ? -50 : 1320,currentMonster[1]));
                } else if (currentMonster[0] === 3) {
                    //this.game.addEntityEnemies(new Skeleton(this.game,currentMonster[1] == 1 ? -50 : 1320,currentMonster[1]));
                }
                this.roundMonterProgress -= 1;
            }
        }
        
        
    } 
}

