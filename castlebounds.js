class CastleBounds {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
        this.healthbarGold = ASSET_MANAGER.getAsset("./resources/background/gold.png");
        this.loadProperties();
        this.updateBB();
    };

    loadProperties() {
        this.MAX_HEALTH = 1000;
        this.health = this.MAX_HEALTH;
        this.dead = false;
        this.MAX_SHIELD = 1000;
        this.shield = 0;
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(480, 185, 290, 395);
    }

    collisionUpdate() {
        var that = this;
        this.game.entities[1].forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) { //run into enemies
                if (entity instanceof SmallFireBall || entity instanceof FireBall) {
                    if (that.shield > 0) {
                        that.shield -= entity instanceof SmallFireBall ? 10 : 20;
                    } else if (that.shield <= 0){
                        that.shield = 0;
                        that.health -= entity instanceof SmallFireBall ? 10 : 20;
                    }
                    entity.removeFromWorld = true;
                }
                ASSET_MANAGER.playAsset("./resources/sound/playerHurt.mp3");
                
            }
        })
        this.game.entities[3].forEach(function (entity) {
            if(entity instanceof CastleShield) {
                that.shield = that.MAX_SHIELD;
                entity.removeFromWorld = true;
            } 

            
        })
    }

    update () {
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }

        this.collisionUpdate();
    };

    draw(ctx) {
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
        ctx.drawImage(this.healthbarred, this.BB.x, this.BB.y - 10, this.BB.width, 5);
        ctx.drawImage(this.healthbar, this.BB.x, this.BB.y - 10, this.BB.width * (this.health / this.MAX_HEALTH), 5);
        ctx.drawImage(this.healthbarGold, this.BB.x, this.BB.y - 3, this.BB.width * (this.shield/ this.MAX_SHIELD), 5);
    };

}