import XXX = require('./Interfaces/Scene');
import Scene = XXX.Scene;
import YYY = require('./ArrayScene');
import ArrayScene = YYY.ArrayScene;
import Integers = require('./Imports/Core/Int');
import Int = Integers.Int;

export class Foo {
    Do(el: HTMLElement): void {
        var x = new Int(42);
        el.innerHTML = el.innerHTML + x.getValue();
    }
}

class Renderer {
    render(ctx: CanvasRenderingContext2D, scene: Scene) {
        ctx.fillStyle = "rgb(" + String(255) + ", " + String(0) + ", " + String(0) + ")";
        for (var y = 0; y < scene.height; y++) {
            for (var x = 0; x < scene.width; x++) {
                if (scene.getPoint(new Int(x), new Int(y))) {
                    ctx.fillRect(x * 10, y * 10, 10, 10);
                }
            }
        }
    }
}

module Bla {
    "use strict";
    export function exec() {
        var canv = document.createElement("canvas");
        canv.width = 100 * 10;
        canv.height = 100 * 10;
        document.body.appendChild(canv);
        var ctx = canv.getContext("2d");
        var renderer = new Renderer();
        var scene = new ArrayScene(100, 100);
        return renderer.render(ctx, scene);
    }
}

window.onload = function () {
    Bla.exec();
};

var el = document.getElementById('content');
el.innerHTML = "Blah";
var x = new Foo();
x.Do(el);
