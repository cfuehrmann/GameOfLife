/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Numbers = require("./Imports/Core/Numbers");
import Rendering = require("./Rendering");
import Renderer = Rendering.Renderer;
import Interface = require("./Interface");
import PointMap = Interface.PointMap;
import Transformation = require("./Transformation");
/* tslint:enable no-unused-variable*/

module Main {
    "use strict";
    export function exec() {
        var width = 400;
        var height = 200;
        var pointMap = new CanvasPointMap(height, width, 2);
        document.body.appendChild(pointMap.node);
        var renderer = new Renderer(pointMap);
        var currentWorld = new Array2D(height, width, false);
        var nextWorld = new Array2D(height, width, false);

        for (var row = 0; row < height; row++) {
            for (var column = 0; column < width; column++) {
                currentWorld.set(row, column, Math.random() < 0.5001);
            }
        }

        var transformer = Transformation.getTransformer([2, 3], [3]);

        var i = 0;

        setInterval(function () {
            renderer.render(currentWorld);
            transformer.transform(currentWorld, nextWorld);
            var h = currentWorld;
            currentWorld = nextWorld;
            nextWorld = h;

            i++;
        }, 50);
    }

    class CanvasPointMap implements PointMap<boolean> {

        private canvasElement: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;
        public node: Node;

        constructor(private height: number, private width: number, private pointSize: number) {
            this.canvasElement = document.createElement("canvas");
            this.canvasElement.width = width * pointSize;
            this.canvasElement.height = height * pointSize;
            this.ctx = this.canvasElement.getContext("2d");
            this.ctx.fillStyle = "rgb(" + String(255) + ", " + String(0) + ", " + String(0) + ")";
            this.node = this.canvasElement;
        }

        clear(): void {
            this.ctx.clearRect(0, 0, this.width * this.pointSize, this.height * this.pointSize);
        }

        drawPoint(row: number, column: number, value: boolean) {
            if (value) {
                this.ctx.fillRect(
                    column * this.pointSize,
                    row * this.pointSize,
                    this.pointSize,
                    this.pointSize);
            }
        }
    }
}

Main.exec();