import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";
import { ExportFormat } from "../types.js";
export declare class ReadRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    transformInput: TransformDetails;
    exportUrl?: string;
    formatVal?: ExportFormat;
    constructor();
    static new(): ReadRequest;
    namespace(ns: string): ReadRequest;
    withTransformInput(inp: TransformDetails): ReadRequest;
    method(): string;
    path(): string;
}
//# sourceMappingURL=ReadRequest.d.ts.map