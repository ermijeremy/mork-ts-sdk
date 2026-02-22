import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";

export class TransformRequest extends BaseRequest<string> {
    namespaceObj: Namespace;
    transformInput: TransformDetails;

    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.transformInput = new TransformDetails();
    }

    static new(): TransformRequest {
        return new TransformRequest();
    }

    namespace(ns: string): TransformRequest {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }

    transformDetails(inp: TransformDetails): TransformRequest {
        this.transformInput = inp;
        return this;
    }

    multiPatterns(): string {
        const patterns = this.transformInput.patterns
            .map(pattern => this.namespaceObj.withNamespace(pattern))
            .join(" ");
        return `(, ${patterns})`;
    }

    multiTemplates(): string {
        const templates = this.transformInput.templates
            .map(template => this.namespaceObj.withNamespace(template))
            .join(" ");
        return `(, ${templates})`;
    }

    transformCode(): string {
        return `(transform ${this.multiPatterns()} ${this.multiTemplates()})`;
    }

    method(): string {
        return "POST";
    }

    path(): string {
        return "/transform";
    }

    body(): string | null {
        return this.transformCode();
    }
}
