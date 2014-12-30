/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;
import Rendering = require("./Rendering");
import Renderer = Rendering.Renderer;
import Interface = require("./Interface");
import PointMap = Interface.PointMap;
import int = Integers.int;
/* tslint:enable no-unused-variable*/

module Main {
    "use strict";
    export function exec() {
        var size = int(100);
        var canvas = new HTMLCanvas(size, size, int(5));
        document.body.appendChild(canvas.node);
        var renderer = new Renderer(canvas);
        var scenes = [new Array2D(size, size, false),
            new Array2D(size, size, false)];
        size.each(row => {
            size.each(column => {
                scenes[0].set(row, column, Math.random() < 0.5);
            });
        });

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
        }, 100);

        //for (var i = 0; i < 1000000; i++) {
        //        if (i % 2 === 0) {
        //            renderer.render(scenes[0]);
        //            transform(scenes[0], scenes[1]);
        //        } else {
        //            renderer.render(scenes[1]);
        //            transform(scenes[1], scenes[0]);
        //        }
        //    }
    }

    function transform(sceneA: Array2D<boolean>, sceneB: Array2D<boolean>) {
        sceneA.getWidth().each(column => {
            sceneA.getHeight().each(row => {

                var w = sceneA.getWidth();
                var h = sceneA.getHeight();

                var count = 0;
                if (sceneA.get(
                    row.pred().mod(h),
                    column)) {
                    count++;
                }
                if (sceneA.get(
                    row.pred().mod(h),
                    column.succ().mod(w))) {
                    count++;
                }
                if (sceneA.get(
                    row,
                    column.succ().mod(w))) {
                    count++;
                }
                if (sceneA.get(
                    row.succ().mod(h),
                    column.succ().mod(w))) {
                    count++;
                }
                if (sceneA.get(
                    row.succ().mod(h),
                    column)) {
                    count++;
                }
                if (sceneA.get(
                    row.succ().mod(h),
                    column.pred().mod(w))) {
                    count++;
                }
                if (sceneA.get(
                    row,
                    column.pred().mod(w))) {
                    count++;
                }
                if (sceneA.get(
                    row.pred().mod(h),
                    column.pred().mod(w))) {
                    count++;
                }

                if (!sceneA.get(row, column)) {
                    sceneB.set(row, column, count === 3);
                } else {
                    sceneB.set(row, column, count >= 2 && count <= 3);
                }
            });
        });
    }

    class HTMLCanvas implements PointMap<boolean> {

        private canvasElement: HTMLCanvasElement;
        private width: Int;
        private height: Int;
        private pointSize: Int;
        private ctx: CanvasRenderingContext2D;
        public node: Node;

        constructor(width: Int, height: Int, pointSize: Int) {
            this.canvasElement = document.createElement("canvas");
            this.canvasElement.width = width.getValue() * pointSize.getValue();
            this.canvasElement.height = height.getValue() * pointSize.getValue();
            this.ctx = this.canvasElement.getContext("2d");
            this.ctx.fillStyle = "rgb(" + String(255) + ", " + String(0) + ", " + String(0) + ")";
            this.width = width;
            this.height = height;
            this.pointSize = pointSize;
            this.node = this.canvasElement;
        }

        clear(): void {
            this.ctx.clearRect(0, 0,
                this.width.getValue() * this.pointSize.getValue(),
                this.height.getValue() * this.pointSize.getValue());
        }

        drawPoint(x: Int, y: Int, value: boolean) {
            if (value) {
                this.ctx.fillRect(
                    x.getValue() * this.pointSize.getValue(),
                    y.getValue() * this.pointSize.getValue(),
                    this.pointSize.getValue(),
                    this.pointSize.getValue());
            }
        }
    }
}


Main.exec();