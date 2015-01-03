export interface List<TElement> {
    map<TNewElement>(func: (element: TElement) => TNewElement): List<TNewElement>;
    fold<TResult>(startValue: TResult, func: (result: TResult, element: TElement) => TResult): TResult;
}
export declare function from<TElement>(array: TElement[]): List<TElement>;
