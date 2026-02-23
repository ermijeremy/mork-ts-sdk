import { BaseRequest } from "./Request.js";
import { Namespace } from "../models/Namespace.js";
import { encode } from "../utils.js";
export class ClearRequest extends BaseRequest {
    constructor() {
        super();
        this.namespaceObj = new Namespace();
        this.exprVal = "";
    }
    static new() {
        return new ClearRequest();
    }
    namespace(ns) {
        this.namespaceObj = Namespace.fromPathString(ns);
        return this;
    }
    expr(expr) {
        this.exprVal = expr;
        return this;
    }
    method() {
        return "GET";
    }
    path() {
        const exprToUse = this.namespaceObj.withNamespace(this.exprVal);
        return `/clear/${encode(exprToUse)}`;
    }
}
//# sourceMappingURL=ClearRequest.js.map