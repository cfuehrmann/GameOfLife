import * as TypeChecks from "./TypeChecks";
import checkDefinedAndNotNull = TypeChecks.checkDefinedAndNotNull;

// This interface is aiming at powerful, type-safe method chaining on 
// collections. JavaScript arrays do something like that, but their methods
// are lacking. Also, non-array-collections like NodeList should be able to 
// implement this interface, without the costly detour through arrays. 
// This interface is under construction, it will certainly grow.
export interface Seq<T> {
    filter(condition: (element: T) => boolean): Seq<T>;

    map<TOut>(transform: (element: T) => TOut): Seq<TOut>;

    // We ignore reduce-functions that take no initial value, because that violates the motto
    // "Well typed programs do not go wrong" when given an empty argument. For versions that use the 
    // initial element only for the empty argument, a function with a different name should be provided.
    // And another point: reduceRight is bad in that it swaps the order of the input elements when accumulating.
    // But we accept this, to stay consistent with Javascript. The "reduce" function does not suffer from that flaw,
    // but we currently don't need it.
    reduceRight<TResult>(f: (previous: TResult, current: T) => TResult, initialValue?: TResult): TResult;

    toArray(): T[];
}

export function createNodeSeq(nodes: NodeList): Seq<Node> { return new NodeSeq(nodes); }

export function createArraySeq<T>(array: T[]): Seq<T> { return new ArraySeq(array); }

// A class that wraps up an array under the Seq interface. Importantly, 
// we don't extend the prototype, but we *do* use the fast functions of the array.
class ArraySeq<T> implements Seq<T> {
    private seq: T[];

    constructor(seq: T[]) {
        checkDefinedAndNotNull("seq", seq);
        this.seq = seq;
    }

    filter(condition: (element: T) => boolean): ArraySeq<T> { // ArraySeq, not Seq, to keep unit test from being bottomless
        checkDefinedAndNotNull("condition", condition);
        return new ArraySeq(this.seq.filter(condition));
    }

    map<TOut>(transform: (element: T) => TOut): ArraySeq<TOut> { // ArraySeq, not Seq, to keep unit test from being bottomless
        checkDefinedAndNotNull("transform", transform);
        return new ArraySeq(this.seq.map(transform));
    }

    reduceRight<TResult>(f: (previous: TResult, current: T) => TResult, initialValue: TResult): TResult {
        checkDefinedAndNotNull("f", f);
        return this.seq.reduceRight(f, initialValue);
    }

    toArray(): T[] {
        return this.seq;
    }
}


// A class that wraps up a Nodelist under the Seq interface. Importantly, 
// we don't extend the prototype of Nodelist, and we don't take a costly 
// detour through an array before the first function is used.
class NodeSeq implements Seq<Node> {
    private seq: NodeList;

    constructor(seq: NodeList) {
        checkDefinedAndNotNull("seq", seq);
        this.seq = seq;
    }

    filter(condition: (element: Node) => boolean): ArraySeq<Node> { // ArraySeq, not Seq, to keep unit test from being bottomless
        checkDefinedAndNotNull("condition", condition);
        return new ArraySeq(<Node[]>Array.prototype.filter.call(this.seq, condition));
    }

    map<TOut>(transform: (element: Node) => TOut): ArraySeq<TOut> { // ArraySeq, not Seq, to keep unit test from being bottomless
        checkDefinedAndNotNull("transform", transform);
        return new ArraySeq(<TOut[]>Array.prototype.map.call(this.seq, transform));
    }

    reduceRight<TResult>(f: (previous: TResult, current: Node) => TResult, initialValue: TResult): TResult {
        checkDefinedAndNotNull("f", f);
        return Array.prototype.reduceRight.call(this.seq, f, initialValue);
    }

    toArray() {
        const result = new Array<Node>();
        for (let i = 0; i < this.seq.length; i++) {
            result.push(this.seq[i]);
        }
        return result;
    }
}