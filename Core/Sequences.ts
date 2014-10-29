export interface Seq<T> {
    For(body: (i: T) => void): void;
}
