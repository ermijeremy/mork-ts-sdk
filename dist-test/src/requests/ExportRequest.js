import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";
export class ExportRequest extends BaseRequest {
    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.patternVal = "";
        this.templateVal = "";
    }
    static new() {
        return new ExportRequest();
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
    format(format) {
        this.formatVal = format;
        return this;
    }
    withMaxWrite(maxWrite) {
        this.maxWrite = maxWrite;
        return this;
    }
    method() {
        return "GET";
    }
    path() {
        let path = `/export/${encode(this.namespaceObj.withNamespace(this.patternVal))}/${encode(this.templateVal)}`;
        const queryParams = [];
        if (this.formatVal) {
            queryParams.push(`format=${this.formatVal}`);
        }
        if (this.maxWrite !== undefined) {
            queryParams.push(`max_write=${this.maxWrite}`);
        }
        if (queryParams.length > 0) {
            path += "/?";
            path += queryParams.join("&");
        }
        return path;
    }
}
//# sourceMappingURL=ExportRequest.js.map