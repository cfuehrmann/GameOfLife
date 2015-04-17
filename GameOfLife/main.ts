/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Numbers = require("./Imports/Core/Numbers");
import Interface = require("./Interfaces");
import StandardRenderer = require("./StandardRenderer");
import CanvasPointMap = require("./CanvasPointMap");
import StandardTransformer = require("./StandardTransformer");
/* tslint:enable no-unused-variable*/

module Main {
    "use strict";
    export function exec() {
        var survival = getParameterByName("survival").split(",").map(s => parseInt(s, 10));
        var width = 400;
        var height = 200;
        var pointMap = CanvasPointMap.create(height, width, 2);
        document.body.appendChild(pointMap.node);
        var renderer = StandardRenderer.create(pointMap);
        var currentWorld = new Array2D(height, width, false);
        var nextWorld = new Array2D(height, width, false);

        for (var row = 0; row < height; row++) {
            for (var column = 0; column < width; column++) {
                currentWorld.set(row, column, Math.random() < 0.5001);
            }
        }

        var transformer = StandardTransformer.create(survival, [3]);

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

    function getParameterByName(name : string) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

Main.exec();