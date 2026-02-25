import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { ExportFormat } from "../types.js";
export declare class ExportRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    patternVal: string;
    templateVal: string;
    formatVal?: ExportFormat;
    maxWrite?: number;
    constructor();
    static new(): ExportRequest;
    namespace(ns: string): ExportRequest;
    pattern(pattern: string): ExportRequest;
    template(template: string): ExportRequest;
    format(format: ExportFormat): ExportRequest;
    withMaxWrite(maxWrite: number): ExportRequest;
    method(): string;
    path(): string;
}
//# sourceMappingURL=ExportRequest.d.ts.map