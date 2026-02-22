import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";

export class ClearRequest extends BaseRequest<void> {
    namespaceObj: Namespace;
    exprVal: string;

    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.exprVal = "";
    }

    static new(): ClearRequest {
        return new ClearRequest();
    }

    namespace(ns: string): ClearRequest {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }

    expr(expr: string): ClearRequest {
        this.exprVal = expr;
        return this;
    }

    method(): string {
        return "GET";
    }

    path(): string {
        const exprToUse = this.namespaceObj.withNamespace(this.exprVal);
        return `/clear/${encode(exprToUse)}`;
    }
}
