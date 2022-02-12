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
class DamageIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/damageIncrease.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y, 96,96);
    };
};
class SpeedIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/times2.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y, 96,96);
    };
};
class SizeIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/arrow.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y, 96,96);
    };
};
class Invincibility {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/star.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y, 96,96);
    };
};