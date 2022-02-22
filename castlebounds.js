class CastleBounds {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.healthbar = ASSET_MANAGER.getAsset("./resources/background/healthgreen.jpg");
        this.healthbarred = ASSET_MANAGER.getAsset("./resources/background/healthred.jpg");
        this.loadProperties();
        this.updateBB();
    };

    loadProperties() {
        this.MAX_HEALTH = 1000;
        this.health = this.MAX_HEALTH;
        this.dead = false;
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(480, 185, 290, 395);
    }

    collisionUpdate() {
        var that = this;
        this.game.entities[1].forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) { //run into enemies
                if (entity instanceof SmallFireBall) {
                    that.health -= 10;
                    entity.removeFromWorld = true;
                }
                
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
    };

}