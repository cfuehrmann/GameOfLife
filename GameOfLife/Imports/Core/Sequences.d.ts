export interface Seq<T> {
    filter(condition: (element: T) => boolean): Seq<T>;
    map<TOut>(transform: (element: T) => TOut): Seq<TOut>;
    reduceRight<TResult>(f: (previous: TResult, current: T) => TResult, initialValue?: TResult): TResult;
    toArray(): T[];
}
export declare function createNodeSeq(nodes: NodeList): Seq<Node>;
export declare function createArraySeq<T>(array: T[]): Seq<T>;
