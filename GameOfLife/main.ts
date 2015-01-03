/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Numbers = require("./Imports/Core/Numbers");
import Rendering = require("./Rendering");
import Renderer = Rendering.Renderer;
import List = require("./Imports/Core/List");
import Interface = require("./Interface");
import PointMap = Interface.PointMap;
/* tslint:enable no-unused-variable*/

module Main {
    "use strict";
    export function exec() {
        var size = 200;
        var canvas = new CanvasPointMap(size, size, 2);
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
        var w = sceneA.width;
        var h = sceneA.height;

        for (var column = 0; column < w; column++) {
            for (var row = 0; row < h; row++) {

                var u = Numbers.mod(row - 1, h);
                var r = Numbers.mod(column + 1, w);
                var d = Numbers.mod(row + 1, h);
                var l = Numbers.mod(column - 1, w);

                // the following is too slow to be run inside this loop;
                // var count =
                //    List.from([[u, column], [u, r], [row, r], [d, r], [d, column], [d, l], [row, l], [u, l]]).
                //        map((pair: [number, number]) => sceneA.get(pair[0], pair[1]) ? 1 : 0).
                //        fold(0, (x: number, y: number) => x + y);

                var count =
                    (sceneA.get(u, column) ? 1 : 0) +
                    (sceneA.get(u, r) ? 1 : 0) +
                    (sceneA.get(row, r) ? 1 : 0) +
                    (sceneA.get(d, r) ? 1 : 0) +
                    (sceneA.get(d, column) ? 1 : 0) +
                    (sceneA.get(d, l) ? 1 : 0) +
                    (sceneA.get(row, l) ? 1 : 0) +
                    (sceneA.get(u, l) ? 1 : 0);

                sceneB.set(row, column,
                    sceneA.get(row, column) ?
                    count >= 2 && count <= 3 :
                    count === 3);
            }
        }
    }

    class CanvasPointMap implements PointMap<boolean> {

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