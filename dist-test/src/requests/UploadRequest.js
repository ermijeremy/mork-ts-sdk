import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";
export class UploadRequest extends BaseRequest {
    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.patternVal = "";
        this.templateVal = "";
        this.dataVal = "";
    }
    static new() {
        return new UploadRequest();
    }
    namespace(ns) {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }
    pattern(pattern) {
        this.patternVal = pattern;
        return this;
    }
    template(template) {
        this.templateVal = template;
        return this;
    }
    data(data) {
        this.dataVal = data;
        return this;
    }
    method() {
        return "POST";
    }
    path() {
        return `/upload/${encode(this.patternVal)}/${encode(this.namespaceObj.withNamespace(this.templateVal))}`;
    }
    body() {
        return this.dataVal;
    }
}
//# sourceMappingURL=UploadRequest.js.map