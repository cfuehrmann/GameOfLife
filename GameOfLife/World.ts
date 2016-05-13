import {Array2D} from "Imports/Core/Arrays";
import * as RectRenderer from "RectRenderer";
import * as GameOfLifeTransformer from "GameOfLifeTransformer";

interface Parameter {
    name: string;
    value: string;
}

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

const parameters = getParameters(location.search);
const survival = getParts(parameters, "survival");
const birth = getParts(parameters, "birth");

const pointSize = 2;

const width = Math.floor(window.innerWidth / pointSize) - 12;
const height = Math.floor(window.innerHeight / pointSize) - 12;

const canvasElement = document.createElement("canvas");
canvasElement.width = width * pointSize;
canvasElement.height = height * pointSize;

const ctx = <CanvasRenderingContext2D>canvasElement.getContext("2d");
ctx.fillStyle = "rgb(" + String(0) + ", " + String(0) + ", " + String(0) + ")";

document.getElementById("content").appendChild(canvasElement);

const renderer = RectRenderer.create(ctx, pointSize);

let currentWorld = new Array2D(height, width, false);
let nextWorld = new Array2D(height, width, false);

for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
        currentWorld.set(row, column, Math.random() < 0.5001);
    }
}

const transformer = GameOfLifeTransformer.create(survival, birth);

setInterval(() => {
    renderer.render(currentWorld);

    transformer.transform(currentWorld, nextWorld);

    const h = currentWorld;
    currentWorld = nextWorld;
    nextWorld = h;
}, 50);