export interface Seq<T> {
    filter(condition: (element: T) => boolean): Seq<T>;
    map<TOut>(transform: (element: T) => TOut): Seq<TOut>;
    reduceRight<TResult>(f: (previous: TResult, current: T) => TResult, initialValue?: TResult): TResult;
    toArray(): T[];
}
export declare class ArraySeq<T> implements Seq<T> {
    private seq;
    constructor(seq: T[]);
    filter(condition: (element: T) => boolean): ArraySeq<T>;
    map<TOut>(transform: (element: T) => TOut): ArraySeq<TOut>;
    reduceRight<TResult>(f: (previous: TResult, current: T) => TResult, initialValue: TResult): TResult;
    toArray(): T[];
}
export declare class NodeSeq implements Seq<Node> {
    private seq;
    constructor(seq: NodeList);
    filter(condition: (element: Node) => boolean): ArraySeq<Node>;
    map<TOut>(transform: (element: Node) => TOut): ArraySeq<TOut>;
    reduceRight<TResult>(f: (previous: TResult, current: Node) => TResult, initialValue: TResult): TResult;
    toArray(): Node[];
}
