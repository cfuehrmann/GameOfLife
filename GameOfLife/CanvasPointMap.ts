import Interface = require("Interfaces");
import TypeChecking = require("Imports/Core/TypeChecking");
import PointMap = Interface.PointMap;
import assertInt = TypeChecking.assertInt;

export function create(height: number, width: number): PointMap {
    return new CanvasPointMap(height, width);
}

class CanvasPointMap implements PointMap {

    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    node: Node;

    constructor(private width: number, private height: number) {
        assertInt("width", width);
        assertInt("height", height);
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = width;
        this.canvasElement.height = height;
        this.ctx = <CanvasRenderingContext2D>this.canvasElement.getContext("2d");
        this.ctx.fillStyle = "rgb(" + String(0) + ", " + String(0) + ", " + String(0) + ")";
        this.node = this.canvasElement;
    }

    clearRect(x: number, y: number, w: number, h: number): void {
        this.ctx.clearRect(x, y, w, h);
    }

    fillRect(x: number, y: number, w: number, h: number) {
        this.ctx.fillRect(x, y, w, h);
    }
}