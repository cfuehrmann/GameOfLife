export class ArgumentException {
    private argumentName: string;

    getArgumentName(): string { return this.argumentName; }

    constructor(argumentName: string) {
        this.argumentName = argumentName;
    }
} 