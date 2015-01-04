export interface PointMap<T> {
    clear(): void;
    drawPoint(row: number, column: number, value: T): void;
}
