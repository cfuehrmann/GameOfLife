import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;

export interface PointMap<T> {
    clear(): void;
    drawPoint(row: number, column: number, value: T): void;
    node: any;
}

export interface Transformer<T> {
    transform(currentWorld: Array2D<T>, nextWorld: Array2D<T>): void;
}

export interface Renderer<T> {
    render(world: Array2D<T>): void;
}