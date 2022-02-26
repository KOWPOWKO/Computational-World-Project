class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.END = false;
        this.LEFT = 0;
        this.RIGHT = 1; 
        this.monsters = [[5,0,0,0,0],[5,2,0,0,0],[8,2,2,0,0],[10,2,2,1,0],[10,2,0,0,1]];
        this.roundMonster = [];
        this.roundMonterProgress = 0;
        this.title = true;
        this.loadGame = false;
        this.monsterType = 5;
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
        PARAMS.TIME = 0;
        PARAMS.TOTAL = this.monsters.length;
        this.clearEntities();
        //this.game.addEntity(new Character_2(this.game,0,0));
        this.game.addEntityForeground(new Hero(this.game,0,0));
        this.game.addEntityBackground(new Inventory(this.game));
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

    loadProperties() {
        PARAMS.SLOW = 1;
    }
    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        this.loadProperties();
    

        /*
        if (this.loadGame == false) {
            this.loadWorld();
            this.loadGame = true;
        }
        */
        var that = this;
        
        this.game.entities[3].forEach(function (entity) {
            if(entity instanceof TimeStop) {
                if(!PARAMS.PAUSE){
                    entity.startTimer = true;
                    PARAMS.SLOW = 0.1;
                }
            } 
            if(entity instanceof SpeedIncrease) {
                if(!PARAMS.PAUSE){
                    entity.startTimer = true;
                    PARAMS.SPEED = 4;
                }
            } 
        })
        
        
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
                PARAMS.ROUND = 1;
                that.gameOver();
            }
            if(entity instanceof GameOver && (entity.restart == true)) {
                that.loadGame = true;
                that.loadWorld();
                that.setRoundMonters();
                entity.removeFromWorld = true;
            }
            if(entity instanceof Win && (entity.restart == true)) {
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
                PARAMS.ROUND = 1;
                that.gameOver();
            }
        })
        console.log(this.game.entities[1].length <= 0)
        console.log(this.roundMonterProgress <= 0)
        if (this.game.entities[1].length <= 0 && this.roundMonterProgress <= 0 && !this.END && this.loadGame) {
            console.log(this.game.entities[1]);
            PARAMS.ROUND += 1;
            PARAMS.SKILL_POINTS +=1;
            this.setRoundMonters();
        }
    }
    draw(ctx) {
 
    }


    setRoundMonters() {
        if(PARAMS.ROUND <= this.monsters.length) {
            var snakeCount = this.monsters[PARAMS.ROUND - 1][0];
            var mageCount = this.monsters[PARAMS.ROUND - 1][1];
            var ogreCount = this.monsters[PARAMS.ROUND - 1][2];
            var skeletonCount = this.monsters[PARAMS.ROUND - 1][3];
            var dragonCount = this.monsters[PARAMS.ROUND - 1][4];
            while(snakeCount > 0 || mageCount > 0 || ogreCount > 0 || skeletonCount > 0 || dragonCount > 0 ) {
                let enemy = Math.floor(Math.random()*this.monsterType);
                if(enemy === 0 && snakeCount > 0) {
                    snakeCount --;
                    this.roundMonster.push([0,Math.round(Math.random())]);
                } else if (enemy === 1 && mageCount > 0) {
                    mageCount --;
                    this.roundMonster.push([1,Math.round(Math.random())]);
                } else if (enemy === 2 && ogreCount > 0) {
                    ogreCount --;
                    this.roundMonster.push([2,Math.round(Math.random())]);
                }
                else if (enemy === 3 && skeletonCount > 0) {
                    skeletonCount --;
                    this.roundMonster.push([3,Math.round(Math.random())]);
                }
                else if (enemy === 4 && dragonCount > 0) {
                    dragonCount --;
                    this.roundMonster.push([4,Math.round(Math.random())]);
                }
            }
            this.roundMonterProgress = this.roundMonster.length-1;
        } else {
            this.loadGame = false;
            this.clearEntities();
            PARAMS.ROUND = 1;
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
                    this.game.addEntityEnemies(new Snake(this.game,currentMonster[1] == 1 ? -75 : 1320,currentMonster[1]));
                } else if (currentMonster[0] === 1) {
                    this.game.addEntityEnemies(new Mage(this.game,currentMonster[1] == 1 ? -75 : 1320,currentMonster[1]));
                } else if (currentMonster[0] === 2) {
                    this.game.addEntityEnemies(new Ogre(this.game,currentMonster[1] == 1 ? -75 : 1320,currentMonster[1]));
                } else if (currentMonster[0] === 3) {
                    this.game.addEntityEnemies(new Skeleton(this.game,currentMonster[1] == 1 ? -75 : 1320,currentMonster[1]));
                } else if (currentMonster[0] === 4) {
                    this.game.addEntityEnemies(new DragonBoss(this.game,currentMonster[1] == 1 ? -75 : 1320,currentMonster[1]));
                }
                this.roundMonterProgress -= 1;
            }
        }
        
        
    } 
}

