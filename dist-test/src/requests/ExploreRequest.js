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
        // Use __EMPTY__ as a placeholder for essential empty segments to withstand proxy normalization.
        // The vite.config.mts has a rewrite rule to strip this placeholder before sending to Mork.
        const tokenSegment = this.tokenVal || "__EMPTY__";
        return `/explore/${encode(this.namespaceObj.withNamespace(this.patternVal))}/${tokenSegment}/`;
    }
}
//# sourceMappingURL=ExploreRequest.js.map