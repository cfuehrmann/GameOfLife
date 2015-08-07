﻿import Arrays = require("./Imports/Core/Arrays");
import StandardRenderer = require("./StandardRenderer");
import CanvasPointMap = require("./CanvasPointMap");
import StandardTransformer = require("./StandardTransformer");
import Array2D = Arrays.Array2D;

module Main {
    "use strict";

    function getParts(parameters: Parameter[], parameterName: string) {
        return parameters.filter(p => p.name === parameterName)[0].value.split(",")
            .slice(0, -1).map(v => parseInt(v, 10));
    }

    function getParameter(s: string): Parameter {
        const nv = s.split("=");
        return <Parameter>{ name: nv[0], value: nv[1] };
    }

    function getParameters(queryString: string): Parameter[] {
        return queryString.substr(1).split("&").map(getParameter);
    }

    export function exec() {
        const parameters = getParameters(location.search);
        const survival = getParts(parameters, "survival");
        const birth = getParts(parameters, "birth");
        const width = Math.floor(window.innerWidth / 2) - 12;
        const height = Math.floor(window.innerHeight / 2) - 12;
        const pointMap = CanvasPointMap.create(height, width, 2);
        document.getElementById("content").appendChild(pointMap.node);
        var renderer = StandardRenderer.create(pointMap);
        var currentWorld = new Array2D(height, width, false);
        var nextWorld = new Array2D(height, width, false);

        for (let row = 0; row < height; row++) {
            for (let column = 0; column < width; column++) {
                currentWorld.set(row, column, Math.random() < 0.5001);
            }
        }

        var transformer = StandardTransformer.create(survival, birth);

        var i = 0;

        setInterval(() => {
            renderer.render(currentWorld);
            transformer.transform(currentWorld, nextWorld);
            var h = currentWorld;
            currentWorld = nextWorld;
            nextWorld = h;

            i++;
        }, 50);
    }

    interface Parameter {
        name: string;
        value: string;
    }
}


Main.exec();