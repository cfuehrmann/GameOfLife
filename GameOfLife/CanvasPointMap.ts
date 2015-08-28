import Interface = require("Interfaces");
import TypeChecking = require("Imports/Core/TypeChecking");
import PointMap = Interface.PointMap;
import assertInt = TypeChecking.assertInt;

export function create(height: number, width: number, pointSize: number): PointMap {
    return new CanvasPointMap(height, width, pointSize);
}

class CanvasPointMap implements PointMap {

    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    node: Node;

    constructor(private height: number, private width: number, private pointSize: number) {
        assertInt("height", height);
        assertInt("width", width);
        assertInt("pointSize", pointSize);
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = width * pointSize;
        this.canvasElement.height = height * pointSize;
        this.ctx = <CanvasRenderingContext2D>this.canvasElement.getContext("2d");
        this.ctx.fillStyle = "rgb(" + String(0) + ", " + String(0) + ", " + String(0) + ")";
        this.node = this.canvasElement;
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.width * this.pointSize, this.height * this.pointSize);
    }

    drawPoint(row: number, column: number) {
        this.ctx.fillRect(
            column * this.pointSize,
            row * this.pointSize,
            this.pointSize,
            this.pointSize);
    }
}