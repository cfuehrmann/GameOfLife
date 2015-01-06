export declare function assertInt(argumentName: string, value: number): void;
export declare function assertReal(argumentName: string, value: number): void;
export declare function checkIntAssert<T>(argumentName: string, method: (n: number) => T): () => void;
export declare function checkRealAssert<T>(argumentName: string, method: (n: number) => T): () => void;
