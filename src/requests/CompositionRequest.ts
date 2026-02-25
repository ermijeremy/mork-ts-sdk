import { TransformRequest } from "./TransformRequest.js";
import { SetOperationInput } from "../models/SetOperationInput.js";
import { Namespace } from "../models/Namespace.js";

export class CompositionRequest extends TransformRequest {
    input: SetOperationInput;

    constructor(input: SetOperationInput) {
        super();
        this.input = input;
    }

    static create(input: SetOperationInput): CompositionRequest {
        return new CompositionRequest(input);
    }

    transformCode(): string {
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
