class TimeStop {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/timeWatch.png");
        this.elapsed = 0;
    };
    
    update () {
        this.elapsed += this.game.clockTick;

    };

    draw(ctx) {
        if(this.elapsed < 15) ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class DamageIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/damageIncrease.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class SpeedIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/times2.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class SizeIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/arrow.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class Invincibility {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/star.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class ArrowShooter {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/powerUp1.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class HealthIncrease {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/healthIncrease.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class SpeedSKiilP{
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/speedDisplay.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class CoolDown {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/cooldown.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class Shield {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/shield.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class SonicWave {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/sonicwave.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
class Lazer {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/powerUps/lazerbeam.png");

    };
    
    update () {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x,this.y);
    };
};
