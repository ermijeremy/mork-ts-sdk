import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
export declare class ExploreRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    patternVal: string;
    tokenVal: string;
    constructor();
    static new(): ExploreRequest;
    namespace(ns: string): ExploreRequest;
    pattern(pattern: string): ExploreRequest;
    token(token: string): ExploreRequest;
    method(): string;
    path(): string;
}
//# sourceMappingURL=ExploreRequest.d.ts.map