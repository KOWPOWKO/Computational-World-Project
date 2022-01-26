class Castle {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/background.jpg");
        this.SCALE = 3;
    };
    update () {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 1280, 720);

    
    };
}