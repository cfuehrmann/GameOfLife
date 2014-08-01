/// <reference path="ArgumentException.ts"/>
import ZZZ = require('./ArgumentException');
import ArgumentException = ZZZ.ArgumentException;

export interface IntSeq {
    For(body: (i: Int) => void): void;
}

export class Int {
    private value: number;

    constructor(value: number) {
        if (value % 1 !== 0) {
            throw new ArgumentException("value");
        }
        this.value = value;
    }

    getRange() : IntSeq { return new IntRange(this); }

    getValue(): number { return this.value; }
}

class IntRange implements IntSeq {
    private count: number;
    private a: Array<Int>;

    constructor(count: Int) {
        this.count = count.getValue();
        this.a = new Array<Int>();
        for (var i = 0; i < count.getValue(); i++) {
            this.a.push(new Int(i));
        }
    }

    For(body: (i: Int) => void): void {
        for (var i = 0; i < this.count; i++) {
            body(this.a[i]);
        }
    }
}
