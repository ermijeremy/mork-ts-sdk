import { MorkApiClient } from "../client.js";
import { SetOperationInput } from "../models/SetOperationInput.js";
export declare class UnionRequest {
    input: SetOperationInput;
    constructor(input: SetOperationInput);
    static new(input: SetOperationInput): UnionRequest;
    execute(client: MorkApiClient): Promise<boolean>;
    private poll;
}
//# sourceMappingURL=UnionRequest.d.ts.map