import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";
import { encode } from "../utils.js";
export class ReadRequest extends BaseRequest {
    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.transformInput = new TransformDetails();
    }
    static new() {
        return new ReadRequest();
    }
    namespace(ns) {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }
    withTransformInput(inp) {
        this.transformInput = inp;
        return this;
    }
    method() {
        return "GET";
    }
    path() {
        const pattern = this.transformInput.patterns.length > 0
            ? this.transformInput.patterns[0]
            : "$x";
        const template = this.transformInput.templates.length > 0
            ? this.transformInput.templates[0]
            : "$x";
        return `/export/${encode(this.namespaceObj.withNamespace(pattern))}/${encode(template)}`;
    }
}
//# sourceMappingURL=ReadRequest.js.map