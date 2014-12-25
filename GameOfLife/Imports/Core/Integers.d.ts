export declare class Int {
    private value;
    private static range;
    constructor(value: number);
    getValue(): number;
    each(body: (x: Int) => void): void;
}
