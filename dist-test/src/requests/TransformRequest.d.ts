import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";
export declare class TransformRequest extends BaseRequest<string> {
    namespaceObj: Namespace;
    transformInput: TransformDetails;
    constructor();
    static new(): TransformRequest;
    namespace(ns: string): TransformRequest;
    transformDetails(inp: TransformDetails): TransformRequest;
    multiPatterns(): string;
    multiTemplates(): string;
    transformCode(): string;
    method(): string;
    path(): string;
    body(): string | null;
}
//# sourceMappingURL=TransformRequest.d.ts.map