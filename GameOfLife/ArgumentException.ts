class ArgumentException {
    private argumentName: string;

    get ArgumentName(): string { return this.argumentName; }

    constructor(argumentName: string) {
        this.argumentName = argumentName;
    }
} 