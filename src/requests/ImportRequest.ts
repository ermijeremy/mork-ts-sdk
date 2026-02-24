import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { TransformDetails } from "../models/TransformDetails.js";
import { encode } from "../utils.js";

export class ImportRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    transformInput: TransformDetails;
    uriVal: string;

    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.transformInput = new TransformDetails();
        this.uriVal = "";
    }

    static new(): ImportRequest {
        return new ImportRequest();
    }

    namespace(ns: string): ImportRequest {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }
    
    withTransformInput(inp: TransformDetails): ImportRequest {
        this.transformInput = inp;
        return this;
    }

    uri(uri: string): ImportRequest {
        this.uriVal = uri;
        return this;
    }

    method(): string {
        return "GET";
    }

    path(): string {
        const template = this.transformInput.templates.length > 0 
            ? this.transformInput.templates[0] 
            : "$x";
            
        return `/import/${encode("$x")}/${encode(this.namespaceObj.withNamespace(template))}/?uri=${this.uriVal}`;
    }
}
