"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elem = document.getElementById("canvas");
var canvas_width = 500;
var canvas_height = 400;
elem.width = canvas_width;
elem.height = canvas_height;
var canvas = elem.getContext("2d");
// Draw grids.
canvas.beginPath();
canvas.strokeStyle = "lightgrey";
canvas.lineWidth = 1;
canvas.lineCap = 'round';
canvas.shadowColor = "none";
for (var i = 0; i <= canvas_width / 100; i++) {
    canvas.moveTo(i * 100, 0);
    canvas.lineTo(i * 100, canvas_height);
    canvas.stroke();
}
for (var i = 0; i <= canvas_height / 100; i++) {
    canvas.moveTo(0, i * 100);
    canvas.lineTo(canvas_width, i * 100);
    canvas.stroke();
}
canvas.closePath();
// END DRAWING GRIDS.
canvas.beginPath();
canvas.strokeStyle = "green";
canvas.lineWidth = 2;
canvas.lineCap = 'round';
canvas.shadowColor = "green";
canvas.shadowBlur = 0;
canvas.shadowOffsetX = 0;
canvas.shadowOffsetY = 0;
var Execution = /** @class */ (function () {
    function Execution() {
    }
    Execution.callFunc = function (func) {
        var _this = this;
        console.log("Called Function");
        this.done = false;
        func(function () {
            _this.done = true;
            _this.dequeue();
        });
    };
    Execution.dequeue = function () {
        console.log("Dequed", this.list);
        if (this.list.length == 0) {
            return;
        }
        var ref = this.list[0];
        this.list.splice(0, 1);
        this.callFunc(ref);
    };
    Execution.queue = function (func) {
        console.log("Queed", this.list);
        if (this.done) {
            this.callFunc(func);
        }
        else {
            this.list.push(func);
        }
    };
    Execution.list = [];
    Execution.done = true;
    return Execution;
}());
// Canvas API for users.
var g_x = 0, g_y = 0;
exports.Canvas = {
    moveTo: function (x, y) {
        Execution.queue(function (done) {
            g_x = x;
            g_y = y;
            canvas.moveTo(x, y);
            done();
        });
    },
    lineTo: function (x, y) {
        var move_unit = 10;
        Execution.queue(function (done) {
            // Interpolate logic goes here...
            var d = Math.sqrt(Math.pow(g_x - x, 2) + Math.pow(g_y - y, 2));
            var interpolateX = (move_unit / d) * (x - g_x);
            var interpolateY = (move_unit / d) * (y - g_y);
            var nextX = g_x, nextY = g_y;
            var interval = setInterval(function () {
                if (Math.abs(nextX - x) <= move_unit && Math.abs(nextY - y) <= move_unit) {
                    nextX = x;
                    nextY = y;
                }
                else {
                    nextX += interpolateX;
                    nextY += interpolateY;
                }
                canvas.lineTo(nextX, nextY);
                canvas.stroke();
                if (x == nextX && y == nextY) {
                    g_x = x, g_y = y;
                    clearInterval(interval);
                    interval = null;
                    done();
                }
            }, 10);
        });
    }
};
