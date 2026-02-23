import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";
import { encode } from "../utils.js";
export class ImportRequest extends BaseRequest {
    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.transformInput = new TransformDetails();
        this.uriVal = "";
    }
    static new() {
        return new ImportRequest();
    }
    namespace(ns) {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }
    withTransformInput(inp) {
        this.transformInput = inp;
        return this;
    }
    uri(uri) {
        this.uriVal = uri;
        return this;
    }
    method() {
        return "GET";
    }
    path() {
        const template = this.transformInput.templates.length > 0
            ? this.transformInput.templates[0]
            : "$x";
        return `/import/${encode("$x")}/${encode(this.namespaceObj.withNamespace(template))}/?uri=${this.uriVal}`;
    }
}
//# sourceMappingURL=ImportRequest.js.map