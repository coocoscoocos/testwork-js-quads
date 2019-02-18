function Quad(container, x, y, size) {
    this.container = container;
    this.x = x;
    this.y = y;
    this.size = size;
    this.setRandomSpeed();
    this.element = document.createElement("div");
    this.element.setAttribute("class", "quad");
    container.appendChild(this.element);
}

Quad.prototype.setSpeed = function (speedVec) {
    this.speedX = speedVec.x;
    this.speedY = speedVec.y;
};

Quad.prototype.tick = function () {
    this.checkCollisionWithEdge();
    this.x += this.speedX;
    this.y += this.speedY;
    this.redraw();
};

Quad.prototype.redraw = function () {
    if (null === this.element) {
        return;
    }
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.width = this.size + "px";
    this.element.style.height = this.size + "px";
};

Quad.prototype.setRandomSpeed = function () {
    this.speedX = Math.round(Math.random() * 2) - 1;
    if (this.speedX === 0) {
        this.speedY = Math.round(Math.random()) ? 1 : -1;
    } else {
        this.speedY = Math.round(Math.random() * 2) - 1;
    }
};

Quad.prototype.checkCollisionWithEdge = function () {
    if (this.x <= 0 || (this.x + this.size >= this.container.clientWidth)) {
        this.speedX = - this.speedX;
        this.speedY = Math.round(Math.random()) ? 1 : -1
    } else if (this.y <= 0 || (this.y + this.size >= this.container.clientHeight)) {
        this.speedX = Math.round(Math.random()) ? 1 : -1;
        this.speedY = - this.speedY;
    }
};

Quad.prototype.getCollisionWithQuad = function (quad) {
    var vector = new Vector(0, 0);
    if (!(quad instanceof Quad)) {
        return vector;
    }
    var tx1 = this.x;
    var tx2 = this.x + this.size;
    var ty1 = this.y;
    var ty2 = this.y + this.size;
    var qx1 = quad.x;
    var qx2 = quad.x + quad.size;
    var qy1 = quad.y;
    var qy2 = quad.y + quad.size;
    var hasCollision = tx1 <= qx2 &&
        tx2 >= qx1 &&
        ty1 <= qy2 &&
        ty2 >= qy1;
    if (!hasCollision) {
        return vector;
    }
    var dx = Math.abs(tx1 - qx1);
    var dy = Math.abs(ty1 - qy1);
    if (dy <= dx) {
        // слева
        if (tx1 <= qx2 && tx1 >= qx1) {
            vector = vector.addX(-1);
        // справа
        } else if (tx2 >= qx1 && tx1 <= qx1) {
            vector = vector.addX(1);
        }
    }
    if (dy >= dx) {
        // сверху
        if (ty1 <= qy2 && ty1 >= qy1) {
            vector = vector.addY(-1);
        // снизу
        } else if (ty2 >= qy1 && ty1 <= qy1) {
            vector = vector.addY(1);
        }
    }
    return vector;
};

Quad.prototype.destroy = function () {
    if (null !== this.element) {
        this.container.removeChild(this.element);
        this.element = null;
    }
};