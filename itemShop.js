class TimeStop {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/timeWatch.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y, 96,96);
    };
};