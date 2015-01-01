export interface PointMap<T> {
    clear(): void;
    drawPoint(x: number, y: number, value: T): void;
}
