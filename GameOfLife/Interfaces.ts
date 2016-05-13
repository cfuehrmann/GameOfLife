import {Array2D} from "Imports/Core/Arrays";

export interface RectRenderingContext {
    clearRect(x: number, y: number, w: number, h: number): void;
    fillRect(x: number, y: number, w: number, h: number): void;
}

export interface Transformer<T> {
    transform(currentWorld: Array2D<T>, nextWorld: Array2D<T>): void;
}

export interface Renderer {
    render(world: Array2D<boolean>): void;
}