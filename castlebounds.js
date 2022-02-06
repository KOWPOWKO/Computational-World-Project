class CastleBounds {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(480, 185, 290, 395);
    }

    update () {

    };

    draw(ctx) {
        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };

}