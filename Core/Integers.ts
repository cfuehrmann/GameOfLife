/* tslint:disable no-unused-variable*/
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export class Int {
    private value: number;

    constructor(value: number) {
        if (value % 1 !== 0) {
            throw new ArgumentException("value");
        }
        this.value = value;
    }

    getValue(): number { return this.value; }

    each(body: (x: Int) => void): void {
        for (var i = 0; i < this.value; i++) {
            body(new Int(i));
        }
    }
}

export class EagerRange {
    private count: number;
    private a: Array<Int>;

    constructor(count: Int) {
        if (count.getValue() < 0) {
            throw new ArgumentException("value");
        }
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