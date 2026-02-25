export class SetOperationInput {
    constructor() {
        this.source = [];
        this.target = [];
    }
    static new(source, target) {
        const input = new SetOperationInput();
        input.source = source;
        input.target = target;
        return input;
    }
    withSource(source) {
        this.source = source;
        return this;
    }
    withTarget(target) {
        this.target = target;
        return this;
    }
}
//# sourceMappingURL=SetOperationInput.js.map