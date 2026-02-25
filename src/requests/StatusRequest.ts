import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";

export class StatusRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    patternStr: string;

    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.patternStr = "$x";
    }

    static new(): StatusRequest {
        return new StatusRequest();
    }

    namespace(ns: string): StatusRequest {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }

    pattern(pt: string): StatusRequest {
        this.patternStr = pt;
        return this;
    }
  
    path(): string {
        const withNs = this.namespaceObj.withNamespace(this.patternStr);
        return `/status/${encode(withNs)}`;
    }

    method(): string {
        return "GET";
    }

    override body(): null {
        return null;
    }
}
