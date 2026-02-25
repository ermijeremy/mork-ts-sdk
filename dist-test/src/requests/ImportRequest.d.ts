import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";
export declare class ImportRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    transformInput: TransformDetails;
    uriVal: string;
    constructor();
    static new(): ImportRequest;
    namespace(ns: string): ImportRequest;
    withTransformInput(inp: TransformDetails): ImportRequest;
    uri(uri: string): ImportRequest;
    method(): string;
    path(): string;
}
//# sourceMappingURL=ImportRequest.d.ts.map