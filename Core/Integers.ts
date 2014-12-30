/* tslint:disable no-unused-variable*/
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export interface Int {
    getValue(): number;
    each(body: (x: Int) => void): void;
    mod(n: Int): Int;
    minus(n: Int): Int;
    pred(): Int;
    succ(): Int
}

var range: Int[] = [];

export function int(value: number): Int {
    var result = range[value];
    if (typeof result === "undefined") {
        result = new PrivateInt(value);
        range[value] = result;
    }
    return result;
}

class PrivateInt implements Int {

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

        for (var i = 0; i < this.value; i++) {
            body(int(i));
        }
    }

    mod(n: Int) {
        var nv = n.getValue();

        return new PrivateInt(((this.value % nv) + nv) % nv);
    }

    minus(n: Int) {

        return new PrivateInt(this.value - n.getValue());
    }

    pred() {
        return new PrivateInt(this.value - 1);
    }

    succ() {
        return new PrivateInt(this.value + 1);
    }
}