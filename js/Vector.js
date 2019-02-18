function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.invert = function () {
    return new Vector(- this.x, - this.y);
};

Vector.prototype.addX = function (dx) {
    return new Vector(this.x + dx, this.y);
};

Vector.prototype.addY = function (dy) {
    return new Vector(this.x, this.y + dy);
};

Vector.prototype.isZero = function () {
    return this.x === 0 && this.y === 0;
};

Vector.prototype.rotateByDegree = function (degree) {
    var angle = degree * Math.PI / 180;
    var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    var y = this.y * Math.cos(angle) + this.x * Math.sin(angle);
    return new Vector(x, y);
};

Vector.prototype.rotateByDegreeInt = function (degree) {
    var v = this.rotateByDegree(degree);
    return new Vector(Math.round(v.x), Math.round(v.y));
};

Vector.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};