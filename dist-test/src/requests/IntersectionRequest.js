import { TransformRequest } from "./TransformRequest.js";
import { Namespace } from "../models/Namespace.js";
export class IntersectionRequest extends TransformRequest {
    constructor(input) {
        super();
        this.input = input;
    }
    static create(input) {
        return new IntersectionRequest(input);
    }
    transformCode() {
        if (this.input.source.length < 2 || this.input.target.length !== 1) {
            throw new Error("Intersection requires at least 2 sources and exactly 1 target.");
        }
        const patterns = this.input.source.map((sourceNs) => {
            const ns = Namespace.fromPathString(sourceNs);
            return ns.withNamespace("$x");
        }).join(" ");
        const targetNs = Namespace.fromPathString(this.input.target[0]);
        const template = targetNs.withNamespace("$x");
        return `(transform (, ${patterns}) (, ${template}))`;
    }
}
//# sourceMappingURL=IntersectionRequest.js.map