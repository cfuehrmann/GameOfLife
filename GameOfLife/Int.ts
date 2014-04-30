/// <reference path="ArgumentException.ts"/>

class Int {
    private value: number;

    get Value(): number { return this.value; }

    constructor(value: number) {
        if (value % 1 !== 0) {
            throw new ArgumentException("value");
        }
        this.value = value % 1;
    }
}  