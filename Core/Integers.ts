/* tslint:disable no-unused-variable*/
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export class Int {
    private static range: Int[] = [];

    constructor(private value: number) {
        if (value % 1 !== 0 || value == null) {
            throw new ArgumentException("value");
        }
        this.value = value;
    }

    getValue(): number { return this.value; }

    each(body: (x: Int) => void): void {
        if (body == null || typeof body === "undefined") {
            throw new ArgumentException("body");
        }

        for (var j = Int.range.length; j < this.value; j++) {
            Int.range.push(new Int(j));
        }
        for (var i = 0; i < this.value; i++) {
            body(Int.range[i]);
        }
    }

    mod(n: Int) {
        var nv = n.getValue();

        return new Int(((this.value % nv) + nv) % nv);
    }

    minus(n: Int) {

        return new Int(this.value - n.getValue());
    }

    pred() {
        return new Int(this.value - 1);
    }

    succ() {
        return new Int(this.value + 1);
    }

}