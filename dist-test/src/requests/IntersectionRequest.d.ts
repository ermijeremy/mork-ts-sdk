import { TransformRequest } from "./TransformRequest.js";
import { SetOperationInput } from "../models/SetOperationInput.js";
export declare class IntersectionRequest extends TransformRequest {
    input: SetOperationInput;
    constructor(input: SetOperationInput);
    static create(input: SetOperationInput): IntersectionRequest;
    transformCode(): string;
}
//# sourceMappingURL=IntersectionRequest.d.ts.map