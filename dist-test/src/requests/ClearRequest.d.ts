import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
export declare class ClearRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    exprVal: string;
    constructor();
    static new(): ClearRequest;
    namespace(ns: string): ClearRequest;
    expr(expr: string): ClearRequest;
    method(): string;
    path(): string;
}
//# sourceMappingURL=ClearRequest.d.ts.map