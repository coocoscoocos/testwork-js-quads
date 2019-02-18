function Game(container, startCount, startQuadSize, minQuadSize) {
    this.container = container;
    this.startCount = startCount;
    this.startQuadSize = startQuadSize;
    this.minQuadSize = minQuadSize;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.init();
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.timeoutHandler();
}

Game.prototype.init = function () {
    this.quads = [];
    this.newQuads = [];
    for (var i = 0 ; i < this.startCount ; i++) {
        var x = Math.round(Math.random() * (this.width - this.startQuadSize));
        var y = Math.round(Math.random() * (this.height - this.startQuadSize));
        this.quads.push(new Quad(this.container, x, y, this.startQuadSize));
    }
};

Game.prototype.emitSmallQuads = function (quad, dirVec) {
    if (quad.size > this.minQuadSize) {
        var halfSize = Math.floor(quad.size / 2);
        var centerX = quad.x + halfSize;
        var centerY = quad.y + halfSize;
        var speed1Vec = dirVec.rotateByDegreeInt(180 - 45);
        var speed2Vec = dirVec.rotateByDegreeInt(- (180 - 45));
        var smallQuad1 = new Quad(this.container, centerX + speed1Vec.x * halfSize, centerY + speed1Vec.y * halfSize, halfSize);
        smallQuad1.setSpeed(speed1Vec);
        this.newQuads.push(smallQuad1);
        var smallQuad2 = new Quad(this.container, centerX + speed2Vec.x * halfSize, centerY + speed2Vec.y * halfSize, halfSize);
        smallQuad2.setSpeed(speed2Vec);
        this.newQuads.push(smallQuad2);
    }
};

Game.prototype.processCollisions = function () {
    var removedIndexes = [];
    for (var i in this.quads) {
        var quad = this.quads[i];
        for (var j in this.quads) {
            if (i === j) {
                continue;
            }
            if (removedIndexes.indexOf(i) >= 0 || removedIndexes.indexOf(j) >= 0) {
                continue;
            }
            var quad2 = this.quads[j];
            var colVec = quad.getCollisionWithQuad(quad2);
            if (!colVec.isZero()) {
                console.log("coll");
                this.emitSmallQuads(quad, colVec);
                this.emitSmallQuads(quad2, colVec.invert());
                quad.destroy();
                quad2.destroy();
                removedIndexes.push(i);
                removedIndexes.push(j);
            }
        }
    }
    var removedIndexesSorted = removedIndexes.sort(function (a, b) { return b - a });
    for (var r in removedIndexesSorted) {
        this.quads.splice(removedIndexesSorted[r], 1);
    }
    for (i in this.newQuads) {
        this.quads.push(this.newQuads[i]);
    }
    this.newQuads = [];
};

Game.prototype.timeoutHandler = function () {
    this.processCollisions();
    for (i in this.quads) {
        this.quads[i].tick();
    }
    if (this.quads.length <= 1) {
        alert("GAME OVER");
    }
    setTimeout(this.timeoutHandler.bind(this), 30);
};

Game.prototype.handleClick = function (event) {
    var isInBox = event.clientX < (this.width - this.startQuadSize) &&
        event.clientY < (this.height - this.startQuadSize);
    if (isInBox) {
        this.quads.push(new Quad(this.container, event.clientX, event.clientY, this.startQuadSize));
    }
};