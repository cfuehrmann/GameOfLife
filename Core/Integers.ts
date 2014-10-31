import Sequences = require("./Sequences");
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import Seq = Sequences.Seq;

export class Int {
    private value: number;

    constructor(value: number) {
        if (value % 1 !== 0) {
            throw new ArgumentException("value");
        }
        this.value = value;
    }

    getValue(): number { return this.value; }
}

export class Range implements Seq<Int> {
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