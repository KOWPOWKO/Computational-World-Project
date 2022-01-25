class Castle {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/castle.png");
        this.SCALE = 3;
    };
    update () {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 450, 160, 50 * this.SCALE, 155 * this.SCALE);
        ctx.drawImage(this.spritesheet, 650, 160, 50 * this.SCALE, 155 * this.SCALE);
    
    };
}