export class ArgumentException {
    private argumentName: string;

    getArgumentName(): string { return this.argumentName; }

    toString(): string {
        return "The argument '" + this.argumentName + "' is invalid!";
    }

    constructor(argumentName: string) {
        this.argumentName = argumentName;
    }
} 