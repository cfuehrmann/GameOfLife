export interface IntSeq {
    For(body: (i: Int) => void): void;
}
export declare class Int {
    private value;
    constructor(value: number);
    public getRange(): IntSeq;
    public getValue(): number;
}
