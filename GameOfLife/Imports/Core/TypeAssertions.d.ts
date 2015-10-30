export declare function assertInt<T>(argumentName: string, testee: (n: number) => T): () => void;
export declare function assertReal<T>(argumentName: string, testee: (n: number) => T): () => void;
export declare function assertDefinedAndNotNull<TArgument, TResult>(argumentName: string, testee: (n: TArgument) => TResult): () => void;
