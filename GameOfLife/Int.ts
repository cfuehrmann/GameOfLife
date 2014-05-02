/// <reference path="ArgumentException.ts"/>

class Int {
    private value: number;

    get Value(): number { return this.value; }

    constructor(value: number) {
        if (value % 1 !== 0) {
            throw new ArgumentException("value");
        }
        this.value = value;
    }

    get Range() { return new IntRange(this); }
}

interface IntSeq {
    For(body: (i: Int) => void): void;
}

class IntRange implements IntSeq {
    private count: number;
    private a: Array<Int>;

    constructor(count: Int) {
        this.count = count.Value;
        this.a = new Array<Int>();
        for (var i = 0; i < count.Value; i++) {
            this.a.push(new Int(i));
        }
    }

    For(body: (i: Int) => void): void {
        for (var i = 0; i < this.count; i++) {
            body(this.a[i]);
        }
    }
}
