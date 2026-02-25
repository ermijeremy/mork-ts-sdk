import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";

export class ExploreRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    patternVal: string;
    tokenVal: string;

    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.patternVal = "";
        this.tokenVal = "";
    }

    static new(): ExploreRequest {
        return new ExploreRequest();
    }

    namespace(ns: string): ExploreRequest {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }

    pattern(pattern: string): ExploreRequest {
        this.patternVal = pattern;
        return this;
    }

    token(token: string): ExploreRequest {
        this.tokenVal = token;
        return this;
    }

    method(): string {
        return "GET";
    }

    path(): string {
        const tokenSegment = this.tokenVal || "%02";
        return `/explore/${encode(this.namespaceObj.withNamespace(this.patternVal))}/${tokenSegment}/`;
    }
}
