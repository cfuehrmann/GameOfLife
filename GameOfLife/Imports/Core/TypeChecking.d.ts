export declare function checkInt(argumentName: string, value: number): void;
export declare function checkReal(argumentName: string, value: number): void;
export declare function checkDefinedAndNotNull(argumentName: string, value: any): void;
export declare function assertInt<T>(argumentName: string, method: (n: number) => T): () => void;
export declare function assertReal<T>(argumentName: string, method: (n: number) => T): () => void;
export declare function assertDefinedAndNotNull<TArgument, TResult>(argumentName: string, method: (n: TArgument) => TResult): () => void;
