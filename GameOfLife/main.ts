import Interface = require("./Interface");
import Scene = Interface.Scene;
import Implementation = require("./Implementation");
import ArrayScene = Implementation.ArrayScene;
import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;

class Renderer {
    render(ctx: CanvasRenderingContext2D, scene: Scene) {
        ctx.fillStyle = "rgb(" + String(255) + ", " + String(0) + ", " + String(0) + ")";
        for (var y = 0; y < scene.getHeight().getValue(); y++) {
            for (var x = 0; x < scene.getWidth().getValue(); x++) {
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
        var scene = new ArrayScene(new Int(100), new Int(100));
        scene.setPoint(new Int(10), new Int(10), true);
        return renderer.render(ctx, scene);
    }
}

// window.onload = function () {
//    Bla.exec();
// };

Bla.exec();