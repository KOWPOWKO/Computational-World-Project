class Ground {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(-1000,578, 3280, 150);
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