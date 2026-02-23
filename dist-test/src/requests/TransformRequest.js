import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";
export class TransformRequest extends BaseRequest {
    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.transformInput = new TransformDetails();
    }
    static new() {
        return new TransformRequest();
    }
    namespace(ns) {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }
    transformDetails(inp) {
        this.transformInput = inp;
        return this;
    }
    multiPatterns() {
        const patterns = this.transformInput.patterns
            .map(pattern => this.namespaceObj.withNamespace(pattern))
            .join(" ");
        return `(, ${patterns})`;
    }
    multiTemplates() {
        const templates = this.transformInput.templates
            .map(template => this.namespaceObj.withNamespace(template))
            .join(" ");
        return `(, ${templates})`;
    }
    transformCode() {
        return `(transform ${this.multiPatterns()} ${this.multiTemplates()})`;
    }
    method() {
        return "POST";
    }
    path() {
        return "/transform";
    }
    body() {
        return this.transformCode();
    }
}
//# sourceMappingURL=TransformRequest.js.map