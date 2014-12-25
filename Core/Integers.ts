/* tslint:disable no-unused-variable*/
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export class Int {
    private value: number;
    private static range: Int[] = [];

    constructor(value: number) {
        if (value % 1 !== 0) {
            throw new ArgumentException("value");
        }
        this.value = value;
    }

    getValue(): number { return this.value; }

    each(body: (x: Int) => void): void {
        for (var j = Int.range.length; j < this.value; j++) {
            Int.range.push(new Int(j));
        }
        for (var i = 0; i < this.value; i++) {
            body(Int.range[i]);
        }
    }
}
