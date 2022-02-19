class Castle {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/background/background.jpg");
    };

    update () {

    };

    draw(ctx) {
        ctx.font = ctx.font.replace(/\d+px/, "18px");
        ctx.drawImage(this.spritesheet, 0, 0, 1280, 720);

    };
}