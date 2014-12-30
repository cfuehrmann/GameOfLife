export class ArgumentException {
    getArgumentName(): string { return this.argumentName; }

    toString(): string {
        return "The argument '" + this.argumentName + "' is invalid!";
    }

    constructor(private argumentName: string) {
        this.argumentName = argumentName;
    }
} 