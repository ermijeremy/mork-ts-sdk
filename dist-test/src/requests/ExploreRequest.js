import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";
export class ExploreRequest extends BaseRequest {
    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.patternVal = "";
        this.tokenVal = "";
    }
    static new() {
        return new ExploreRequest();
    }
    namespace(ns) {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }
    pattern(pattern) {
        this.patternVal = pattern;
        return this;
    }
    token(token) {
        this.tokenVal = token;
        return this;
    }
    method() {
        return "GET";
    }
    path() {
        const tokenSegment = this.tokenVal || "%02";
        return `/explore/${encode(this.namespaceObj.withNamespace(this.patternVal))}/${tokenSegment}/`;
    }
}
//# sourceMappingURL=ExploreRequest.js.map