export class SetOperationInput {
    source: string[];
    target: string[];

    constructor() {
        this.source = [];
        this.target = [];
    }

    static new(source: string[], target: string[]): SetOperationInput {
        const input = new SetOperationInput();
        input.source = source;
        input.target = target;
        return input;
    }

    withSource(source: string[]): SetOperationInput {
        this.source = source;
        return this;
    }

    withTarget(target: string[]): SetOperationInput {
        this.target = target;
        return this;
    }
}
