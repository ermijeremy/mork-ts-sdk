import { MorkApiClient } from "../client.js";
import { SetOperationInput } from "../models/SetOperationInput.js";
import { TransformRequest } from "./TransformRequest.js";
import { Namespace } from "../models/Namespace.js";
import { StatusRequest } from "./StatusRequest.js";

interface StatusResponse {
    status: string;
}

export class UnionRequest {
    input: SetOperationInput;

    constructor(input: SetOperationInput) {
        this.input = input;
    }

    static new(input: SetOperationInput): UnionRequest {
        return new UnionRequest(input);
    }

    async execute(client: MorkApiClient): Promise<boolean> {
        if (this.input.target.length !== 1) {
             throw new Error("Union requires exactly 1 target namespace.");
        }

        const requestPath = this.input.target[0];

        for (const sourceNs of this.input.source) {
            const patternNs = Namespace.fromPathString(sourceNs);
            const targetNs = Namespace.fromPathString(requestPath);

            const pattern = patternNs.withNamespace("$x");
            const template = targetNs.withNamespace("$x");

            const transformCodeStr = `(transform (, ${pattern}) (, ${template}))`;
            
            const helperRequest = new (class extends TransformRequest {
                override transformCode(): string {
                    return transformCodeStr;
                }
            })();

            await client.dispatch(helperRequest);

            // Poll status endpoint
            await this.poll(requestPath, client);
        }

        return true;
    }

    private async poll(path: string, client: MorkApiClient): Promise<boolean> {
        const startTime = Date.now();
        const timeoutDuration = 40000; // 40 seconds

        const checkRequest = StatusRequest.new()
            .namespace(path)
            .pattern("$x");

        while (true) {
            if (Date.now() - startTime > timeoutDuration) {
                throw new Error("Request Timeout");
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const result = await client.dispatch(checkRequest);
                const statusResponse: StatusResponse = JSON.parse(result);
                
                if (statusResponse.status === "pathClear") {
                    break;
                }
            } catch (e) {}
        }
        return true;
    }
}
