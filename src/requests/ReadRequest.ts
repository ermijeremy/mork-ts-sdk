import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";
import { ExportFormat } from "../types.js";
import { encode } from "../utils.js";

export class ReadRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    transformInput: TransformDetails;
    exportUrl?: string;
    formatVal?: ExportFormat;

    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.transformInput = new TransformDetails();
    }

    static new(): ReadRequest {
        return new ReadRequest();
    }

    namespace(ns: string): ReadRequest {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }

    withTransformInput(inp: TransformDetails): ReadRequest {
        this.transformInput = inp;
        return this;
    }

    method(): string {
        return "GET";
    }

    path(): string {
        const pattern = this.transformInput.patterns.length > 0
            ? this.transformInput.patterns[0]
            : "$x";
        
        const template = this.transformInput.templates.length > 0
            ? this.transformInput.templates[0]
            : "$x";

        return `/export/${encode(this.namespaceObj.withNamespace(pattern))}/${encode(template)}`;
    }
}
