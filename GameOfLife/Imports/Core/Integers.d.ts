export interface Int {
    getValue(): number;
    each(body: (x: Int) => void): void;
    mod(n: Int): Int;
    minus(n: Int): Int;
    pred(): Int;
    succ(): Int;
}
export declare function int(value: number): Int;
