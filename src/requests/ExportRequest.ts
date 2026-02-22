import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { ExportFormat } from "../types.js";
import { encode } from "../utils.js";

export class ExportRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    patternVal: string;
    templateVal: string;
    formatVal?: ExportFormat;
    maxWrite?: number;

    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.patternVal = "";
        this.templateVal = "";
    }

    static new(): ExportRequest {
        return new ExportRequest();
    }

    namespace(ns: string): ExportRequest {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }

    pattern(pattern: string): ExportRequest {
        this.patternVal = pattern;
        return this;
    }

    template(template: string): ExportRequest {
        this.templateVal = template;
        return this;
    }

    format(format: ExportFormat): ExportRequest {
        this.formatVal = format;
        return this;
    }
    
    withMaxWrite(maxWrite: number): ExportRequest {
        this.maxWrite = maxWrite;
        return this;
    }

    method(): string {
        return "GET";
    }

    path(): string {
        let path = `/export/${encode(this.namespaceObj.withNamespace(this.patternVal))}/${encode(this.templateVal)}`;
        
        const queryParams: string[] = [];

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
