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
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(480, 185, 290, 395);
    }

    update () {
        if (this.health <= 0) {
            this.health = 0;
        }
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