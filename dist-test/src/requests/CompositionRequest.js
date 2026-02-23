import { TransformRequest } from "./TransformRequest.js";
import { Namespace } from "../models/Namespace.js";
export class CompositionRequest extends TransformRequest {
    constructor(input) {
        super();
        this.input = input;
    }
    static create(input) {
        return new CompositionRequest(input);
    }
    transformCode() {
        const patterns = this.input.source.map((sourceNs, index) => {
            const patternVar = `$${index}`;
            const ns = Namespace.fromPathString(sourceNs);
            return ns.withNamespace(patternVar);
        }).join(" ");
        let templateString = "";
        this.input.source.forEach((_, index) => {
            templateString += `$${index} `;
        });
        templateString = templateString.trim();
        const targetNs = Namespace.fromPathString(this.input.target[0] || "");
        const template = targetNs.withNamespace(templateString);
        return `(transform (, ${patterns}) (, ${template}))`;
    }
}
//# sourceMappingURL=CompositionRequest.js.map