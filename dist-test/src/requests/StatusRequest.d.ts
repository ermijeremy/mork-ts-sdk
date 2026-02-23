import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
export declare class StatusRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    patternStr: string;
    constructor();
    static new(): StatusRequest;
    namespace(ns: string): StatusRequest;
    pattern(pt: string): StatusRequest;
    path(): string;
    method(): string;
    body(): null;
}
//# sourceMappingURL=StatusRequest.d.ts.map