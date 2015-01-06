/* tslint:disable no-unused-variable*/
import Interface = require("./Interfaces");
import PointMap = Interface.PointMap;
/* tslint:enable no-unused-variable*/

export function create(height: number, width: number, pointSize: number): PointMap<boolean> {
    return new CanvasPointMap(height, width, pointSize);
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
