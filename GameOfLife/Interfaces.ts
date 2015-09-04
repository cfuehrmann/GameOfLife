import Arrays = require("Imports/Core/Arrays");
import Array2D = Arrays.Array2D;

export interface PointMap {
    clearRect(x: number, y: number, w: number, h: number): void;
    drawPoint(x: number, y: number, w: number, h: number): void;
    node: any;
}

export interface Transformer<T> {
    transform(currentWorld: Array2D<T>, nextWorld: Array2D<T>): void;
}

export interface Renderer {
    render(world: Array2D<boolean>): void;
}