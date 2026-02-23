import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
export declare class UploadRequest extends BaseRequest<string> {
    namespaceObj: Namespace;
    patternVal: string;
    templateVal: string;
    dataVal: string;
    constructor();
    static new(): UploadRequest;
    namespace(ns: string): UploadRequest;
    pattern(pattern: string): UploadRequest;
    template(template: string): UploadRequest;
    data(data: string): UploadRequest;
    method(): string;
    path(): string;
    body(): string;
}
//# sourceMappingURL=UploadRequest.d.ts.map