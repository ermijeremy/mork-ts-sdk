import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";

export class UploadRequest extends BaseRequest<string> {
    namespaceObj: Namespace;
    patternVal: string;
    templateVal: string;
    dataVal: string;

    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.patternVal = "";
        this.templateVal = "";
        this.dataVal = "";
    }

    static new(): UploadRequest {
        return new UploadRequest();
    }

    namespace(ns: string): UploadRequest {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }

    pattern(pattern: string): UploadRequest {
        this.patternVal = pattern;
        return this;
    }

    template(template: string): UploadRequest {
        this.templateVal = template;
        return this;
    }

    data(data: string): UploadRequest {
        this.dataVal = data;
        return this;
    }

    method(): string {
        return "POST";
    }

    path(): string {
        return `/upload/${encode(this.patternVal)}/${encode(this.namespaceObj.withNamespace(this.templateVal))}`;
    }

    body(): string {
        return this.dataVal;
    }
}
