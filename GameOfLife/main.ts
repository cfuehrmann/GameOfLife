/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Int = require("./Imports/Core/Numbers");
import Rendering = require("./Rendering");
import Renderer = Rendering.Renderer;
import Interface = require("./Interface");
import PointMap = Interface.PointMap;
/* tslint:enable no-unused-variable*/

module Main {
    "use strict";
    export function exec() {
        var size = 200;
        var canvas = new HTMLCanvas(size, size, 2);
        document.body.appendChild(canvas.node);
        var renderer = new Renderer(canvas);
        var scenes = [new Array2D(size, size, false),
            new Array2D(size, size, false)];
        for (var row = 0; row < size; row++) {
            for (var column = 0; column < size; column++) {
                scenes[0].set(row, column, Math.random() < 0.5);
            }
        }

        var i = 0;

        var source = scenes[0];
        var target = scenes[1];

        setInterval(function () {

            renderer.render(source);
            transform(source, target);
            var h = source;
            source = target;
            target = h;

            i++;
        }, 30);
    }

    function transform(sceneA: Array2D<boolean>, sceneB: Array2D<boolean>) {
        for (var column = 0; column < sceneA.width; column++) {
            for (var row = 0; row < sceneA.width; row++) {
                var w = sceneA.width;
                var h = sceneA.height;

                var up = Int.mod(row - 1, h);
                var right = Int.mod(column + 1, w);
                var down = Int.mod(row + 1, h);
                var left = Int.mod(column - 1, w);

                var count = 0;
                if (sceneA.get(up, column)) { count++; }
                if (sceneA.get(up, right)) { count++; }
                if (sceneA.get(row, right)) { count++; }
                if (sceneA.get(down, right)) { count++; }
                if (sceneA.get(down, column)) { count++; }
                if (sceneA.get(down, left)) { count++; }
                if (sceneA.get(row, left)) { count++; }
                if (sceneA.get(up, left)) { count++; }

                if (!sceneA.get(row, column)) {
                    sceneB.set(row, column, count === 3);
                } else {
                    sceneB.set(row, column, count >= 2 && count <= 3);
                }
            }
        }
    }

    class HTMLCanvas implements PointMap<boolean> {

        private canvasElement: HTMLCanvasElement;
        private width: number;
        private height: number;
        private pointSize: number;
        private ctx: CanvasRenderingContext2D;
        public node: Node;

        constructor(width: number, height: number, pointSize: number) {
            this.canvasElement = document.createElement("canvas");
            this.canvasElement.width = width * pointSize;
            this.canvasElement.height = height * pointSize;
            this.ctx = this.canvasElement.getContext("2d");
            this.ctx.fillStyle = "rgb(" + String(255) + ", " + String(0) + ", " + String(0) + ")";
            this.width = width;
            this.height = height;
            this.pointSize = pointSize;
            this.node = this.canvasElement;
        }

        clear(): void {
            this.ctx.clearRect(0, 0, this.width * this.pointSize, this.height * this.pointSize);
        }

        drawPoint(x: number, y: number, value: boolean) {
            if (value) {
                this.ctx.fillRect(
                    x * this.pointSize,
                    y * this.pointSize,
                    this.pointSize,
                    this.pointSize);
            }
        }
    }
}


Main.exec();