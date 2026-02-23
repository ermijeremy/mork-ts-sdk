export class TransformDetails {
    constructor() {
        this.patterns = ["$x"];
        this.templates = ["$x"];
    }
    static new() {
        return new TransformDetails();
    }
    withPatterns(patterns) {
        this.patterns = patterns;
        return this;
    }
    withTemplates(templates) {
        this.templates = templates;
        return this;
    }
}
//# sourceMappingURL=TransformDetails.js.map