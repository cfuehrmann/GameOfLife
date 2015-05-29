/* tslint:disable no-unused-variable*/
import TypeChecking = require("TypeChecking");
import assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;
/* tslint:enable no-unused-variable*/

export interface Seq<T> {
    filter(condition: (element: T) => boolean): Seq<T>;
    map<R>(transform: (element: T) => R): Seq<R>;
    reduceRight<U>(f: (previous: U, current: T) => U, initialValue?: U): U;
}

export class ArraySeq<T> implements Seq<T> {
    private seq: T[];

    constructor(seq: T[]) {
        assertDefinedAndNotNull("seq", seq);
        this.seq = seq;
    }

    filter(condition: (element: T) => boolean): Seq<T> {
        return new ArraySeq(this.seq.filter(condition));
    }

    map<R>(transform: (element: T) => R): Seq<R> {
        return new ArraySeq(this.seq.map(transform));
    }

    reduceRight<U>(f: (previous: U, current: T) => U, initialValue?: U): U {
        return this.seq.reduceRight(f, initialValue);
        // todo: deal properly with the case when there is no initial value
    }
}

export class NodeSeq implements Seq<Node> {
    private seq: NodeList;

    constructor(seq: NodeList) {
        this.seq = seq;
    }

    filter(condition: (element: Node) => boolean): Seq<Node> {
        return new ArraySeq(Array.prototype.filter.call(this.seq, condition));
    }

    map<R>(transform: (element: Node) => R): Seq<R> {
        return new ArraySeq(Array.prototype.map.call(this.seq, transform));
    }

    reduceRight<U>(f: (previous: U, current: Node) => U, initialValue?: U): U {
        return Array.prototype.reduceRight.call(this.seq, f, initialValue);
        // todo: deal properly with the case when there is no initial value
    }
}
 