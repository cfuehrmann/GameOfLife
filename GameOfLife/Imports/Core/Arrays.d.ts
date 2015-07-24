export declare class Array2D<T> {
    height: number;
    width: number;
    private matrix;
    constructor(height: number, width: number, initialValue: T);
    set(row: number, column: number, value: T): void;
    get(row: number, column: number): T;
}
