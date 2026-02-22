export class TransformDetails {
    patterns: string[];
    templates: string[];

    constructor() {
        this.patterns = ["$x"];
        this.templates = ["$x"];
    }

    static new(): TransformDetails {
        return new TransformDetails();
    }

    withPatterns(patterns: string[]): TransformDetails {
        this.patterns = patterns;
        return this;
    }

    withTemplates(templates: string[]): TransformDetails {
        this.templates = templates;
        return this;
    }
}
