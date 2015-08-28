import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;

export interface PointMap {
    clear(): void;
    drawPoint(row: number, column: number): void;
    node: any;
}

export interface Transformer<T> {
    transform(currentWorld: Array2D<T>, nextWorld: Array2D<T>): void;
}

export interface Renderer {
    render(world: Array2D<boolean>): void;
}