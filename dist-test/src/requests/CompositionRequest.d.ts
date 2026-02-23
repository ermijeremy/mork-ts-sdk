import { TransformRequest } from "./TransformRequest.js";
import { SetOperationInput } from "../models/SetOperationInput.js";
export declare class CompositionRequest extends TransformRequest {
    input: SetOperationInput;
    constructor(input: SetOperationInput);
    static create(input: SetOperationInput): CompositionRequest;
    transformCode(): string;
}
//# sourceMappingURL=CompositionRequest.d.ts.map