class Ground {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/ground.png");

    };

    update () {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 570, 1280, 150);
    };
}