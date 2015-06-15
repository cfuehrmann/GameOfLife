/* tslint:disable no-unused-variable*/
import TypeChecking = require("TypeChecking");
import assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;
/* tslint:enable no-unused-variable*/

export interface Seq<T> {
    filter(condition: (element: T) => boolean): Seq<T>;
    map<TOut>(transform: (element: T) => TOut): Seq<TOut>;
    reduceRight<TResult>(f: (previous: TResult, current: T) => TResult, initialValue?: TResult): TResult;
    toArray(): T[]; // todo: should this really be part of the interface?
}

export class ArraySeq<T> implements Seq<T> {
    private seq: T[];

    constructor(seq: T[]) {
        assertDefinedAndNotNull("seq", seq);
        this.seq = seq;
    }

    filter(condition: (element: T) => boolean): ArraySeq<T> { // ArraySeq, not Seq, to keep unit test from being bottomless
        assertDefinedAndNotNull("condition", condition);
        return new ArraySeq(this.seq.filter(condition));
    }

    map<TOut>(transform: (element: T) => TOut): ArraySeq<TOut> { // ArraySeq, not Seq, to keep unit test from being bottomless
        return new ArraySeq(this.seq.map(transform));
    }

    reduceRight<TResult>(f: (previous: TResult, current: T) => TResult, initialValue?: TResult): TResult {
        return this.seq.reduceRight(f, initialValue);
        // todo: deal properly with the case when there is no initial value
    }

    toArray(): T[] {
        return this.seq;
    }
}

export class NodeSeq implements Seq<Node> {
    private seq: NodeList;

    constructor(seq: NodeList) {
        this.seq = seq;
    }

    filter(condition: (element: Node) => boolean): ArraySeq<Node> {  // ArraySeq, not Seq, to keep unit test from being bottomless
        return new ArraySeq(<Node[]>Array.prototype.filter.call(this.seq, condition));
    }

    map<TOut>(transform: (element: Node) => TOut): ArraySeq<TOut> { // ArraySeq, not Seq, to keep unit test from being bottomless
        return new ArraySeq(<TOut[]>Array.prototype.map.call(this.seq, transform));
    }

    reduceRight<TResult>(f: (previous: TResult, current: Node) => TResult, initialValue?: TResult): TResult {
        return Array.prototype.reduceRight.call(this.seq, f, initialValue);
        // todo: deal properly with the case when there is no initial value
    }

    toArray() {
        var result = new Array<Node>();
        for (var i = 0; i < this.seq.length; i++) {
            result.push(this.seq[i]);
        }
        return result;
    }
}