export interface Seq<T> {
    filter(condition: (element: T) => boolean): Seq<T>;
    map<R>(transform: (element: T) => R): Seq<R>;
    reduceRight<U>(f: (previous: U, current: T) => U, initialValue?: U): U;
}
export declare class ArraySeq<T> implements Seq<T> {
    private seq;
    constructor(seq: T[]);
    filter(condition: (element: T) => boolean): Seq<T>;
    map<R>(transform: (element: T) => R): Seq<R>;
    reduceRight<U>(f: (previous: U, current: T) => U, initialValue?: U): U;
}
export declare class NodeSeq implements Seq<Node> {
    private seq;
    constructor(seq: NodeList);
    filter(condition: (element: Node) => boolean): Seq<Node>;
    map<R>(transform: (element: Node) => R): Seq<R>;
    reduceRight<U>(f: (previous: U, current: Node) => U, initialValue?: U): U;
}
