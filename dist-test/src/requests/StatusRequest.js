import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";
export class StatusRequest extends BaseRequest {
    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.patternStr = "$x";
    }
    static new() {
        return new StatusRequest();
    }
    namespace(ns) {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }
    pattern(pt) {
        this.patternStr = pt;
        return this;
    }
    path() {
        const withNs = this.namespaceObj.withNamespace(this.patternStr);
        return `/status/${encode(withNs)}`;
    }
    method() {
        return "GET";
    }
    body() {
        return null;
    }
}
//# sourceMappingURL=StatusRequest.js.map